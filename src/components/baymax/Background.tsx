import {IMAGES} from '@assets/images';
import {BlurView} from '@react-native-community/blur';
import {height, width} from '@utils/Responsive';
import React from 'react';
import {Animated, Image, StyleSheet, View} from 'react-native';

const Background: React.FC<{blurOpacity: any}> = ({blurOpacity}) => {
  return (
    <View style={styles.imageContainer}>
      <Image source={IMAGES.baymax} style={styles.img} />
      <Animated.View style={[StyleSheet.absoluteFill, {opacity: blurOpacity}]}>
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="ultraThinMaterial"
          blurAmount={2}
        />
      </Animated.View>
    </View>
  );
};

export default Background;

const styles = StyleSheet.create({
  imageContainer: {
    width: width,
    height: height * 1.2,
    position: 'absolute',
    zIndex: -1,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    bottom: -height * 0.2,
  },
});
