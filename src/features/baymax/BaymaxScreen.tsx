import {Animated, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {COLORS} from '@utils/Constants';
import Background from '@components/baymax/Background';
import BigHero6 from './BigHero6';
import Loader from '@components/baymax/Loader';
import {playTTS} from '@utils/ttsListeners';
import {playSound} from '@utils/voiceUtils';
import {prompt} from '@utils/data';
import SoundPlayer from 'react-native-sound-player';

type Props = {};

const BaymaxScreen: React.FC = (props: Props) => {
  const [showInstructions, setShowInstructions] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [showPedometer, setShowPedometer] = useState(false);
  const [message, setMessage] = useState('');

  const blurOpacity = useRef(new Animated.Value(0)).current;
  const startBlur = () => {
    Animated.timing(blurOpacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };
  const stopBlur = () => {
    Animated.timing(blurOpacity, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  const handleErrorOccured = (err: any) => {
    playTTS('There was an error! please try again');
    startBlur();
    setMessage('');
    setShowLoader(true);
    setShowInstructions(false);
    SoundPlayer.stop();
    console.log(err, '===❌handle tabs');
  };

  const handleTabs = async (
    type: string,
    promptText: string,
    sound: string,
  ) => {
    try {
      setShowLoader(true);
      if (type === 'meditation') {
        playTTS('Focus on your breath!');
        playSound(sound);
        setMessage('meditation');
      }
    } catch (error) {
      handleErrorOccured(error);
    } finally {
      setShowLoader(false);
    }
  };
  // BigHero6 onPress handler
  const onOptionPressHandler = (type: string) => {
    setShowInstructions(true);
    if (type === 'pedometer') {
      setShowPedometer(true);
      setShowLoader(false);
      return;
    }

    switch (type) {
      case 'happiness':
        handleTabs(type, prompt.joke, 'laugh');
        break;
      case 'motivation':
        handleTabs(type, prompt.motivation, 'motivation');
        break;
      case 'health':
        handleTabs(type, prompt.health, 'meditation');
        break;
      case 'meditation':
        handleTabs(type, prompt.health, 'meditation');
        break;
      default:
        handleErrorOccured('There is no option like that...');
    }
  };

  useEffect(() => {
    const blurTimer = setTimeout(startBlur, 500);
    return () => clearTimeout(blurTimer);
  }, []);

  return (
    <View style={styles.container}>
      <Background blurOpacity={blurOpacity} />
      {showLoader && (
        <View style={[StyleSheet.absoluteFill, styles.loaderContainer]}>
          <Loader />
        </View>
      )}

      {!showInstructions && <BigHero6 onPress={() => {}} />}
    </View>
  );
};

export default BaymaxScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondry,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});