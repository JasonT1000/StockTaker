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
import { AppProvider } from './Store/stockItemContext';
import { AppProvider2 } from './Store/settingsContext';
// import DataUpload from './Screens/DataUpload';

const Stack = createNativeStackNavigator()

function BaseApp(){
  return(
    <NavigationContainer>
      <AppProvider>
        <AppProvider2>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen
              name='Home' component={App}
            />
            <Stack.Screen
              name='BarcodeScanner' component={BarcodeScanner}
            />
            {/* <Stack.Screen
              name='DataUpload' component={DataUpload}
            /> */}
          </Stack.Navigator>
        </AppProvider2>
      </AppProvider>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
})

export default BaseApp;
