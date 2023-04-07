/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash'


function StockItemList(){
  const [stockItems, setStockItems] = useState([
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

  const addStockItem = (newStockCode:string) => {
    setStockItems((prevStockItems) => {
      return [{stockCode: newStockCode, quantity: 1, key: prevStockItems.length.toString()}, ...prevStockItems]
    })
  }

  const updateItem = (key:string, newQuantity:number) => {
    let index = stockItems.findIndex(stockItems => stockItems.key === key)
    let newArray = [...stockItems];
    newArray[index].quantity = newQuantity;
    setStockItems(newArray);
  }

  const getItemQuantity = (key:string):string => {
    let index = stockItems.findIndex(stockItems => stockItems.key === key)
    return stockItems[index].quantity.toString()
  }
  const deleteStockItem = (key:string) => {
    // Will need a modal to check if user is sure they want to delete an item
    console.log("Deleting a stock item")
    // setStockItems((prevStockItems) => {
    //   return prevStockItems.filter(stockItem => stockItem.key != key)
    // })
  }

  const touchHandler = (key:string) => {
    console.log(key)
  }

  return (
    <View style={styles.container}>
      <View style = {styles.listRow}>
        <Text style={styles.rowHeading}>ItemCode</Text>
        <Text style={styles.rowHeading}>Quantity</Text>
      </View>
      <FlatList
        keyExtractor={(item)=> item.key}
        data={stockItems}
        renderItem={({ item }) => (
          <View style = {styles.listRow}>
            <Text style = {styles.rowItem}>{item.stockCode}</Text>
            <Text style = {styles.rowItem}>{item.quantity}</Text>
            <TextInput
              style = {[styles.rowItem, styles.rowInput]}
              inputMode ='numeric'
              onSubmitEditing={newNumber => updateItem(item.key, Number(newNumber))}
            />
            <TouchableOpacity style={[styles.rowItem, styles.deleteButton]} onPress={deleteStockItem(item.key)}>
              <FontAwesomeIcon
                  icon={faTrash}
                  size={24}
                  color='red'
              />
            </TouchableOpacity>
          </View>
          
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    paddingHorizontal: 10,
  },
  listRow:{
    flexDirection: 'row',
  },
  rowHeading:{
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    height: 40,
    fontSize: 21,
  },
  rowItem:{
    flex: 2,
    fontSize: 18,
    marginTop: 18,
  },
  rowInput:{
    flex: 1,
    borderColor: 'white',
    borderWidth: 1,
    height: 30,
    paddingVertical: 0,
    marginRight: 5,
  },
  deleteButton:{
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
  }
})

export default StockItemList;
