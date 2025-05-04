import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraScreen from '../screens/CameraScreen';
import ResultScreen from '../screens/ResultScreen';

const Stack = createNativeStackNavigator();

export default function ScanStack() {
  return (
    <Stack.Navigator initialRouteName="Scan your face">
      <Stack.Screen name="Scan your face" component={CameraScreen} />
      <Stack.Screen name="Skin Report" component={ResultScreen} />
    </Stack.Navigator>
  );
}