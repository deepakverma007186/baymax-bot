import {COLORS, RADIUS} from '@utils/Constants';
import {textScale} from '@utils/Responsive';
import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const OptionItems: React.FC<{
  item: any;
  onPress: (type: string) => void;
}> = ({item, onPress}) => {
  let iconName;
  let iconColor;

  switch (item) {
    case 'meditation':
      iconColor = '#2dec72';
      iconName = 'nature-people';
      break;
    case 'pedometer':
      iconColor = '#2d7ba4';
      iconName = 'directions-run';
      break;
    case 'health':
      iconColor = 'teal';
      iconName = 'health-and-safety';
      break;
    case 'happiness':
      iconColor = '#fb2622';
      iconName = 'emoji-emotions';
      break;
    default:
      iconColor = '#ffbc22';
      iconName = 'local-fire-department';
      break;
  }
  return (
    <Pressable onPress={() => onPress(item)} style={styles.container}>
      <Icon name={iconName} color={iconColor} size={textScale(32)} />
    </Pressable>
  );
};

export default OptionItems;

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
});
