import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {ANIMATIONS} from '@assets/animations';

const Loader: React.FC = () => {
  return (
    <LottieView
      source={ANIMATIONS.syncing}
      style={{width: 280, height: 100}}
      autoPlay={true}
      loop={true}
    />
  );
};

export default Loader;

const styles = StyleSheet.create({});
