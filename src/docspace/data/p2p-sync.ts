/**
 * P2P Encrypted Sync Engine (WebRTC & LWW)
 * 
 * Module đồng bộ dữ liệu ngang hàng (không qua Server) dựa trên WebRTC Data Channel.
 * Cơ chế giải quyết xung đột: Last-Writer-Wins (LWW) dựa vào updatedAt.
 */

import { DocSpaceSnapshot } from '../types';

export type PeerRole = 'host' | 'client';

export class P2PSyncEngine {
  private peerConnection: RTCPeerConnection | null = null;
  private dataChannel: RTCDataChannel | null = null;
  private role: PeerRole = 'host';

  // Callbacks
  public onIceCandidateReady: (candidateString: string) => void = () => {};
  public onConnectionStateChange: (state: RTCPeerConnectionState) => void = () => {};
  public onMessageReceived: (message: string) => void = () => {};
  public onError: (error: string) => void = () => {};
  public onSyncCompleted: () => void = () => {};

  constructor() {}

  /**
   * Khởi tạo WebRTC Connection
   */
  private initPeerConnection() {
    // Dùng public STUN server của Google để vượt qua NAT
    const configuration = {
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    };

    this.peerConnection = new RTCPeerConnection(configuration);

    // Bắt sự kiện tạo ICE candidate xong
    this.peerConnection.onicecandidate = (event) => {
      // Khi event.candidate là null, tức là đã thu thập xong toàn bộ ICE candidates
      if (event.candidate === null && this.peerConnection?.localDescription) {
        // Mã hóa localDescription (Offer hoặc Answer) thành Base64 để user dễ copy
        const sdpBase64 = btoa(JSON.stringify(this.peerConnection.localDescription));
        this.onIceCandidateReady(sdpBase64);
      }
    };

    this.peerConnection.onconnectionstatechange = () => {
      if (this.peerConnection) {
        this.onConnectionStateChange(this.peerConnection.connectionState);
      }
    };

    // Client nhận data channel từ Host
    this.peerConnection.ondatachannel = (event) => {
      if (this.role === 'client') {
        this.dataChannel = event.channel;
        this.setupDataChannel();
      }
    };
  }

  /**
   * Thiết lập các sự kiện cho Data Channel
   */
  private setupDataChannel() {
    if (!this.dataChannel) return;

    this.dataChannel.onopen = () => {
      console.log('Data channel opened!');
    };

    this.dataChannel.onmessage = (event) => {
      this.onMessageReceived(event.data);
      this.processIncomingSyncData(event.data);
    };

    this.dataChannel.onerror = (error) => {
      this.onError('Data channel error: ' + error);
    };
  }

  /**
   * Host tạo phòng (Tạo Offer)
   */
  public async hostRoom(): Promise<void> {
    this.role = 'host';
    this.initPeerConnection();

    if (!this.peerConnection) return;

    // Host tạo Data channel
    this.dataChannel = this.peerConnection.createDataChannel('docspace-sync');
    this.setupDataChannel();

    try {
      const offer = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(offer);
      // Khi setLocalDescription, tiến trình dò ICE Candidates bắt đầu.
      // Khi dò xong, onicecandidate sẽ được gọi với event.candidate = null.
    } catch (e: any) {
      this.onError('Tạo offer thất bại: ' + e.message);
    }
  }

  /**
   * Client tham gia phòng bằng Offer của Host (Tạo Answer)
   */
  public async joinRoom(offerBase64: string): Promise<void> {
    this.role = 'client';
    this.initPeerConnection();

    if (!this.peerConnection) return;

    try {
      const offer = JSON.parse(atob(offerBase64));
      await this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
      
      const answer = await this.peerConnection.createAnswer();
      await this.peerConnection.setLocalDescription(answer);
      // Tương tự, onicecandidate sẽ bắn Answer SDP Base64 ra ngoài sau khi gom đủ ICE.
    } catch (e: any) {
      this.onError('Tham gia phòng thất bại (Offer không hợp lệ): ' + e.message);
    }
  }

  /**
   * Host nhận Answer từ Client để hoàn tất kết nối
   */
  public async completeConnection(answerBase64: string): Promise<void> {
    if (!this.peerConnection || this.role !== 'host') return;

    try {
      const answer = JSON.parse(atob(answerBase64));
      await this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    } catch (e: any) {
      this.onError('Lỗi hoàn tất kết nối (Answer không hợp lệ): ' + e.message);
    }
  }

