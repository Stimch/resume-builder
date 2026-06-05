import { FC, useEffect, useState } from 'react';
import {
  Panel, PanelHeader, PanelHeaderBack, Group, Header, Input, Textarea, Button, Div,
  FormItem, Avatar, Banner, Snackbar,
} from '@vkontakte/vkui';
import { ResumeData } from '../types/resume';
import { enrichResumeFromVk } from '../utils/vkUser';

const FIELD_TIPS: Record<string, string> = {
  experience: 'Опишите задачи и результаты: «увеличил конверсию на 15%» лучше, чем «занимался маркетингом».',
  education: 'Укажите вуз, специальность и год окончания. Можно добавить курсы VK Education.',
  skills: 'Перечислите 5–8 ключевых навыков через запятую.',
};

interface Props {
  id: string;
  resume: ResumeData;
  onBack: () => void;
  onChange: (resume: ResumeData) => void;
  onNext: () => void;
}

export const Form: FC<Props> = ({ id, resume, onBack, onChange, onNext }) => {
  const [tip, setTip] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    enrichResumeFromVk(resume).then((filled) => {
      onChange(filled);
      setLoading(false);
    });
  }, []);

  const update = (field: keyof ResumeData, value: string) => {
    onChange({ ...resume, [field]: value, updatedAt: Date.now() });
  };

  const showTip = (field: string) => {
    if (FIELD_TIPS[field]) setTip(FIELD_TIPS[field]);
  };

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={onBack} />}>Заполнение резюме</PanelHeader>

      <Group>
        <Banner
          mode="tint"
          title="Автозаполнение"
          subtitle={loading ? 'Загружаем данные из VK...' : 'Имя, фото и контакты подставлены из профиля VK'}
        />
      </Group>

      <Group header={<Header>Личные данные</Header>}>
        <Div style={{ display: 'flex', justifyContent: 'center' }}>
          {resume.photo ? <Avatar size={96} src={resume.photo} /> : <Avatar size={96} />}
        </Div>
        <FormItem top="Имя">
          <Input value={resume.firstName} onChange={(e) => update('firstName', e.target.value)} />
        </FormItem>
        <FormItem top="Фамилия">
          <Input value={resume.lastName} onChange={(e) => update('lastName', e.target.value)} />
        </FormItem>
        <FormItem top="Телефон">
          <Input type="tel" value={resume.phone} onChange={(e) => update('phone', e.target.value)} />
        </FormItem>
        <FormItem top="Email">
          <Input type="email" value={resume.email} onChange={(e) => update('email', e.target.value)} />
        </FormItem>
        <FormItem top="Город">
          <Input value={resume.city} onChange={(e) => update('city', e.target.value)} />
        </FormItem>
      </Group>

      <Group header={<Header>Опыт и образование</Header>}>
        <FormItem top="Образование" onClick={() => showTip('education')}>
          <Textarea value={resume.education} onChange={(e) => update('education', e.target.value)} />
        </FormItem>
        <FormItem top="Опыт работы" onClick={() => showTip('experience')}>
          <Textarea value={resume.experience} onChange={(e) => update('experience', e.target.value)} />
        </FormItem>
        <FormItem top="Навыки" onClick={() => showTip('skills')}>
          <Textarea value={resume.skills} onChange={(e) => update('skills', e.target.value)} />
        </FormItem>
        <FormItem top="О себе">
          <Textarea value={resume.about} onChange={(e) => update('about', e.target.value)} />
        </FormItem>
      </Group>

      <Group>
        <Div>
          <Button stretched size="l" onClick={onNext}>Предпросмотр</Button>
        </Div>
      </Group>

      {tip && (
        <Snackbar onClose={() => setTip(null)}>
          {tip} · Курсы VK Education: dev.vk.com/ru/mini-apps/learning/course
        </Snackbar>
      )}
    </Panel>
  );
};
