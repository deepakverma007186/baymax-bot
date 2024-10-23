import Water from '@components/baymax/Water';
import OptionItems from '@components/options/OptionItems';
import {height, width} from '@utils/Responsive';
import {bigHero6Data} from '@utils/data';
import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';

const BigHero6: React.FC<{onPress: (type: string) => void}> = ({onPress}) => {
  const animatedValues = useRef(
    [...Array(6)].map(() => new Animated.Value(0)),
  ).current;

  useEffect(() => {
    Animated.stagger(
      100,
      animatedValues.map((animatedValue, index) =>
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          delay: index * 200,
          useNativeDriver: true,
        }),
      ),
    ).start();
  }, []);
  return (
    <View style={styles.circle}>
      {bigHero6Data?.map((item, i) => {
        const circumfrenceOfCircle = 2 * Math.PI * (i / 6);
        const x_position = width * 0.38 * Math.cos(circumfrenceOfCircle);
        const y_position = width * 0.38 * Math.sin(circumfrenceOfCircle);

        const translateX = animatedValues[i].interpolate({
          inputRange: [0, 1],
          outputRange: [0, x_position],
        });
        const translateY = animatedValues[i].interpolate({
          inputRange: [0, 1],
          outputRange: [0, y_position],
        });
        return (
          <Animated.View
            key={i.toString()}
            style={[
              styles.itemStyle,
              {
                transform: [{translateX}, {translateY}],
              },
            ]}>
            {item !== 'water' && <OptionItems onPress={onPress} item={item} />}
            {item === 'water' && <Water />}
          </Animated.View>
        );
      })}
    </View>
  );
};

export default BigHero6;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: width * 0.8,
    height: height * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    // backgroundColor: 'teal',
  },
  itemStyle: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 999,
  },
});
