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
  TextInput,
  View,
} from 'react-native';
import Header from "./Components/header";
import StockItemList from './StockItemList';



function App(){
  const [data, Setdata] = useState('scan something')

  return (
    <View>
      <Header/>
      <Text>StockTake</Text>
      <TextInput 
        style={styles.input}
        placeholder='Stockcode here'
        onChangeText={(value) => Setdata(value)} />
      <StockItemList/>
    </View>
  )
}

const styles = StyleSheet.create({
  input:{
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 10,
    // width: 200,
  }
})

export default App;
