/**
 * React Native app to help with stock take
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import App from './Screens/App';
import BarcodeScanner from './Screens/BarcodeScanner';
import TestScreen from './Screens/TestScreen';

const Stack = createNativeStackNavigator()

function BaseApp(){
  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name='Home' component={App}
        />
        <Stack.Screen
          name='BarcodeScanner' component={BarcodeScanner}
        />
        <Stack.Screen
          name='TestScreen' component={TestScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
})

export default BaseApp;
