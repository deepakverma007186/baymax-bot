import Navigation from '@navigation/Navigation';
import {
  batteryOptimizationCheck,
  powerManagerCheck,
  requestPermission,
} from '@notifications/permissions';
import React, {useEffect} from 'react';
import {Platform, StatusBar, StyleSheet} from 'react-native';
import './src/notifications/listeners';
import {registerAllTriggers} from '@notifications/registerTriggers';
import {setCategories} from '@notifications/initials';

export default function App() {
  const permissionsCheck = async () => {
    requestPermission();
    registerAllTriggers();
    setCategories();
    if (Platform.OS === 'android') {
      batteryOptimizationCheck();
      powerManagerCheck();
    }
  };

  useEffect(() => {
    permissionsCheck();
  }, []);
  return (
    <>
      <StatusBar hidden />
      <Navigation />
    </>
  );
}

const styles = StyleSheet.create({});
