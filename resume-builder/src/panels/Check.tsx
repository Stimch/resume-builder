import { FC } from 'react';
import {
  Panel, PanelHeader, PanelHeaderBack, Group, Header, Progress, SimpleCell, Text, Div, Button,
} from '@vkontakte/vkui';
import { ResumeData } from '../types/resume';
import { checkResume } from '../utils/resumeCheck';

interface Props {
  id: string;
  resume: ResumeData;
  onBack: () => void;
}

export const Check: FC<Props> = ({ id, resume, onBack }) => {
  const result = checkResume(resume);

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={onBack} />}>Проверка резюме</PanelHeader>

      <Group header={<Header>Оценка нейросети</Header>}>
        <Div>
          <Text style={{ marginBottom: 8 }}>Качество резюме: {result.score}/100</Text>
          <Progress value={result.score} />
        </Div>
      </Group>

      <Group header={<Header>Рекомендации</Header>}>
        {result.tips.map((tip, i) => (
          <SimpleCell key={i} multiline>{tip}</SimpleCell>
        ))}
      </Group>

      <Group>
        <Div>
          <Button stretched onClick={onBack}>Вернуться к предпросмотру</Button>
        </Div>
      </Group>
    </Panel>
  );
};
