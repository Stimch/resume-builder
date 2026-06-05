export type TemplateId = 'classic' | 'modern' | 'minimal';

export interface ResumeData {
  id: string;
  templateId: TemplateId;
  firstName: string;
  lastName: string;
  photo: string;
  phone: string;
  email: string;
  city: string;
  education: string;
  experience: string;
  skills: string;
  about: string;
  updatedAt: number;
}

export const emptyResume = (templateId: TemplateId = 'classic'): ResumeData => ({
  id: String(Date.now()),
  templateId,
  firstName: '',
  lastName: '',
  photo: '',
  phone: '',
  email: '',
  city: '',
  education: '',
  experience: '',
  skills: '',
  about: '',
  updatedAt: Date.now(),
});
