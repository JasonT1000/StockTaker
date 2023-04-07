/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

function App(){
  const [name, SetName] = useState('hoggle')
  const [age, SetAge] = useState('30')

  const clickHandler = () => {
    
  }

  return (
    <View>
      <Text>name:, age</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  barcodeData:{
    padding: 20,
    fontSize: 20,
    margin: 10
  },
  cameraContainer: {
    backgroundColor: 'blue',
    flex: 1,
    width: '50%',
    height: '100%'
  },
  cameraWindow:{
    backgroundColor: 'red',
    // width: '50%',
    // height: 25,
    marginLeft: 60
  },
  marker:{
    width: 100,
    height: 100
  },
  topView: {
    flex: 0.5,
    backgroundColor: 'yellow',
  },
  bottomView: {
    flex: 0.5,
    backgroundColor: 'green',
  },
})

export default App;
