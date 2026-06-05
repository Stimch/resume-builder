import { FC } from 'react';
import {
  Panel, PanelHeader, Header, Button, Group, Div, Card, CardGrid, Text, SimpleCell, Progress,
} from '@vkontakte/vkui';
import { UserInfo } from '@vkontakte/vk-bridge';
import { PanelId } from '../App';

export interface HomeProps {
  id: string;
  fetchedUser?: UserInfo;
  points: number;
  onNavigate: (panel: PanelId) => void;
}

export const Home: FC<HomeProps> = ({ id, fetchedUser, points, onNavigate }) => {
  const recommendations = [
    'Указывайте только актуальную информацию',
    'Используйте четкие формулировки с цифрами',
    'Выделяйте ключевые навыки',
    'Пройдите курс VK Education по mini-apps',
  ];

  const level = Math.min(100, points);

  return (
    <Panel id={id}>
      <PanelHeader>Конструктор резюме</PanelHeader>

      {fetchedUser && (
        <Group header={<Header>Привет, {fetchedUser.first_name}!</Header>}>
          <SimpleCell subtitle="Данные подставятся из вашего профиля VK">
            {fetchedUser.last_name} {fetchedUser.first_name}
          </SimpleCell>
        </Group>
      )}

      <Group header={<Header>Геймификация</Header>}>
        <Div>
          <Text>Очки опыта: {points} · Уровень карьеры</Text>
          <Progress value={level} style={{ marginTop: 8 }} />
        </Div>
      </Group>

      <Group>
        <Div>
          <Button stretched size="l" mode="primary" onClick={() => onNavigate('template-select')}>
            Создать новое резюме
          </Button>
        </Div>
        <Div>
          <Button stretched size="l" mode="secondary" onClick={() => onNavigate('my-resumes')}>
            Мои резюме
          </Button>
        </Div>
      </Group>

      <Group header={<Header>Рекомендации</Header>}>
        <CardGrid size="l">
          {recommendations.map((item, index) => (
            <Card key={index} style={{ padding: '16px' }}>
              <SimpleCell><Text>{item}</Text></SimpleCell>
            </Card>
          ))}
        </CardGrid>
      </Group>
    </Panel>
  );
};
