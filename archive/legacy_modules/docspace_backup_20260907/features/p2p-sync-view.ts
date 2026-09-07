import { P2PSyncEngine } from '../data/p2p-sync';
import { DocSpaceSnapshot } from '../types';

let syncEngine: P2PSyncEngine | null = null;

export function renderSyncModal(): string {
  return `
    <div class="dsp-modal-overlay" id="dspSyncModal" style="display: flex;">
      <div class="dsp-modal-content" style="max-width: 600px; padding: 24px;">
        <div class="dsp-modal-header" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--color-border); padding-bottom: 16px; margin-bottom: 16px;">
          <h2 style="margin: 0; font-size: 20px;"><i class="fa-solid fa-rotate"></i> Đồng bộ Đa thiết bị (P2P)</h2>
          <button id="dspCloseSyncBtn" style="background: none; border: none; font-size: 20px; cursor: pointer; color: var(--color-text-muted);"><i class="fa-solid fa-xmark"></i></button>
        </div>
        
        <div class="dsp-modal-body">
          <p style="margin-bottom: 20px; color: var(--color-text-muted);">
            Đồng bộ dữ liệu trực tiếp giữa 2 thiết bị của bạn mà không thông qua Server (Mã hóa E2EE). 
            Một thiết bị cần "Tạo phòng" (Host), thiết bị kia "Tham gia" (Join).
          </p>

          <div style="display: flex; gap: 12px; margin-bottom: 24px;">
            <button class="dsp-btn dsp-btn-primary" id="dspSyncHostBtn" style="flex: 1;">
              <i class="fa-solid fa-house-signal"></i> 1. Tạo phòng (Host)
            </button>
            <button class="dsp-btn dsp-btn-secondary" id="dspSyncJoinBtn" style="flex: 1; background: var(--color-surface); border: 1px solid var(--color-border);">
              <i class="fa-solid fa-right-to-bracket"></i> 2. Tham gia (Join)
            </button>
          </div>

          <div id="dspSyncStepArea" style="background: var(--color-bg); padding: 16px; border-radius: 8px; min-height: 150px; display: none;">
            <!-- Dynamic content based on step -->
          </div>
          
          <div id="dspSyncStatus" style="margin-top: 16px; font-weight: bold; color: var(--color-primary); text-align: center;"></div>
        </div>
      </div>
    </div>
  `;
}

