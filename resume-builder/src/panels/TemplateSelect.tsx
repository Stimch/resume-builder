import { FC } from 'react';
import {
  Panel, PanelHeader, PanelHeaderBack, Group, Header, SimpleCell, Avatar, Badge,
} from '@vkontakte/vkui';
import { TEMPLATES } from '../constants/templates';
import { TemplateId } from '../types/resume';

interface Props {
  id: string;
  onBack: () => void;
  onSelect: (templateId: TemplateId) => void;
}

export const TemplateSelect: FC<Props> = ({ id, onBack, onSelect }) => (
  <Panel id={id}>
    <PanelHeader before={<PanelHeaderBack onClick={onBack} />}>Выбор шаблона</PanelHeader>
    <Group header={<Header>Доступные шаблоны</Header>}>
      {TEMPLATES.map((t) => (
        <SimpleCell
          key={t.id}
          onClick={() => onSelect(t.id)}
          before={<Avatar style={{ background: t.accent }}>{t.title[0]}</Avatar>}
          subtitle={t.description}
          after={<Badge mode="prominent">Выбрать</Badge>}
        >
          {t.title}
        </SimpleCell>
      ))}
    </Group>
  </Panel>
);
