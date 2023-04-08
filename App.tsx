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
import Header from "./Components/header";
import StockItemRow from './Components/stockItemRow';
import { StockItem } from './types';


function App(){
  const [inputText, SetInputText] = useState('')
  const [errorText, SetErrorText] = useState('');

  const [isEditing, SetIsEditing] = useState(false)
  const [stockItems, SetStockItems] = useState([
    {stockCode: 'bob', quantity: 1, key: '1'},
    {stockCode: 'job', quantity: 4, key: '2'},
    {stockCode: 'henry', quantity: 7, key: '3'},
    {stockCode: 'skey', quantity: 1, key: '4'},
    {stockCode: 'marley', quantity: 2, key: '5'},
    {stockCode: 'nicky', quantity: 14, key: '6'},
    {stockCode: 'bob', quantity: 1, key: '7'},
    {stockCode: 'job', quantity: 4, key: '8'},
    {stockCode: 'henry', quantity: 7, key: '9'},
    {stockCode: 'skey', quantity: 1, key: '10'},
    {stockCode: 'marley', quantity: 2, key: '11'},
    {stockCode: 'nicky', quantity: 14, key: '12'},
    {stockCode: 'bob', quantity: 1, key: '13'},
    {stockCode: 'job', quantity: 4, key: '14'},
    {stockCode: 'henry', quantity: 7, key: '15'},
    {stockCode: 'skey', quantity: 1, key: '16'},
    {stockCode: 'marley', quantity: 2, key: '17'},
    {stockCode: 'nicky', quantity: 14, key: '18'},
  ])

  const ErrorMessage = Object.freeze({
    Short: 'That stockcode is not long enough',
    Illegal: 'Illegal stockcode detected'
});

  const toggleEditing = (canEdit:boolean) =>{
    SetIsEditing(canEdit)
  }

  const handleStockInputComponentSubmitEvent = (event:any) =>{
    addStockItem(event.nativeEvent.text)
  }

  const isValidInput = (string:string) => {
    const regex = /^[^!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?\s]*[\w/+]{4,}[^!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?\s_]*$/;

    if(regex.test(string)){
      SetErrorText('')
      return true;
    }

    handleErrorText(string)

    return false;
  }

  const handleErrorText = (string:string) => {
    const regex = /^.{0,3}$/;
    SetErrorText(ErrorMessage.Illegal)

    if(regex.test(string)){
      SetErrorText(ErrorMessage.Short)
    }
  }

  const addStockItem = (newStockCode:string) => {
    if(isValidInput(newStockCode)){
      SetStockItems([...stockItems, {stockCode: newStockCode, quantity: 1, key: (stockItems.length+1).toString()}])
      SetInputText('')
    }
    
    // SetStockItems((prevStockItems) => {
    //   return [{stockCode: newStockCode, quantity: 1, key: (prevStockItems.length+1).toString()}, ...prevStockItems]
    // })
  }

  const updateItem = (key:string, newQuantity:number) => {
    console.log("Updated an item")
    let index = stockItems.findIndex(stockItems => stockItems.key === key)
    let newArray = [...stockItems];
    newArray[index].quantity = newQuantity;
    SetStockItems(newArray);
  }

  const getItemQuantity = (key:string):string => {
    let index = stockItems.findIndex(stockItems => stockItems.key === key)
    return stockItems[index].quantity.toString()
  }

  const deleteStockItem = (key:string) => {
    // Will need a modal to check if user is sure they want to delete an item
    console.log("Deleting a stock item")
    SetStockItems((prevStockItems) => {
      return prevStockItems.filter(stockItem => stockItem.key != key)
    })
  }


  return (
    <View style={styles.mainContainer}>
      <Header toggleEditing={toggleEditing}/>
      <Text>StockTake</Text>
      <TextInput 
        style={styles.stockCodeInput}
        placeholder='Stockcode here'
        value={inputText}
        onChangeText={SetInputText}
        onSubmitEditing={(submitEvent) => handleStockInputComponentSubmitEvent(submitEvent)} />
        {errorText ? <Text style={{ color: 'red' }}>{errorText}</Text> : null}
      <View style={styles.mainContentContainer}>
        <View style = {styles.listRow}>
          <Text style={styles.rowHeading}>ItemCode</Text>
          <Text style={styles.rowHeading}>Quantity</Text>
          {isEditing && <Text style={styles.rowHeading}></Text>}
        </View>
        <View style={styles.listContainer}>
          <FlatList
            // keyExtractor={(item)=> item.key}
            data={stockItems}
            renderItem={({ item }) => (
              <StockItemRow item={item} isEditing={isEditing} updateItem={updateItem} deleteStockItem={deleteStockItem}/>
            )}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

  mainContainer:{
    flex: 1,
  },
  mainContentContainer:{
    flex: 1,
    paddingHorizontal: 10,
  },
  stockCodeInput:{
    flex: 0,
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 10,
    // width: 200,
  },
  listRow:{
    flexDirection: 'row',
    flex: 0,
  },
  rowHeading:{
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    height: 40,
    fontSize: 21,
  },
  listContainer:{
    flex: 1,
  },
})

export default App;
