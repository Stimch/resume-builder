import { useState, useEffect, ReactNode } from 'react';
import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import { View, SplitLayout, SplitCol, ScreenSpinner, Snackbar } from '@vkontakte/vkui';

import { Home } from './panels/Home';
import { TemplateSelect } from './panels/TemplateSelect';
import { Form } from './panels/Form';
import { Preview } from './panels/Preview';
import { Check } from './panels/Check';
import { MyResumes } from './panels/MyResumes';
import { emptyResume, ResumeData, TemplateId } from './types/resume';
import { loadPoints, loadResumes, savePoints, saveResumes } from './utils/storage';

export type PanelId = 'home' | 'template-select' | 'form' | 'preview' | 'check' | 'my-resumes';

export const App = () => {
  const [panel, setPanel] = useState<PanelId>('home');
  const [user, setUser] = useState<UserInfo | undefined>();
  const [resume, setResume] = useState<ResumeData>(emptyResume());
  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const [points, setPoints] = useState(0);
  const [popout, setPopout] = useState<ReactNode | null>(<ScreenSpinner />);
  const [snackbar, setSnackbar] = useState<string | null>(null);

useEffect(() => {
  async function init() {
    console.log("INIT START");

    try {
      console.log("LOAD RESUMES...");
      const savedResumes = await loadResumes();

      console.log("LOAD POINTS...");
      const savedPoints = await loadPoints();

      console.log("GET USER...");
      let vkUser = undefined;

      try {
        if (bridge.isWebView()) {
          vkUser = await Promise.race([
            bridge.send('VKWebAppGetUserInfo'),
            new Promise((resolve) =>
              setTimeout(() => resolve(undefined), 3000)
            ),
          ]);
        }
      } catch (e) {
        console.error(e);
      }
      //const vkUser = await bridge
      //  .send('VKWebAppGetUserInfo')
      //  .catch((e) => {
      //    console.error("USER ERROR", e);
      //    return undefined;
      //  });

      console.log("DATA LOADED");

      setResumes(savedResumes);
      setPoints(savedPoints);
      setUser(vkUser);
    } catch (e) {
      console.error("INIT ERROR", e);
    } finally {
      console.log("INIT END");
      setPopout(null);
    }
  }

  init();
}, []);

  const goHome = () => setPanel('home');

  const startNew = (templateId: TemplateId) => {
    setResume(emptyResume(templateId));
    setPanel('form');
  };

  const saveCurrent = async () => {
    const list = resumes.filter((r) => r.id !== resume.id);
    const updated = { ...resume, updatedAt: Date.now() };
    const next = [updated, ...list];
    setResumes(next);
    await saveResumes(next);
    const newPoints = points + 25;
    setPoints(newPoints);
    await savePoints(newPoints);
    setSnackbar('Резюме сохранено! +25 очков опыта');
    setPanel('my-resumes');
  };

  const openResume = (item: ResumeData) => {
    setResume(item);
    setPanel('preview');
  };

  return (
    <SplitLayout>
      <SplitCol>
        <View activePanel={panel}>
          <Home id="home" fetchedUser={user} points={points} onNavigate={setPanel} />
          <TemplateSelect
            id="template-select"
            onBack={goHome}
            onSelect={startNew}
          />
          <Form
            id="form"
            resume={resume}
            onBack={() => setPanel('template-select')}
            onChange={setResume}
            onNext={() => setPanel('preview')}
          />
          <Preview
            id="preview"
            resume={resume}
            onBack={() => setPanel('form')}
            onCheck={() => setPanel('check')}
            onSave={saveCurrent}
          />
          <Check id="check" resume={resume} onBack={() => setPanel('preview')} />
          <MyResumes
            id="my-resumes"
            resumes={resumes}
            onBack={goHome}
            onOpen={openResume}
          />
        </View>
      </SplitCol>
      {popout}
      {snackbar && <Snackbar onClose={() => setSnackbar(null)}>{snackbar}</Snackbar>}
    </SplitLayout>
  );
};
