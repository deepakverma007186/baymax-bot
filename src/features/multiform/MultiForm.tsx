import {IMAGES} from '@assets/images';
import SectionOne from '@components/multiform/SectionOne';
import SectionThree from '@components/multiform/SectionThree';
import SectionTwo from '@components/multiform/SectionTwo';
import CustomButton from '@components/ui/CustomButton';
import React, {useState} from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export interface FormDataProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: 'male' | 'female';
  age: number;
}

const MultiForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormDataProps>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: 'male',
    age: 0,
  });

  const handleInputChange = (
    field: keyof FormDataProps,
    value: string | number,
  ) => {
    setFormData({...formData, [field]: value});
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const submitForm = () => {
    Alert.alert('Form Data', JSON.stringify(formData, null, 2));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={60}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        scrollToOverflowEnabled={true}>
        <Text style={styles.title}>Multi-Step Form</Text>
        <Image
          source={IMAGES.baymax}
          resizeMode="contain"
          style={{height: 300, width: 200, alignSelf: 'center'}}
        />
        {step === 1 && (
          <SectionOne
            formData={formData}
            handleInputChange={handleInputChange}
          />
        )}
        {step === 2 && (
          <SectionTwo
            formData={formData}
            handleInputChange={handleInputChange}
          />
        )}
        {step === 3 && (
          <SectionThree
            formData={formData}
            handleInputChange={handleInputChange}
          />
        )}
        <View style={styles.buttonContainer}>
          {step > 1 && <CustomButton title="Previous" onPress={prevStep} />}
          {step < 3 ? (
            <CustomButton title="Next" onPress={nextStep} />
          ) : (
            <CustomButton title="Submit" onPress={submitForm} />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default MultiForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'teal',
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#ffffff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 20,
  },
});
