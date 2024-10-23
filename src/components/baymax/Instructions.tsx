import {ANIMATIONS} from '@assets/animations';
import {IMAGES} from '@assets/images';
import {FONTS} from '@utils/Constants';
import {textScale} from '@utils/Responsive';
import LottieView from 'lottie-react-native';
import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import Markdown from 'react-native-markdown-display';
import Icon from 'react-native-vector-icons/Ionicons';

interface InstructionsProps {
  message?: string;
  onCross?: () => void;
}

const Instructions: React.FC<InstructionsProps> = ({message, onCross}) => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.cross} onPress={onCross}>
        <Icon name="close-circle" color={'red'} size={textScale(20)} />
      </Pressable>
      <View>
        <Image source={IMAGES.logo_short} style={styles.logo} />
      </View>
      <View>
        {message === 'meditation' ? (
          <LottieView
            source={ANIMATIONS.breath}
            style={{width: 400, aspectRatio: 1 / 1, alignSelf: 'center'}}
            autoPlay
            loop
          />
        ) : (
          <Markdown style={{body: styles.markdownStyle}}>{message}</Markdown>
        )}
      </View>
    </View>
  );
};

export default Instructions;

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
});
