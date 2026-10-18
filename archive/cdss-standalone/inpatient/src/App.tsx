import React, { useState, useEffect } from 'react';
import { TabType, BodySystem, PersonalNote, ResidentBookmark } from './types/clinical';
import { Navbar } from './components/Navbar';
import { ExaminationView } from './components/ExaminationView';
import { ApproachView } from './components/ApproachView';
import { HistoryTakingView } from './components/HistoryTakingView';
import { QuickSearchModal } from './components/QuickSearchModal';
import { NotesModal } from './components/NotesModal';
import { storageService } from './services/storageService';
import { EXAMINATION_MODULES } from './data/examinationData';
import { APPROACH_TOPICS } from './data/approachData';
import { Check, ShieldAlert, Sparkles, BookOpen } from 'lucide-react';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [currentTab, setCurrentTab] = useState<TabType>('examination');
  const [selectedExamId, setSelectedExamId] = useState<string>(EXAMINATION_MODULES[0].id);
  const [selectedTopicId, setSelectedTopicId] = useState<string>(APPROACH_TOPICS[0].id);

  // Bookmarks & Notes State
  const [bookmarks, setBookmarks] = useState<ResidentBookmark[]>([]);
  const [notes, setNotes] = useState<PersonalNote[]>([]);

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [noteModalConfig, setNoteModalConfig] = useState<{
    isOpen: boolean;
    topicId: string;
    topicTitle: string;
    topicType: 'exam' | 'approach';
    existingNote?: PersonalNote | null;
  }>({
    isOpen: false,
    topicId: '',
    topicTitle: '',
    topicType: 'exam',
    existingNote: null
  });

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Load Initial Storage Data
  useEffect(() => {
    setBookmarks(storageService.getBookmarks());
    setNotes(storageService.getNotes());
  }, []);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleBookmark = (id: string, title: string, system: BodySystem) => {
    const type = currentTab === 'examination' ? 'exam' : 'approach';
    const added = storageService.toggleBookmark({
      id,
      title,
      system,
      type
    });
    setBookmarks(storageService.getBookmarks());
    showToast(added ? `★ Đã đánh dấu mục tiêu: "${title}"` : `Đã bỏ đánh dấu: "${title}"`);
  };

  const handleToggleMastery = (id: string) => {
    storageService.toggleMastered(id);
    setBookmarks(storageService.getBookmarks());
  };

  const handleRemoveBookmark = (id: string) => {
    const item = bookmarks.find(b => b.id === id);
    if (item) {
      storageService.toggleBookmark({
        id: item.id,
        title: item.title,
        system: item.system,
        type: item.type
      });
      setBookmarks(storageService.getBookmarks());
      showToast(`Đã xóa mục tiêu khỏi sổ tay`);
    }
  };

  const handleOpenNotesForTopic = (topicId: string, topicTitle: string, existingNote?: PersonalNote | null) => {
    const topicType = currentTab === 'examination' ? 'exam' : 'approach';
    setNoteModalConfig({
      isOpen: true,
      topicId,
      topicTitle,
      topicType,
      existingNote: existingNote || null
    });
  };

  const handleNoteSaved = () => {
    setNotes(storageService.getNotes());
    showToast('✓ Ghi chú cá nhân đã được lưu thành công');
  };

  const handleDeleteNote = (id: string) => {
    if (confirm('Bạn có muốn xóa ghi chú này không?')) {
      storageService.deleteNote(id);
      setNotes(storageService.getNotes());
      showToast('Đã xóa ghi chú');
    }
  };

  const isBookmarked = (id: string) => {
    return bookmarks.some(b => b.id === id);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenSearch={() => setIsSearchOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Body Content based on Tab */}
      <main className="flex-1 pb-16">
        {currentTab === 'history-taking' && (
          <HistoryTakingView />
        )}

        {currentTab === 'examination' && (
          <ExaminationView
            selectedExamId={selectedExamId}
            onSelectExamId={setSelectedExamId}
            onOpenNotes={(id, title) => handleOpenNotesForTopic(id, title)}
            onToggleBookmark={handleToggleBookmark}
            isBookmarked={isBookmarked}
          />
        )}

        {currentTab === 'approach' && (
          <ApproachView
            selectedTopicId={selectedTopicId}
            onSelectTopicId={setSelectedTopicId}
            onOpenNotes={(id, title) => handleOpenNotesForTopic(id, title)}
            onToggleBookmark={handleToggleBookmark}
            isBookmarked={isBookmarked}
          />
        )}
      </main>

      {/* Global Quick Search Modal */}
      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectHistory={() => setCurrentTab('history-taking')}
        onSelectExam={(examId) => {
          setSelectedExamId(examId);
          setCurrentTab('examination');
        }}
        onSelectApproach={(approachId) => {
          setSelectedTopicId(approachId);
          setCurrentTab('approach');
        }}
      />

      {/* Global Notes Edit Modal */}
      <NotesModal
        isOpen={noteModalConfig.isOpen}
        onClose={() => setNoteModalConfig(prev => ({ ...prev, isOpen: false }))}
        topicId={noteModalConfig.topicId}
        topicTitle={noteModalConfig.topicTitle}
        topicType={noteModalConfig.topicType}
        existingNote={noteModalConfig.existingNote}
        onNoteSaved={handleNoteSaved}
      />

      {/* Toast Notification Floating */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 dark:bg-slate-800 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 dark:border-slate-600 flex items-center space-x-2.5 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Professional Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 text-slate-500 dark:text-slate-400 text-xs text-center no-print transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-600 dark:text-slate-300 font-medium">
            <span>© 2026 ClinicalCDSS - Cẩm Nang Khám Lâm Sàng Bác Sĩ Nội Trú</span>
            <span>•</span>
            <span>Dựa trên Bates’ Pocket Guide (Wolters Kluwer) & Macleod’s Clinical Examination (Elsevier)</span>
            <span>•</span>
            <span className="text-teal-700 dark:text-teal-400 font-semibold cursor-pointer hover:underline" onClick={() => setIsSearchOpen(true)}>
              Tra cứu nhanh (⌘K)
            </span>
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 max-w-3xl mx-auto">
            Hệ thống hỗ trợ ra quyết định lâm sàng và đào tạo sau đại học. Mọi quyết định điều trị cần được cá thể hóa dựa trên đánh giá trực tiếp của bác sĩ và hướng dẫn chuyên môn hiện hành.
          </p>
        </div>
      </footer>
    </div>
  );
}
