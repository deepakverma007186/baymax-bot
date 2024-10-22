import React, {ReactNode, useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet, Animated} from 'react-native';

interface FlashButtonProps {
  onPress?: () => void;
  children: ReactNode;
  width?: number;
  height?: number;
}

const FlashButton = ({
  onPress,
  children,
  width = 200,
  height = 50,
}: FlashButtonProps) => {
  const animatedValue = new Animated.Value(0);

  const startAnimation = () => {
    animatedValue.setValue(0);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start(() => startAnimation());
  };

  useEffect(() => {
    startAnimation();
  }, []);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-width - height, width + height],
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, {width, height}]}>
      <View style={styles.buttonContent}>{children}</View>
      <Animated.View
        style={[
          styles.lightBeam,
          {
            transform: [{translateX}, {rotate: '-45deg'}],
          },
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#e7ab7b',
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContent: {
    zIndex: 1,
  },
  lightBeam: {
    position: 'absolute',
    width: 20,
    height: '300%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
});

export default FlashButton;
