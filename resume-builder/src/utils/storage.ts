import bridge from '@vkontakte/vk-bridge';
import { ResumeData } from '../types/resume';

const STORAGE_KEY = 'resume_builder_list';
const POINTS_KEY = 'resume_builder_points';

async function vkStorageGet(key: string): Promise<string | null> {
  try {
    const result = await bridge.send('VKWebAppStorageGet', { keys: [key] });
    const item = result.keys?.find((k) => k.key === key);
    return item?.value ?? null;
  } catch {
    return localStorage.getItem(key);
  }
}

async function vkStorageSet(key: string, value: string): Promise<void> {
  try {
    await bridge.send('VKWebAppStorageSet', { key, value });
  } catch {
    localStorage.setItem(key, value);
  }
}

export async function loadResumes(): Promise<ResumeData[]> {
  const raw = await vkStorageGet(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as ResumeData[];
  } catch {
    return [];
  }
}

export async function saveResumes(resumes: ResumeData[]): Promise<void> {
  await vkStorageSet(STORAGE_KEY, JSON.stringify(resumes));
}

export async function loadPoints(): Promise<number> {
  const raw = await vkStorageGet(POINTS_KEY);
  return raw ? Number(raw) || 0 : 0;
}

export async function savePoints(points: number): Promise<void> {
  await vkStorageSet(POINTS_KEY, String(points));
}
