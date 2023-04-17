/**
 * React Native app to help with stock take
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useContext, useState } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util'
import * as ScopedStorage from "react-native-scoped-storage"
import Header from "../Components/header";
import StockItemRow from '../Components/stockItemRow';
import { AppContext } from '../Store/stockItemContext';
import { Types } from '../Store/reducers';


function App({navigation}:any){
  const [inputText, SetInputText] = useState('')
  const [errorText, SetErrorText] = useState('')

  const [isEditing, SetIsEditing] = useState(false)
  const [storeageUri, SetStorageUri] = useState('')

  const {state, dispatch} = useContext(AppContext)

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
      dispatch({
        type: Types.Add,
        payload: {
          stockCode: newStockCode,
          quantity: 44,
          id: 44,
        }
      })
      SetInputText('')
      // let index = stockItems.findIndex(stockItems => stockItems.stockCode === newStockCode)
      // if(index == -1){ // Item NOT in the stockItems
      //   SetStockItems([...stockItems, {stockCode: newStockCode, quantity: 1, id: (Math.max(...stockItems.map((item) => item.id))+1)}])
      //   SetInputText('')
      // }
      // else{ // Add 1 to the existing stockItems quantity
      //   const newArray = stockItems.map((item) => {
      //     if (item.stockCode === newStockCode) {
      //       return { ...item, stockCode: item.stockCode, quantity: (item.quantity+1), id: item.id };
      //     }
      //     return item;
      //   });
      //   SetStockItems(newArray);
      // }
    }
  }

  const updateItem = (id:number, newQuantity:number) => {
    dispatch({
      type: Types.Update,
      payload: {
        quantity: newQuantity,
        id: id,
      }
    })
  }

  const deleteStockItem = (id:number) => {
    // Will need a modal to check if user is sure they want to delete an item
    console.log("Deleting a stock item")
    dispatch({
      type: Types.Delete,
      payload: { id: id }
    })
  }

  const openBarcodeScanner = () =>{
    console.log("Loading barcode scanner 2")
    navigation.navigate('BarcodeScanner')
  }

  const saveCSV = async () => {
    // construct csvString
    const headerString = 'stockcode,qty\n';
    const rowString = state.stockItems.map(stockItem => `${stockItem.stockCode},${stockItem.quantity}\n`).join('');
    const csvString = `${headerString}${rowString}`;

    // let dir = await ScopedStorage.openDocumentTree(true);
    if(await hasFolderPermissions()){
      let file = await ScopedStorage.createDocument("StockTake_2023", "text/csv", csvString);
      if(file){
        ToastAndroid.show('File saved successfully', ToastAndroid.SHORT)
      }
    }
  }

  const loadCSV = async () => {
    // let dir = await ScopedStorage.openDocumentTree(true);
    if(await hasFolderPermissions()){
      let file = await ScopedStorage.openDocument(true, 'utf8');

      if(file){
        if(file.mime === 'text/csv'){
          ToastAndroid.show('File loaded successfully',ToastAndroid.SHORT)
          // handle CSV file
          // file.data
        }
        else{
          ToastAndroid.show('Can only load text or CSV files',ToastAndroid.LONG)
        }
      }
    }
  }

  const hasFolderPermissions = async () => {
    if(storeageUri !== ''){ return true }

    let dir = await ScopedStorage.openDocumentTree(true);
    
    if(dir){
      SetStorageUri(dir.uri)
      return true
    }

    return false
  }

  return (
    <View style={styles.mainContainer}>
      <Header toggleEditing={toggleEditing} openBarcodeScanner={openBarcodeScanner} saveCSV={saveCSV} loadCSV={loadCSV}/>
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
            data={state.stockItems}
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
    backgroundColor: 'black',
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
