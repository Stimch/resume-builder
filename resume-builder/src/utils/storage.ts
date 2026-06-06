import bridge from '@vkontakte/vk-bridge';
import { ResumeData } from '../types/resume';

const STORAGE_KEY = 'resume_builder_list';
const POINTS_KEY = 'resume_builder_points';

async function vkStorageGet(key: string): Promise<string | null> {
  console.log('STORAGE GET START', key);

  try {
    if (!bridge.isWebView()) {
      console.log('LOCAL STORAGE MODE');

      const value = localStorage.getItem(key);

      console.log('LOCAL STORAGE RESULT', value);

      return value;
    }

    console.log('VK STORAGE REQUEST');

    const result = await bridge.send(
      'VKWebAppStorageGet',
      { keys: [key] }
    );

    console.log('VK STORAGE RESPONSE', result);

    const item = result.keys?.find(
      (k) => k.key === key
    );

    return item?.value ?? null;
  } catch (e) {
    console.error('STORAGE ERROR', e);

    return localStorage.getItem(key);
  }
}

async function vkStorageSet(
  key: string,
  value: string
): Promise<void> {
  console.log('STORAGE SET', key);

  try {
    if (!bridge.isWebView()) {
      localStorage.setItem(key, value);
      return;
    }

    await bridge.send(
      'VKWebAppStorageSet',
      { key, value }
    );
  } catch (e) {
    console.error('STORAGE SET ERROR', e);

    localStorage.setItem(key, value);
  }
}

export async function loadResumes(): Promise<ResumeData[]> {
  console.log('LOAD RESUMES FUNCTION');

  const raw = await vkStorageGet(STORAGE_KEY);

  console.log('RAW RESUMES', raw);

  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw) as ResumeData[];
  } catch (e) {
    console.error('JSON ERROR', e);
    return [];
  }
}

export async function saveResumes(
  resumes: ResumeData[]
): Promise<void> {
  await vkStorageSet(
    STORAGE_KEY,
    JSON.stringify(resumes)
  );
}

export async function loadPoints(): Promise<number> {
  console.log('LOAD POINTS FUNCTION');

  const raw = await vkStorageGet(POINTS_KEY);

  console.log('RAW POINTS', raw);

  return raw ? Number(raw) || 0 : 0;
}

export async function savePoints(
  points: number
): Promise<void> {
  await vkStorageSet(
    POINTS_KEY,
    String(points)
  );
}