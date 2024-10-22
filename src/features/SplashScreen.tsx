import {ANIMATIONS} from '@assets/animations';
import {IMAGES} from '@assets/images';
import CustomText from '@components/ui/CustomText';
import {COLORS, FONTS, LIGTHCOLORS} from '@utils/Constants';
import {resetAndNavigate} from '@utils/NavigationUtils';
import {height, width} from '@utils/Responsive';
import {initializeTtsListeners, playTTS} from '@utils/ttsListeners';
import {playSound} from '@utils/voiceUtils';
import LottieView from 'lottie-react-native';
import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const BOTTOM_GRADIENT_COLORS = [...LIGTHCOLORS].reverse();

const SplashScreen: React.FC = () => {
  const baymaxAnimation = useSharedValue(height * 0.8);
  const messageContainerAnimation = useSharedValue(height * 0.8);

  const animateImageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(baymaxAnimation.value, {
            duration: 1500,
          }),
        },
      ],
    };
  });
  const messageContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(messageContainerAnimation.value, {
            duration: 1200,
          }),
        },
      ],
    };
  });

  const launchAnimation = async () => {
    messageContainerAnimation.value = height * 0.001;
    playSound('tingTwo');
    setTimeout(() => {
      baymaxAnimation.value = -height * 0.008;
      playTTS('Hello World! I am Baymax.');
    }, 600);
    setTimeout(() => {
      resetAndNavigate('BaymaxScreen');
    }, 4000);
  };

  useEffect(() => {
    initializeTtsListeners();
    launchAnimation();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.imgContainer, animateImageStyle]}>
        <Image source={IMAGES.launch} style={styles.img} />
      </Animated.View>
      <Animated.View style={[styles.gradientContainer, messageContainerStyle]}>
        <LinearGradient colors={BOTTOM_GRADIENT_COLORS} style={styles.gradient}>
          <View style={styles.textContainer}>
            <CustomText fontFamily={FONTS.Theme} fontSize={34}>
              BAYMAX!
            </CustomText>
            <LottieView
              source={ANIMATIONS.sync}
              style={{width: 280, height: 100}}
              autoPlay={true}
              loop={true}
            />
            <CustomText fontFamily={FONTS.Medium} variant="h3">
              Bringing happiness on your face!
            </CustomText>
          </View>
        </LinearGradient>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  imgContainer: {
    width: width - 20,
    height: height * 0.5,
    marginTop: -40,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  gradientContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '36%',
    // backgroundColor: 'teal',
  },
  gradient: {
    width: '100%',
    height: '100%',
    paddingTop: 30,
  },
});
