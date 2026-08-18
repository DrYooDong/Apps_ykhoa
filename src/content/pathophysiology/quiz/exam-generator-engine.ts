/**
 * CliniPortal 2.0 — Medical Exam Generation & Evaluation Engine (Thuật Toán Tạo & Chấm Đề)
 * Path: src/content/pathophysiology/quiz/exam-generator-engine.ts
 */

import { EXAM_QUESTION_BANK, ExamQuestion, TOPIC_METADATA_LIST } from './exam-bank-data';

export interface ExamConfig {
  sourceSubjects: ('biochem' | 'physiology' | 'patho')[];
  selectedTopics: string[]; // 'all' or list of topic keys
  questionCount: number;
  difficultyLevel: 'all' | 'easy' | 'medium' | 'hard' | 'balanced';
  mode: 'exam' | 'tutor';
  timeLimitMinutes: number;
}

export interface GeneratedExam {
  id: string;
  title: string;
  config: ExamConfig;
  questions: ExamQuestion[];
  totalQuestions: number;
  createdAt: string;
}

export interface TopicPerformance {
  topicKey: string;
  topicName: string;
  total: number;
  correct: number;
  percentage: number;
}

export interface ExamEvaluationResult {
  examId: string;
  totalQuestions: number;
  answeredCount: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  scorePercentage: number;
  timeSpentSeconds: number;
  passed: boolean;
  gradeTitle: string;
  feedbackMessage: string;
  topicBreakdown: TopicPerformance[];
  detailedQuestions: {
    question: ExamQuestion;
    userAnswer: 'A' | 'B' | 'C' | 'D' | null;
    isCorrect: boolean;
  }[];
}

/**
 * Thuật toán xáo trộn Fisher-Yates (Knuth Shuffle)
 */
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * THUẬT TOÁN SINH ĐỀ THI THEO MA TRẬN BLUEPRINT Y KHOA
 */
export function generateCustomExam(config: ExamConfig): GeneratedExam {
  // 1. Lọc theo Môn học (Subjects)
  let pool = EXAM_QUESTION_BANK.filter(q => config.sourceSubjects.includes(q.subjectKey));

  // 2. Lọc theo Chuyên đề (Topics)
  if (config.selectedTopics.length > 0 && !config.selectedTopics.includes('all')) {
    pool = pool.filter(q => config.selectedTopics.includes(q.topicKey));
  }

  // 3. Lấy mẫu phân tầng theo Độ khó (Stratified Sampling by Difficulty)
  let selectedQuestions: ExamQuestion[] = [];

  if (config.difficultyLevel === 'easy') {
    selectedQuestions = pool.filter(q => q.difficulty === 'Dễ');
  } else if (config.difficultyLevel === 'medium') {
    selectedQuestions = pool.filter(q => q.difficulty === 'Vừa');
  } else if (config.difficultyLevel === 'hard') {
    selectedQuestions = pool.filter(q => q.difficulty === 'Khó');
  } else if (config.difficultyLevel === 'balanced') {
    // Phân bổ chuẩn: 30% Dễ, 50% Vừa, 20% Khó
    const count = config.questionCount;
    const targetEasy = Math.max(1, Math.round(count * 0.3));
    const targetMedium = Math.max(1, Math.round(count * 0.5));
    const targetHard = Math.max(1, count - targetEasy - targetMedium);

    const easyPool = shuffleArray(pool.filter(q => q.difficulty === 'Dễ'));
    const medPool = shuffleArray(pool.filter(q => q.difficulty === 'Vừa'));
    const hardPool = shuffleArray(pool.filter(q => q.difficulty === 'Khó'));

    selectedQuestions = [
      ...easyPool.slice(0, targetEasy),
      ...medPool.slice(0, targetMedium),
      ...hardPool.slice(0, targetHard)
    ];

    // Bổ sung nếu chưa đủ số lượng yêu cầu
    if (selectedQuestions.length < count) {
      const remainingPool = pool.filter(q => !selectedQuestions.some(sq => sq.id === q.id));
      selectedQuestions.push(...shuffleArray(remainingPool).slice(0, count - selectedQuestions.length));
    }
  } else {
    // 'all' -> Trộn ngẫu nhiên toàn bộ
    selectedQuestions = shuffleArray(pool).slice(0, config.questionCount);
  }

  // Nếu số câu chọn được ít hơn ngân hàng yêu cầu, lấy toàn bộ pool có sẵn
  if (selectedQuestions.length === 0) {
    selectedQuestions = shuffleArray(pool).slice(0, config.questionCount);
  }

  // 4. Xáo trộn thứ tự câu hỏi và xáo trộn vị trí đáp án
  const randomizedQuestions = shuffleArray(selectedQuestions).map(q => {
    // Xáo trộn 4 phương án lựa chọn và cập nhật lại correctKey tương ứng
    const originalCorrectText = q.options.find(o => o.id === q.correctKey)?.text || '';
    const shuffledOptionsText = shuffleArray(q.options.map(o => o.text));

    const keys: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];
    let newCorrectKey: 'A' | 'B' | 'C' | 'D' = 'A';

    const newOptions = keys.map((key, idx) => {
      const text = shuffledOptionsText[idx];
      if (text === originalCorrectText) {
        newCorrectKey = key;
      }
      return { id: key, text };
    });

    return {
      ...q,
      options: newOptions,
      correctKey: newCorrectKey
    };
  });

  const subjectNames = config.sourceSubjects.map(s => {
    if (s === 'biochem') return 'Hóa Sinh';
    if (s === 'physiology') return 'Sinh Lý';
    return 'Bệnh Sinh';
  }).join(' & ');

  return {
    id: `exam_${Date.now()}`,
    title: `Đề Thi Ôn Tập Y Khoa: ${subjectNames} (${randomizedQuestions.length} Câu)`,
    config,
    questions: randomizedQuestions,
    totalQuestions: randomizedQuestions.length,
    createdAt: new Date().toISOString()
  };
}

