/**
 * React Native app to help with stock take
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useContext, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import * as ScopedStorage from "react-native-scoped-storage"
import Header from "../Components/header";
import StockItemRow from '../Components/stockItemRow';
import { AppContext } from '../Store/stockItemContext';
import { Types } from '../Store/reducers';
import { displayFileContents } from '../customFunctions';
import ModalInput from '../Components/modalInput';
import useDatabase from '../Hooks/useDatabase';


function App({navigation}:any){
  // State
  const [inputText, SetInputText] = useState('')
  const [errorText, SetErrorText] = useState('')

  const [isEditing, SetIsEditing] = useState(false)
  const [storeageUri, SetStorageUri] = useState('')

  // const [serverIpAddress, setServerIpAddress] = useState<null|string>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  // Context
  const {state, dispatch} = useContext(AppContext)

  // Hooks
  const { checkEANExistsInDatabase } = useDatabase()

  const ErrorMessage = Object.freeze({
    Short: 'That stockcode is not long enough',
    Illegal: 'Illegal stockcode detected'
  });

  const toggleEditing = (canEdit:boolean) =>{
    SetIsEditing(canEdit)
  }

  const handleStockInputChangeEvent = (changedText:string) => {
    SetInputText(changedText);
    if(errorText === ''){ return }
    SetErrorText('')
  }

  const handleStockInputComponentSubmitEvent = (event:any) =>{
    if(isValidInput(event.nativeEvent.text))
    {
      addStockEan(event.nativeEvent.text)
    }
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

  /**
   * Checks if passed in stockEAN exists in database before adding it to stocktake.
   * Displays error message if doesn't exist.
   * @param stockEAN EAN number to add
   */
  const addStockEan = async (stockEAN:string) =>{
    let stockInfo = await checkEANExistsInDatabase(stockEAN)

    if(stockInfo){
      if(stockInfo.stockCode !== ''){
        addStockItem(stockEAN, stockInfo.stockCode)
      }
      else{
        SetErrorText(stockInfo.errorText)
      }
    }
  }

  const handleErrorText = (string:string) => {
    const regex = /^.{0,3}$/;
    SetErrorText(ErrorMessage.Illegal)

    if(regex.test(string)){
      SetErrorText(ErrorMessage.Short)
    }
  }

  // This function is called for every item in a saved stocktake. Could be problematic
  const addStockItem = (newStockEan:string, newStockCode:string, quantity?:number) => {
    if(isValidInput(newStockEan))
    {
      dispatch({
        type: Types.Add,
        payload: {
          stockEan: newStockEan,
          stockCode: newStockCode,
          quantity: quantity,
        }
      })
      SetInputText('')
    }
  }

  const updateItem = (id:string, newQuantity:number) => {
    dispatch({
      type: Types.Update,
      payload: {
        quantity: newQuantity,
        id: id,
      }
    })
  }

  const deleteStockItem = (id:string) => {
    // Will need a modal to check if user is sure they want to delete an item
    dispatch({
      type: Types.Delete,
      payload: { id: id }
    })
  }

  const clearAllStockItems = () =>{
    dispatch({type: Types.Clear, payload:{}})
  }

  const openBarcodeScanner = () =>{
    navigation.navigate('BarcodeScanner')
  }

  const saveCSV = async () => {
    // construct csvString
    const headerString = 'stockEan,stockCode,qty\n';
    const rowString = state.stockItems.map(stockItem => `${stockItem.stockEan},${stockItem.stockCode},${stockItem.quantity}\n`).join('');
    const csvString = `${headerString}${rowString}`;

    // if(await hasFolderPermissions()){
      const date = new Date().toLocaleDateString('en-NZ').replace(/\//g, '-')
      
      let file = await ScopedStorage.createDocument(("StockTake_" + date + ".csv"), "text/csv", csvString);
      if(file){
        ToastAndroid.show('File saved successfully', ToastAndroid.SHORT)
      }
    // }
  }

  const loadCSV = async () => {
      let file = await ScopedStorage.openDocument(true, 'utf8');

      if(file){
        if(file.mime === 'text/csv' || file.mime === 'text/comma-separated-values'){
          ToastAndroid.show('File loaded successfully',ToastAndroid.SHORT)
          // NEED TO Disable input until files loaded
          displayFileContents(file.data, addStockItem)
        }
        else{
          ToastAndroid.show('Can only load text or CSV files',ToastAndroid.LONG)
        }
      }
  }

  /**
   * Updates the server IpAddress
   * @param newServerIpAddress 
   * @returns {boolean} true if server IpAddress was updated else false
   */
  // const updateServerIpaddress = (newServerIpAddress:string):boolean => {
  //   if(newServerIpAddress !== ''){ //Update ipaddress if new
  //     setServerIpAddress(newServerIpAddress)
  //     return true
  //   }

  //   return false
  // }

  return (
    <View style={styles.mainContainer}>
      <Header
        toggleEditing={toggleEditing}
        toggleInputModal={() => setIsModalVisible(!isModalVisible)}
        openBarcodeScanner={openBarcodeScanner}
        // openDataUploader={openDataUploader}
        saveCSV={saveCSV}
        loadCSV={loadCSV}
        clearAllStockItems={clearAllStockItems}
      />
      <ModalInput
        visible={isModalVisible}
        toggle={() => setIsModalVisible(!isModalVisible)}
        // serverIpAddress={serverIpAddress}
        // updateServerIpaddress={updateServerIpaddress}
        // uploadStockCodesToServer={uploadStockCodesToServer}
      />
      <TextInput 
        style={styles.stockCodeInput}
        placeholder='StockEan here'
        placeholderTextColor={'grey'}
        autoCapitalize='characters'
        value={inputText}
        onChangeText={(changedText) => handleStockInputChangeEvent(changedText)}
        // onChangeText={SetInputText}
        onSubmitEditing={(submitEvent) => handleStockInputComponentSubmitEvent(submitEvent)}
      />
      {errorText ? <Text style={{ color: 'red' }}>{errorText}</Text> : null}

      <View style={styles.mainContentContainer}>
        <View style = {styles.listRow}>
          <Text style={styles.rowHeadingOne}>Ean</Text>
          <Text style={styles.rowHeadingTwo}>Code</Text>
          <Text style={styles.rowHeadingThree}>Qty</Text>
          {isEditing && <Text style={styles.rowHeadingThree}></Text>}
        </View>
        <View style={styles.listContainer}>
          <FlatList
            keyExtractor={(item)=> item.id}
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
    color: 'white',
    fontSize: 21,    
    // width: 200,
  },
  listRow:{
    flexDirection: 'row',
    flex: 0,
  },
  rowHeadingOne:{
    flex: 3,
    fontWeight: 'bold',
    textAlign: 'left',
    height: 40,
    fontSize: 21,
    color: 'white',
  },
  rowHeadingTwo:{
    flex: 3,
    fontWeight: 'bold',
    textAlign: 'left',
    height: 40,
    fontSize: 21,
    color: 'white',
  },
  rowHeadingThree:{
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'right',
    height: 40,
    fontSize: 21,
    color: 'white',
  },
  listContainer:{
    flex: 1,
    marginBottom: 20,
  },
})

export default App;
