import refineSoundUrl from '../assets/refine.mp3';
import refineSuccessSoundUrl from '../assets/refine-success.mp3';
import refineFailureSoundUrl from '../assets/refine-failure.mp3';
import bgmUrl from '../assets/bgm.mp3';
import achievementSoundUrl from '../assets/achievement.mp3';

const DEFAULT_BGM_VOLUME = 0.04;
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

export const achievementSound = () => {
  const sound = new Audio(achievementSoundUrl);
  sound.volume = ACHIEVEMENT_SOUND_VOLUME;
  return sound;
};

export const bgm = new Audio(bgmUrl);
bgm.volume = DEFAULT_BGM_VOLUME;
bgm.loop = true;

export const HOST =
  process.env.NODE_ENV === 'production'
    ? process.env.HOST
    : process.env.DEVHOST;
