import {Pressable, PressableProps, StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface CustomButtonProps extends PressableProps {
  title: string;
  onPress: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  ...props
}) => {
  return (
    <Pressable style={styles.container} onPress={onPress} {...props}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    color: '#fff',
  },
});