export function mountSyncController(getSnapshotFn: () => Promise<DocSpaceSnapshot>) {
  const closeBtn = document.getElementById('dspCloseSyncBtn');
  const hostBtn = document.getElementById('dspSyncHostBtn');
  const joinBtn = document.getElementById('dspSyncJoinBtn');
  const stepArea = document.getElementById('dspSyncStepArea');
  const statusDiv = document.getElementById('dspSyncStatus');
  const modal = document.getElementById('dspSyncModal');

  if (!stepArea || !statusDiv) return;

  const resetSync = () => {
    if (syncEngine) {
      syncEngine.disconnect();
      syncEngine = null;
    }
    stepArea.innerHTML = '';
    stepArea.style.display = 'none';
    statusDiv.innerHTML = '';
  };

  closeBtn?.addEventListener('click', () => {
    resetSync();
    if (modal) modal.style.display = 'none';
    modal?.remove(); // Cleanup DOM
  });

  hostBtn?.addEventListener('click', async () => {
    resetSync();
    stepArea.style.display = 'block';
    stepArea.innerHTML = `<p>Đang tạo phòng...</p>`;
    
    syncEngine = new P2PSyncEngine();
    
    syncEngine.onIceCandidateReady = (offerBase64) => {
      stepArea.innerHTML = `
        <p style="margin-bottom: 8px; font-weight: bold;">Bước 1: Copy mã này sang thiết bị kia (vào ô Tham gia)</p>
        <textarea readonly style="width: 100%; height: 60px; font-family: monospace; font-size: 11px; padding: 8px; margin-bottom: 12px;" onclick="this.select()">${offerBase64}</textarea>
        
        <p style="margin-bottom: 8px; font-weight: bold;">Bước 3: Dán mã phản hồi từ thiết bị kia vào đây</p>
        <textarea id="dspHostAnswerInput" style="width: 100%; height: 60px; font-family: monospace; font-size: 11px; padding: 8px; margin-bottom: 12px;"></textarea>
        <button class="dsp-btn dsp-btn-primary" id="dspHostCompleteBtn">Hoàn tất kết nối</button>
      `;

      document.getElementById('dspHostCompleteBtn')?.addEventListener('click', () => {
        const answer = (document.getElementById('dspHostAnswerInput') as HTMLTextAreaElement).value.trim();
        if (answer) {
          syncEngine?.completeConnection(answer);
          statusDiv.innerHTML = 'Đang kết nối...';
        }
      });
    };

    setupEngineCallbacks(syncEngine, statusDiv, getSnapshotFn);
    await syncEngine.hostRoom();
  });

  joinBtn?.addEventListener('click', () => {
    resetSync();
    stepArea.style.display = 'block';
    
    stepArea.innerHTML = `
      <p style="margin-bottom: 8px; font-weight: bold;">Bước 2: Dán mã Offer từ thiết bị Host vào đây</p>
      <textarea id="dspJoinOfferInput" style="width: 100%; height: 60px; font-family: monospace; font-size: 11px; padding: 8px; margin-bottom: 12px;"></textarea>
      <button class="dsp-btn dsp-btn-primary" id="dspJoinCreateAnswerBtn">Tạo mã phản hồi</button>
      
      <div id="dspJoinAnswerArea" style="display: none; margin-top: 16px;">
        <p style="margin-bottom: 8px; font-weight: bold; color: var(--color-success);">Copy mã phản hồi này về lại thiết bị Host</p>
        <textarea id="dspJoinAnswerOutput" readonly style="width: 100%; height: 60px; font-family: monospace; font-size: 11px; padding: 8px;" onclick="this.select()"></textarea>
      </div>
    `;

    document.getElementById('dspJoinCreateAnswerBtn')?.addEventListener('click', async () => {
      const offer = (document.getElementById('dspJoinOfferInput') as HTMLTextAreaElement).value.trim();
      if (!offer) return;

      syncEngine = new P2PSyncEngine();
      setupEngineCallbacks(syncEngine, statusDiv, getSnapshotFn);
      
      syncEngine.onIceCandidateReady = (answerBase64) => {
        const answerArea = document.getElementById('dspJoinAnswerArea');
        const answerOutput = document.getElementById('dspJoinAnswerOutput') as HTMLTextAreaElement;
        if (answerArea && answerOutput) {
          answerArea.style.display = 'block';
          answerOutput.value = answerBase64;
          statusDiv.innerHTML = 'Đang đợi Host hoàn tất kết nối...';
        }
      };

      await syncEngine.joinRoom(offer);
    });
  });
}

function setupEngineCallbacks(engine: P2PSyncEngine, statusDiv: HTMLElement, getSnapshotFn: () => Promise<DocSpaceSnapshot>) {
  engine.onConnectionStateChange = async (state) => {
    if (state === 'connected') {
      statusDiv.innerHTML = '<span style="color: var(--color-success);"><i class="fa-solid fa-check"></i> Đã kết nối! Đang chuẩn bị dữ liệu...</span>';
      // Automatically send data when connected
      const snapshot = await getSnapshotFn();
      statusDiv.innerHTML = '<span style="color: var(--color-success);"><i class="fa-solid fa-check"></i> Đang đồng bộ...</span>';
      engine.sendSyncData(snapshot);
    } else if (state === 'disconnected' || state === 'failed') {
      statusDiv.innerHTML = '<span style="color: var(--color-danger);"><i class="fa-solid fa-triangle-exclamation"></i> Mất kết nối.</span>';
    }
  };

  engine.onError = (err) => {
    statusDiv.innerHTML = `<span style="color: var(--color-danger);">${err}</span>`;
  };

  engine.onSyncCompleted = () => {
    statusDiv.innerHTML = '<span style="color: var(--color-success);"><i class="fa-solid fa-check-double"></i> Đồng bộ thành công! Dữ liệu đã được cập nhật. Cửa sổ này sẽ tự đóng...</span>';
    setTimeout(() => {
      document.getElementById('dspCloseSyncBtn')?.click();
      window.location.reload(); // Reload to reflect changes
    }, 3000);
  };
}
