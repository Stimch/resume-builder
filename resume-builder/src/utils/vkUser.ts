import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import { ResumeData } from '../types/resume';

export async function fetchVkUser(): Promise<UserInfo | undefined> {
  try {
    return await bridge.send('VKWebAppGetUserInfo');
  } catch {
    return undefined;
  }
}

export async function enrichResumeFromVk(resume: ResumeData): Promise<ResumeData> {
  const user = await fetchVkUser();
  let phone = resume.phone;
  let email = resume.email;

  try {
    const phoneData = await bridge.send('VKWebAppGetPhoneNumber');
    if (phoneData.phone_number) phone = phoneData.phone_number;
  } catch {
    /* optional permission */
  }

  try {
    const emailData = await bridge.send('VKWebAppGetEmail');
    if (emailData.email) email = emailData.email;
  } catch {
    /* optional permission */
  }

  if (!user) return { ...resume, phone, email };

  return {
    ...resume,
    firstName: resume.firstName || user.first_name,
    lastName: resume.lastName || user.last_name,
    photo: resume.photo || user.photo_200 || user.photo_max_orig || '',
    phone,
    email,
    city: resume.city || user.city?.title || '',
  };
}
