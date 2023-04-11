import React, { useReducer, useState } from 'react';
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
import { StockItemProvider, useStockItemsDispatch } from '../Store/stockItemContext';



function TestScreen({navigation}:any)
{
  const dispatch = useStockItemsDispatch() as any

  const handlePress = (name:string) =>{
    dispatch({
      type:'added',
      stockCode: name,
    })
  }

  return (
    <StockItemProvider>
      <View>
        <Text>Stuff happening</Text>
        <Button title="+" onPress={() => {handlePress('jimmBoy')}} />
        <Button title="-" onPress={() => {handlePress('HenryHigglet')}} />
      </View>
    </StockItemProvider>
  )

}

export default TestScreen;