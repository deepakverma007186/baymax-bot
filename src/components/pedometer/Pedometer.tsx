import {IMAGES} from '@assets/images';
import CustomText from '@components/ui/CustomText';
import StepCounter, {
  parseStepData,
  startStepCounterUpdate,
  stopStepCounterUpdate,
} from '@dongminyu/react-native-step-counter';
import {usePedometerStore} from '@state/pedometerStore';
import {FONTS} from '@utils/Constants';
import {textScale} from '@utils/Responsive';
import {playTTS} from '@utils/ttsListeners';
import React, {useEffect} from 'react';
import {Alert, Image, Pressable, StyleSheet, View} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import Icon from 'react-native-vector-icons/Ionicons';

interface PedometerProps {
  onCross?: () => void;
  message?: string;
}

const Pedometer: React.FC<PedometerProps> = ({onCross}) => {
  const {stepCount, dailyGoal, addSteps} = usePedometerStore();

  StepCounter.addListener('StepCounter.stepsSensorInfo');

  const startStepCounter = () => {
    startStepCounterUpdate(new Date(), data => {
      const parsedData = parseStepData(data);
      addSteps(parsedData.steps, parsedData.distance);
    });
  };
  const stopStepCounter = () => {
    stopStepCounterUpdate();
  };

  useEffect(() => {
    if (stepCount >= dailyGoal) {
      playTTS(
        "You've met your daily goal. No need to start the counter again today.",
      );
    } else {
      startStepCounter();
    }

    return () => stopStepCounter();
  }, []);

  const handleOnCross = () => {
    Alert.alert('Your step counter stopped!');
    stopStepCounter();
    onCross();
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.cross} onPress={handleOnCross}>
        <Icon name="close-circle" color={'red'} size={textScale(20)} />
      </Pressable>
      <View>
        <Image source={IMAGES.logo_short} style={styles.logo} />
      </View>
      <View style={styles.indicator}>
        <CircularProgress
          value={stepCount}
          maxValue={dailyGoal}
          valueSuffix={` | ${dailyGoal}`}
          progressValueFontSize={textScale(22)}
          radius={120}
          activeStrokeColor="#cdd27e"
          activeStrokeWidth={20}
          inActiveStrokeColor="#4c6394"
          inActiveStrokeOpacity={0.5}
          inActiveStrokeWidth={20}
          title="Steps"
          titleColor="#555"
          titleFontSize={textScale(22)}
          titleStyle={{fontFamily: FONTS.SemiBold}}
        />
        <CustomText
          fontSize={textScale(8)}
          fontFamily={FONTS.SemiBold}
          style={styles.text}>
          Start Walking, we'll take care of your step count.
        </CustomText>
      </View>
    </View>
  );
};

export default Pedometer;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    width: '90%',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowColor: '#000',
    elevation: 10,
    borderRadius: 10,
  },
  logo: {
    width: 50,
    height: 40,
    alignSelf: 'center',
    marginVertical: 10,
  },
  cross: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  markdownStyle: {
    fontFamily: FONTS.Theme,
    padding: 20,
    fontSize: textScale(22),
    color: '#000000',
  },
  indicator: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text: {
    marginTop: 20,
    textAlign: 'center',
  },
});
