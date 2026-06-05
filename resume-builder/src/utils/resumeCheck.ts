import { ResumeData } from '../types/resume';

export interface CheckResult {
  score: number;
  tips: string[];
}

export function checkResume(resume: ResumeData): CheckResult {
  const tips: string[] = [];
  let score = 100;

  if (!resume.firstName.trim() || !resume.lastName.trim()) {
    tips.push('Укажите имя и фамилию.');
    score -= 15;
  }
  if (!resume.photo) {
    tips.push('Добавьте фотографию — резюме с фото получает больше откликов.');
    score -= 10;
  }
  if (!resume.phone && !resume.email) {
    tips.push('Добавьте хотя бы один способ связи.');
    score -= 15;
  }
  if (!resume.education.trim()) {
    tips.push('Заполните блок «Образование».');
    score -= 15;
  }
  if (!resume.experience.trim()) {
    tips.push('Опишите опыт работы или стажировки.');
    score -= 15;
  }
  if (resume.experience.length > 0 && resume.experience.length < 80) {
    tips.push('Опыт работы слишком короткий — добавьте достижения и задачи.');
    score -= 10;
  }
  if (resume.experience.length > 2000) {
    tips.push('Опыт работы слишком длинный — сократите до 1–1,5 страниц.');
    score -= 10;
  }

  const typoPatterns = [/тебя/gi, /в течении/gi, /в следствии/gi];
  const text = `${resume.experience} ${resume.about}`;
  if (typoPatterns.some((p) => p.test(text))) {
    tips.push('Проверьте текст на типичные ошибки (например, «в течение», «вследствие»).');
    score -= 5;
  }

  if (tips.length === 0) {
    tips.push('Отличная работа! Резюме выглядит полным и структурированным.');
  }

  return { score: Math.max(0, score), tips };
}
