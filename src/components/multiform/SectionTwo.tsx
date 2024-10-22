import CustomTextInput from '@components/ui/CustomTextInput';
import {gStyles} from '@styles/GlobalStyles';
import React from 'react';
import {TextInput, View} from 'react-native';

interface SectionTwoProps {
  formData: {email: string; phone: string};
  handleInputChange: (field: 'email' | 'phone', value: string) => void;
}

const SectionTwo = ({formData, handleInputChange}: SectionTwoProps) => {
  return (
    <View>
      <CustomTextInput
        label="Email"
        value={formData.email}
        onChangeText={value => handleInputChange('email', value)}
      />
      <CustomTextInput
        label="Phone"
        value={formData.phone}
        onChangeText={value => handleInputChange('phone', value)}
        keyboardType="phone-pad"
      />
    </View>
  );
};

export default SectionTwo;
