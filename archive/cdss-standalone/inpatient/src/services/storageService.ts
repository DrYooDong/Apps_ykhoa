import { PersonalNote, ResidentBookmark } from '../types/clinical';

const BOOKMARKS_KEY = 'cdss_resident_bookmarks';
const NOTES_KEY = 'cdss_personal_notes';

// Initial default notes to give residents a helpful template
const DEFAULT_NOTES: PersonalNote[] = [
  {
    id: 'note-sample-1',
    topicId: 'approach-chest-pain',
    topicTitle: 'Tiếp Cận Bệnh Nhân Đau Ngực',
    topicType: 'approach',
    title: 'Case lâm sàng giao ban: Bệnh nhân ĐMC bóc tách type A',
    content: 'Bệnh nhân nam 58 tuổi tiền sử THA không đều, vào viện vì đau xé ngực lan sau lưng 2 bả vai. Huyết áp tay phải 170/95, tay trái 135/80 (chênh 35 mmHg). ECG chỉ có dày thất trái không có ST chênh. Siêu âm tim mờ mỏm, CTA ngực cấp cứu phát hiện flap bóc tách từ gốc ĐMC lên quai. Bài học: Tuyệt đối không cho Plavix hay Heparin vội vàng khi chưa đo HA 2 tay!',
    tags: ['Cấp cứu', 'Tim mạch', 'Bóc tách ĐMC', 'Bates Ch.16'],
    clinicalCaseExample: 'BN Nam, 58T, Khoa Cấp Cứu BV Chợ Rẫy',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'note-sample-2',
    topicId: 'gastrointestinal-exam',
    topicTitle: 'Khám Bụng & Hệ Tiêu Hóa',
    topicType: 'exam',
    title: 'Kinh nghiệm sờ bờ gan và lách to ở bệnh nhân xơ gan',
    content: 'Khi khám lách to độ 1-2, nếu nằm ngửa không rõ hãy cho bệnh nhân xoay nghiêng phải 45 độ, luồn bàn tay trái nâng lồng ngực trái từ sau ra trước, tay phải đón lách khi thở sâu. Nhớ gõ khoảng Traube trước khi sờ. Đục khoảng Traube là gợi ý lách to rất có giá trị.',
    tags: ['Khám bụng', 'Tiêu hóa', 'Xơ gan', 'Macleod Ch.6'],
    clinicalCaseExample: 'BN Nữ, 62T, Viêm gan B mạn tính',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const storageService = {
  // Bookmarks
  getBookmarks(): ResidentBookmark[] {
    try {
      const data = localStorage.getItem(BOOKMARKS_KEY);
      if (!data) return [];
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to parse bookmarks from storage', e);
      return [];
    }
  },

  isBookmarked(topicId: string): boolean {
    const list = this.getBookmarks();
    return list.some(b => b.id === topicId);
  },

  toggleBookmark(bookmark: Omit<ResidentBookmark, 'addedAt' | 'isMastered'>): boolean {
    const list = this.getBookmarks();
    const existingIndex = list.findIndex(b => b.id === bookmark.id);
    let added = false;

    if (existingIndex >= 0) {
      list.splice(existingIndex, 1);
    } else {
      list.push({
        ...bookmark,
        addedAt: new Date().toISOString(),
        isMastered: false
      });
      added = true;
    }

    try {
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(list));
    } catch (e) {
      console.error('Failed to save bookmark', e);
    }

    return added;
  },

  toggleMastered(topicId: string): boolean {
    const list = this.getBookmarks();
    const item = list.find(b => b.id === topicId);
    if (!item) return false;
    item.isMastered = !item.isMastered;
    try {
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(list));
    } catch (e) {
      console.error('Failed to update mastery', e);
    }
    return item.isMastered;
  },

  // Notes
  getNotes(): PersonalNote[] {
    try {
      const data = localStorage.getItem(NOTES_KEY);
      if (!data) {
        localStorage.setItem(NOTES_KEY, JSON.stringify(DEFAULT_NOTES));
        return DEFAULT_NOTES;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to parse notes from storage', e);
      return DEFAULT_NOTES;
    }
  },

  getNotesByTopic(topicId: string): PersonalNote[] {
    const notes = this.getNotes();
    return notes.filter(n => n.topicId === topicId);
  },

  saveNote(note: Omit<PersonalNote, 'id' | 'createdAt' | 'updatedAt'>, id?: string): PersonalNote {
    const notes = this.getNotes();
    const now = new Date().toISOString();

    if (id) {
      const index = notes.findIndex(n => n.id === id);
      if (index >= 0) {
        notes[index] = {
          ...notes[index],
          ...note,
          updatedAt: now
        };
        localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
        return notes[index];
      }
    }

    const newNote: PersonalNote = {
      ...note,
      id: `note-${Date.now()}`,
      createdAt: now,
      updatedAt: now
    };

    notes.unshift(newNote);
    try {
      localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    } catch (e) {
      console.error('Failed to save note', e);
    }
    return newNote;
  },

  deleteNote(id: string): void {
    const notes = this.getNotes().filter(n => n.id !== id);
    try {
      localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    } catch (e) {
      console.error('Failed to delete note', e);
    }
  }
};
