import { FC } from 'react';
import {
  Panel, PanelHeader, PanelHeaderBack, Group, Header, Div, Button, Text, Title, Caption,
} from '@vkontakte/vkui';
import { ResumeData } from '../types/resume';
import { TEMPLATES } from '../constants/templates';
import { exportDocx, exportPdf, exportTxt } from '../utils/exportResume';

interface Props {
  id: string;
  resume: ResumeData;
  onBack: () => void;
  onCheck: () => void;
  onSave: () => void;
}

export const Preview: FC<Props> = ({ id, resume, onBack, onCheck, onSave }) => {
  const template = TEMPLATES.find((t) => t.id === resume.templateId);

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={onBack} />}>Предпросмотр</PanelHeader>

      <Group>
        <Div style={{ borderLeft: `4px solid ${template?.accent ?? '#2787F5'}`, paddingLeft: 12 }}>
          <Title level="1">{resume.lastName} {resume.firstName}</Title>
          <Caption level="1">{resume.phone} · {resume.email} · {resume.city}</Caption>
        </Div>
      </Group>

      <Group header={<Header>О себе</Header>}>
        <Div><Text>{resume.about || '—'}</Text></Div>
      </Group>
      <Group header={<Header>Образование</Header>}>
        <Div><Text>{resume.education || '—'}</Text></Div>
      </Group>
      <Group header={<Header>Опыт работы</Header>}>
        <Div><Text>{resume.experience || '—'}</Text></Div>
      </Group>
      <Group header={<Header>Навыки</Header>}>
        <Div><Text>{resume.skills || '—'}</Text></Div>
      </Group>

      <Group header={<Header>Экспорт</Header>}>
        <Div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Button mode="secondary" onClick={() => exportPdf(resume)}>Скачать PDF</Button>
          <Button mode="secondary" onClick={() => exportDocx(resume)}>Скачать DOCX</Button>
          <Button mode="secondary" onClick={() => exportTxt(resume)}>Скачать TXT</Button>
        </Div>
      </Group>

      <Group>
        <Div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Button stretched onClick={onCheck}>Проверить резюме</Button>
          <Button stretched mode="primary" onClick={onSave}>Сохранить в «Мои резюме»</Button>
        </Div>
      </Group>
    </Panel>
  );
};
