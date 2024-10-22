import {gStyles} from '@styles/GlobalStyles';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TextInputProps,
} from 'react-native';

interface CustomTextInputProps extends TextInputProps {
  label: string;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({label, ...props}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <TextInput
        style={gStyles.input}
        placeholder={label}
        placeholderTextColor={'#ccc'}
        {...props}
      />
    </KeyboardAvoidingView>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});