/**
 * THUẬT TOÁN CHẤM ĐIỂM & PHÂN TÍCH NĂNG LỰC ĐỀ THI
 */
export function evaluateExamSubmission(
  exam: GeneratedExam,
  userAnswers: Record<string, 'A' | 'B' | 'C' | 'D' | null>,
  timeSpentSeconds: number
): ExamEvaluationResult {
  let correctCount = 0;
  let answeredCount = 0;
  const topicStats: Record<string, { topicName: string; total: number; correct: number }> = {};

  const detailedQuestions = exam.questions.map(q => {
    const userAns = userAnswers[q.id] || null;
    const isCorrect = userAns === q.correctKey;

    if (userAns !== null) answeredCount++;
    if (isCorrect) correctCount++;

    if (!topicStats[q.topicKey]) {
      topicStats[q.topicKey] = {
        topicName: q.topicName,
        total: 0,
        correct: 0
      };
    }
    topicStats[q.topicKey].total++;
    if (isCorrect) topicStats[q.topicKey].correct++;

    return {
      question: q,
      userAnswer: userAns,
      isCorrect
    };
  });

  const totalQuestions = exam.questions.length;
  const incorrectCount = answeredCount - correctCount;
  const unansweredCount = totalQuestions - answeredCount;
  const scorePercentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const passed = scorePercentage >= 70;

  // Xếp loại & Phản hồi
  let gradeTitle = 'Chưa Đạt';
  let feedbackMessage = 'Cần ôn tập kỹ lại các cơ chế phân tử và sinh lý học nền tảng.';

  if (scorePercentage >= 90) {
    gradeTitle = 'Xuất Sắc (Mastery Level)';
    feedbackMessage = 'Tuyệt vời! Bạn nắm cực kỳ vững các quy luật sinh lý và cơ chế chuyển hóa hóa sinh!';
  } else if (scorePercentage >= 80) {
    gradeTitle = 'Giỏi (High Pass)';
    feedbackMessage = 'Kết quả rất tốt! Nắm chắc hầu hết các khái niệm then chốt.';
  } else if (scorePercentage >= 70) {
    gradeTitle = 'Đạt (Pass)';
    feedbackMessage = 'Đã đạt ngưỡng yêu cầu. Hãy xem lại các câu sai để củng cố các điểm ngọc lâm sàng.';
  }

  // Chuyển đổi thống kê chuyên đề
  const topicBreakdown: TopicPerformance[] = Object.keys(topicStats).map(tKey => {
    const stat = topicStats[tKey];
    return {
      topicKey: tKey,
      topicName: stat.topicName,
      total: stat.total,
      correct: stat.correct,
      percentage: stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0
    };
  });

  return {
    examId: exam.id,
    totalQuestions,
    answeredCount,
    correctCount,
    incorrectCount,
    unansweredCount,
    scorePercentage,
    timeSpentSeconds,
    passed,
    gradeTitle,
    feedbackMessage,
    topicBreakdown,
    detailedQuestions
  };
}
