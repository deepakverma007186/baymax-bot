import CustomTextInput from '@components/ui/CustomTextInput';
import React from 'react';
import {View} from 'react-native';

interface SectionThreeProps {
  formData: {gender: string; age: number};
  handleInputChange: (field: 'gender' | 'age', value: string | number) => void;
}

const SectionThree = ({formData, handleInputChange}: SectionThreeProps) => {
  return (
    <View>
      <CustomTextInput
        label="Gender (male/female)"
        value={formData.gender}
        onChangeText={value => handleInputChange('gender', value)}
      />
      <CustomTextInput
        label="Age"
        value={formData.age.toString()}
        onChangeText={value => handleInputChange('age', parseInt(value))}
        keyboardType="number-pad"
      />
    </View>
  );
};

export default SectionThree;
