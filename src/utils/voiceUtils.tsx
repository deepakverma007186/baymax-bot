import {SOUNDS} from '@assets/sfx';
import SoundPlayer from 'react-native-sound-player';

const getSoundPath = (soundName: string) => {
  switch (soundName) {
    case 'laugh':
      return SOUNDS.laugh;
    case 'meditation':
      return SOUNDS.meditation;
    case 'motivation':
      return SOUNDS.motivation;
    case 'notification':
      return SOUNDS.notification;
    case 'tingOne':
      return SOUNDS.tingOne;
    case 'tingTwo':
      return SOUNDS.tingTwo;
    default:
      throw new Error(`Sound ${soundName} not found.`);
  }
};

export const playSound = (soundName: string) => {
  try {
    const soundPath = getSoundPath(soundName);
    SoundPlayer.playAsset(soundPath);
  } catch (error) {
    console.log('Error while playing sound => ', error);
  }
};
