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

  useEffect(() => {
    console.log("Something happened")
    console.log(state.stockItems)
  }, [state.stockItems]);

  const handlePress = (name:string) =>{
    dispatch({
      type: Types.Add,
      payload: {
        stockCode: name,
        quantity: 4,
        id: 20,
      }
    })
  }

  return (
      <View>
        <Text>Stuff happening</Text>
        <Button title="+" onPress={() => {handlePress('jimmBoy')}} />
        <Button title="-" onPress={() => {handlePress('HenryHigglet')}} />
      </View>
  )

}

export default TestScreen;