  /**
   * Gửi dữ liệu hiện tại (Snapshot) qua Data Channel
   */
  public sendSyncData(snapshot: DocSpaceSnapshot) {
    if (this.dataChannel && this.dataChannel.readyState === 'open') {
      const payload = JSON.stringify({ type: 'sync_data', data: snapshot });
      this.dataChannel.send(payload);
    } else {
      this.onError('Chưa kết nối đến thiết bị nào.');
    }
  }

  /**
   * Xử lý dữ liệu đồng bộ đến từ thiết bị kia (LWW Merge)
   */
  private processIncomingSyncData(message: string) {
    try {
      const parsed = JSON.parse(message);
      if (parsed.type === 'sync_data' && parsed.data) {
        const remoteSnapshot: DocSpaceSnapshot = parsed.data;
        this.mergeSnapshotLWW(remoteSnapshot);
      }
    } catch (e: any) {
      this.onError('Lỗi khi đọc dữ liệu đồng bộ: ' + e.message);
    }
  }

  /**
   * LWW Merge (Last-Writer-Wins)
   * Thuật toán: So sánh từng record của từng bảng dựa theo updatedAt, cái nào mới hơn thì ghi đè.
   */
  private mergeSnapshotLWW(remote: DocSpaceSnapshot) {
    const profileId = remote.profile.id;
    if (!profileId) {
      this.onError('Snapshot không có Profile ID.');
      return;
    }

    const mergeCollection = <T extends { id: string; updatedAt?: string; createdAt?: string }>(
      storeKey: string,
      remoteItems: T[]
    ) => {
      const rawLocal = localStorage.getItem(`dsp_${profileId}_${storeKey}`);
      const localItems: T[] = rawLocal ? JSON.parse(rawLocal) : [];

      const map = new Map<string, T>();
      // Đưa local items vào map
      localItems.forEach(item => map.set(item.id, item));

      // LWW: Duyệt remote items và thay thế nếu mới hơn
      remoteItems.forEach(remoteItem => {
        const localItem = map.get(remoteItem.id);
        if (localItem) {
          const remoteTime = new Date(remoteItem.updatedAt || remoteItem.createdAt || 0).getTime();
          const localTime = new Date(localItem.updatedAt || localItem.createdAt || 0).getTime();
          
          if (remoteTime > localTime) {
            map.set(remoteItem.id, remoteItem);
          }
        } else {
          // Chưa có thì thêm vào
          map.set(remoteItem.id, remoteItem);
        }
      });

      // Lưu ngược lại
      localStorage.setItem(`dsp_${profileId}_${storeKey}`, JSON.stringify(Array.from(map.values())));
    };

    // Thực hiện merge các collections chính
    if (remote.sbars) mergeCollection('sbars', remote.sbars);
    if (remote.cases) mergeCollection('cases', remote.cases);
    if (remote.notes) mergeCollection('notes', remote.notes);
    if (remote.drugJournal) mergeCollection('drugs', remote.drugJournal);
    if (remote.protocols) mergeCollection('protocols', remote.protocols);
    
    // Đối với SOAP (activeDate và dailyLogs cần merge phức tạp hơn, nhưng LWW toàn bộ record cũng chấp nhận được trong Phase đầu)
    if ((remote as any).soaps) {
      mergeCollection('soaps', (remote as any).soaps);
    }
    
    // Shifts (Chỉ có createdAt)
    if (remote.shifts) mergeCollection('shifts', remote.shifts);

    // Profile settings
    const localProfileStr = localStorage.getItem('dsp_profiles');
    if (localProfileStr) {
      const profiles = JSON.parse(localProfileStr);
      const idx = profiles.findIndex((p: any) => p.id === profileId);
      if (idx >= 0) {
        const localTime = new Date(profiles[idx].lastActiveAt || 0).getTime();
        const remoteTime = new Date(remote.profile.lastActiveAt || 0).getTime();
        if (remoteTime > localTime) {
          profiles[idx] = remote.profile;
          localStorage.setItem('dsp_profiles', JSON.stringify(profiles));
        }
      } else {
        profiles.push(remote.profile);
        localStorage.setItem('dsp_profiles', JSON.stringify(profiles));
      }
    } else {
      localStorage.setItem('dsp_profiles', JSON.stringify([remote.profile]));
    }

    this.onSyncCompleted();
  }

  public disconnect() {
    if (this.dataChannel) {
      this.dataChannel.close();
      this.dataChannel = null;
    }
    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = null;
    }
  }
}
