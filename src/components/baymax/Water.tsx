import {useWaterStore} from '@state/waterStore';
import {COLORS, RADIUS} from '@utils/Constants';
import {textScale} from '@utils/Responsive';
import {playTTS} from '@utils/ttsListeners';
import {playSound} from '@utils/voiceUtils';
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {};

const NUMBER_OF_WATER_INTAKE_DAILY = 8;

const Water = (props: Props) => {
  const {waterDrinkStamps, addWaterIntake} = useWaterStore();
  const totalSegments = NUMBER_OF_WATER_INTAKE_DAILY;
  const completedSegments = waterDrinkStamps.length;

  const containerStyle = [
    styles.container,
    completedSegments === totalSegments && styles.containerCompleted,
  ];

  const segmentStyle = ({index}: {index: number}) => {
    return [
      styles.segment,
      {
        backgroundColor:
          completedSegments === totalSegments
            ? '#00D100'
            : index < completedSegments
            ? '#1ca3ec'
            : '#eeeeee',
        transform: [
          {rotate: `${(index * 360) / totalSegments}deg`},
          {translateX: RADIUS / 2 - 5},
        ],
      },
    ];
  };

  const handlePress = () => {
    if (completedSegments < totalSegments) {
      const timestamp = new Date().toISOString();
      addWaterIntake(timestamp);
      playSound('tingOne');
      setTimeout(() => {
        playTTS('Good Work! Stay Hydrated');
      }, 1000);
    } else {
      playTTS('You have completed your daily water intake!');
    }
  };
  return (
    <Pressable style={containerStyle} onPress={handlePress}>
      <Icon name="water" color={'#1ca3ec'} size={textScale(32)} />
      <View style={styles.segmentContainer}>
        {Array.from({length: totalSegments}).map((_, index) => (
          <View key={index.toString()} style={segmentStyle({index})} />
        ))}
      </View>
    </Pressable>
  );
};

export default Water;

const styles = StyleSheet.create({
  container: {
    width: RADIUS,
    aspectRatio: 1,
    borderRadius: RADIUS,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  containerCompleted: {
    shadowColor: 'yellow',
    elevation: 5,
  },
  segmentContainer: {
    position: 'absolute',
    width: RADIUS,
    aspectRatio: 1,
    borderRadius: RADIUS / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  segment: {
    position: 'absolute',
    width: 8,
    height: 4,
    borderRadius: 2,
  },
});
