import React, { useContext, useEffect, useReducer, useState } from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Header from "../Components/header";
import StockItemRow from '../Components/stockItemRow';
import { AppContext, AppProvider } from '../Store/stockItemContext';
import { Types } from '../Store/reducers'



function TestScreen({navigation}:any)
{
  const {state, dispatch} = useContext(AppContext)

  const handlePress = (name:string) =>{
    dispatch({
      type: Types.Add,
      payload: {
        stockCode: 'Jimmies',
        quantity: 4,
        id: 20,
      }
    })

    console.log("current stock items are")
    console.log(state.stockItems)
  }

  return (
    <AppProvider>
      <View>
        <Text>Stuff happening</Text>
        <Button title="+" onPress={() => {handlePress('jimmBoy')}} />
        <Button title="-" onPress={() => {handlePress('HenryHigglet')}} />
      </View>
    </AppProvider>
  )

}

export default TestScreen;