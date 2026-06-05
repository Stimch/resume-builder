import { TemplateId } from '../types/resume';

export const TEMPLATES: { id: TemplateId; title: string; description: string; accent: string }[] = [
  {
    id: 'classic',
    title: 'Классический',
    description: 'Строгий шаблон для офисных и корпоративных вакансий',
    accent: '#2787F5',
  },
  {
    id: 'modern',
    title: 'Современный',
    description: 'Яркий акцент для IT и digital-направлений',
    accent: '#4BB34B',
  },
  {
    id: 'minimal',
    title: 'Минималистичный',
    description: 'Лаконичный дизайн без лишних деталей',
    accent: '#735CE6',
  },
];
