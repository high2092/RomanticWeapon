import refineSoundUrl from '../assets/refine.mp3';
import refineSuccessSoundUrl from '../assets/refine-success.mp3';
import refineFailureSoundUrl from '../assets/refine-failure.mp3';
import bgmUrl from '../assets/bgm.mp3';
import achievementSoundUrl from '../assets/achievement.mp3';
import shopBgmUrl from '../assets/shop.mp3';
import mob00HitSoundUrl from '../assets/mob00hit.mp3';
import mob00DieSoundUrl from '../assets/mob00die.mp3';

const MAIN_BGM_VOLUME = 0.04;
const SHOP_BGM_VOLUME = 0.1;
const REFINE_VOLUME = 0.04;
const REFINE_SUCCESS_VOLUME = 0.1;
const REFINE_FAILURE_VOLUME = 0.1;
const ACHIEVEMENT_SOUND_VOLUME = 0.1;

export const refineSound = new Audio(refineSoundUrl);
refineSound.volume = REFINE_VOLUME;

export const refineSuccessSound = new Audio(refineSuccessSoundUrl);
refineSuccessSound.volume = REFINE_SUCCESS_VOLUME;

export const refineFailureSound = new Audio(refineFailureSoundUrl);
refineFailureSound.volume = REFINE_FAILURE_VOLUME;

export const mob00HitSound = () => {
  const sound = new Audio(mob00HitSoundUrl);
  return sound;
};

export const mob00DieSound = () => {
  const sound = new Audio(mob00DieSoundUrl);
  return sound;
};

export const achievementSound = () => {
  const sound = new Audio(achievementSoundUrl);
  sound.volume = ACHIEVEMENT_SOUND_VOLUME;
  return sound;
};

export const mainBgm = () => {
  const bgm = new Audio(bgmUrl);
  bgm.volume = MAIN_BGM_VOLUME;
  bgm.loop = true;
  return bgm;
};

export const HOST =
  process.env.NODE_ENV === 'production'
    ? process.env.HOST
    : process.env.DEVHOST;

export const shopBgm = () => {
  const bgm = new Audio(shopBgmUrl);
  bgm.volume = SHOP_BGM_VOLUME;
  bgm.loop = true;
  return bgm;
};
