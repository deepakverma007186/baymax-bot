import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Image} from 'react-native';
import {textScale} from '@utils/Responsive';
import {IMAGES} from '@assets/images';
import {FONTS} from '@utils/Constants';

interface PedometerProps {
  onCross?: () => void;
  message?: string;
}

const Pedometer: React.FC<PedometerProps> = ({onCross}) => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.cross} onPress={onCross}>
        <Icon name="close-circle" color={'red'} size={textScale(20)} />
      </Pressable>
      <View>
        <Image source={IMAGES.logo_short} style={styles.logo} />
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
});
