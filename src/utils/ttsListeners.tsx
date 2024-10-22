import Tts from 'react-native-tts';

export const initializeTtsListeners = async () => {
  Tts.getInitStatus().then(
    () => {
      console.log('Audio speaker available ✅');
    },
    error => {
      if (error.code === 'no_engine') {
        console.log('No tts engine installing...🟡');
        Tts.requestInstallEngine();
      }
    },
  );

  //   const voices = await Tts.voices();
  //   console.log(voices);
  //   Tts.setDefaultVoice('com.apple.voice.compact.es-ES.Monica');
  Tts.setIgnoreSilentSwitch('ignore');
  Tts.addEventListener('tts-start', event => {
    console.log('TTS started: ', event);
  });
  Tts.addEventListener('tts-cancel', event => {
    console.log('TTS cancel: ', event);
  });
};

export const playTTS = async (message: string) => {
  Tts.getInitStatus().then(
    () => {
      console.log('Audio speaker available ✅');
    },
    error => {
      if (error.code === 'no_engine') {
        console.log('No tts engine installing...🟡');
        Tts.requestInstallEngine();
      }
    },
  );

  Tts.speak(message);
};
