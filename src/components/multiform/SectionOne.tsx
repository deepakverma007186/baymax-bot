import CustomTextInput from '@components/ui/CustomTextInput';
import React from 'react';
import {View} from 'react-native';

interface SectionOneProps {
  formData: {firstName: string; lastName: string};
  handleInputChange: (field: 'firstName' | 'lastName', value: string) => void;
}

const SectionOne = ({formData, handleInputChange}: SectionOneProps) => {
  return (
    <View>
      <CustomTextInput
        label="First Name"
        value={formData.firstName}
        onChangeText={value => handleInputChange('firstName', value)}
      />
      <CustomTextInput
        label="Last Name"
        value={formData.lastName}
        onChangeText={value => handleInputChange('lastName', value)}
      />
      <CustomTextInput
        label="First Name"
        value={formData.firstName}
        onChangeText={value => handleInputChange('firstName', value)}
      />
      <CustomTextInput
        label="Last Name"
        value={formData.lastName}
        onChangeText={value => handleInputChange('lastName', value)}
      />
    </View>
  );
};

export default SectionOne;
