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
  const [errorText, SetErrorText] = useState('')

  const [isEditing, SetIsEditing] = useState(false)
  const [stockItems, SetStockItems] = useState([
    {stockCode: 'bobla', quantity: 1, id: 0},
    {stockCode: 'joblin', quantity: 4, id: 1},
    {stockCode: 'henry', quantity: 7, id: 2},
    {stockCode: 'siddy', quantity: 1, id: 3},
    {stockCode: 'marley', quantity: 2, id: 4},
    {stockCode: 'nicky', quantity: 14, id: 5},
    {stockCode: 'bobby', quantity: 1, id: 6},
    {stockCode: 'jobby', quantity: 4, id: 7},
    {stockCode: 'henry', quantity: 7, id: 8},
    {stockCode: 'siden', quantity: 1, id: 9},
    {stockCode: 'marley', quantity: 2, id: 10},
    {stockCode: 'nicky', quantity: 14, id: 11},
    {stockCode: 'bobbette', quantity: 1, id: 12},
    {stockCode: 'jobette', quantity: 4, id: 13},
    {stockCode: 'henry', quantity: 7, id: 14},
    {stockCode: 'sidney', quantity: 1, id: 15},
    {stockCode: 'marley', quantity: 2, id: 16},
    {stockCode: 'nicky', quantity: 14, id: 17},
  ])
  // const [stockItems, SetStockItems] = useState([
  //   {stockCode: 'bob', quantity: 1, id: 0},
  // ])

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
    if(isValidInput(newStockCode))
    {
      let index = stockItems.findIndex(stockItems => stockItems.stockCode === newStockCode)
      if(index == -1){ // Item NOT in the stockItems
        SetStockItems([...stockItems, {stockCode: newStockCode, quantity: 1, id: (Math.max(...stockItems.map((item) => item.id))+1)}])
        SetInputText('')
      }
      else{ // Add 1 to the existing stockItems quantity
        const newArray = stockItems.map((item) => {
          if (item.stockCode === newStockCode) {
            return { ...item, stockCode: item.stockCode, quantity: (item.quantity+1), id: item.id };
          }
          return item;
        });
        SetStockItems(newArray);
      }
    }
  }

  const updateItem = (id:number, newQuantity:number) => {
    console.log("Updated an item")
    let index = stockItems.findIndex(stockItems => stockItems.id === id)
    let newArray = [...stockItems];
    newArray[index].quantity = newQuantity;
    SetStockItems(newArray);
  }

  // const getItemQuantity = (id:string):string => {
  //   let index = stockItems.findIndex(stockItems => stockItems.id === id)
  //   return stockItems[index].quantity.toString()
  // }

  const deleteStockItem = (id:number) => {
    // Will need a modal to check if user is sure they want to delete an item
    console.log("Deleting a stock item")
    SetStockItems((prevStockItems) => {
      return prevStockItems.filter(stockItem => stockItem.id != id)
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
            keyExtractor={(item)=> item.id.toString()}
            data={stockItems}
            removeClippedSubviews={false}
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
