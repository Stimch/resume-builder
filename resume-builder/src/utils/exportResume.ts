import { ResumeData } from '../types/resume';
import { TEMPLATES } from '../constants/templates';

function resumeText(resume: ResumeData): string {
  const template = TEMPLATES.find((t) => t.id === resume.templateId);
  return [
    `${resume.lastName} ${resume.firstName}`,
    `Шаблон: ${template?.title ?? resume.templateId}`,
    '',
    `Контакты: ${resume.phone} | ${resume.email} | ${resume.city}`,
    '',
    'О себе',
    resume.about || '—',
    '',
    'Образование',
    resume.education || '—',
    '',
    'Опыт работы',
    resume.experience || '—',
    '',
    'Навыки',
    resume.skills || '—',
  ].join('\n');
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export async function exportTxt(resume: ResumeData) {
  downloadBlob(new Blob([resumeText(resume)], { type: 'text/plain;charset=utf-8' }), 'resume.txt');
}

export async function exportDocx(resume: ResumeData) {
  const { Document, Packer, Paragraph, TextRun, HeadingLevel } = await import('docx');
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [new TextRun(`${resume.lastName} ${resume.firstName}`)],
          }),
          new Paragraph({ children: [new TextRun(`Контакты: ${resume.phone}, ${resume.email}, ${resume.city}`)] }),
          new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('О себе')] }),
          new Paragraph({ children: [new TextRun(resume.about || '—')] }),
          new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('Образование')] }),
          new Paragraph({ children: [new TextRun(resume.education || '—')] }),
          new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('Опыт работы')] }),
          new Paragraph({ children: [new TextRun(resume.experience || '—')] }),
          new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('Навыки')] }),
          new Paragraph({ children: [new TextRun(resume.skills || '—')] }),
        ],
      },
    ],
  });
  const blob = await Packer.toBlob(doc);
  downloadBlob(blob, 'resume.docx');
}

export async function exportPdf(resume: ResumeData) {
  const { jsPDF } = await import('jspdf');
  const pdf = new jsPDF();
  const lines = pdf.splitTextToSize(resumeText(resume), 180);
  pdf.text(lines, 10, 15);
  pdf.save('resume.pdf');
}
