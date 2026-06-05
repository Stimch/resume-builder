import { FC } from 'react';
import {
  Panel, PanelHeader, PanelHeaderBack, Group, Header, SimpleCell, Avatar, Button, Div, Placeholder,
} from '@vkontakte/vkui';
import { ResumeData } from '../types/resume';

interface Props {
  id: string;
  resumes: ResumeData[];
  onBack: () => void;
  onOpen: (resume: ResumeData) => void;
}

export const MyResumes: FC<Props> = ({ id, resumes, onBack, onOpen }) => (
  <Panel id={id}>
    <PanelHeader before={<PanelHeaderBack onClick={onBack} />}>Мои резюме</PanelHeader>

    {resumes.length === 0 ? (
      <Placeholder>Пока нет сохранённых резюме</Placeholder>
    ) : (
      <Group header={<Header>Сохранённые ({resumes.length})</Header>}>
        {resumes.map((r) => (
          <SimpleCell
            key={r.id}
            onClick={() => onOpen(r)}
            before={r.photo ? <Avatar src={r.photo} /> : <Avatar />}
            subtitle={new Date(r.updatedAt).toLocaleDateString('ru-RU')}
          >
            {r.lastName} {r.firstName}
          </SimpleCell>
        ))}
      </Group>
    )}

    <Group>
      <Div>
        <Button stretched mode="secondary" onClick={onBack}>На главную</Button>
      </Div>
    </Group>
  </Panel>
);
