/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash'
import { StockItem } from '../Store/reducers';


interface Props {
  item:StockItem
  isEditing:boolean
  updateItem:any
  deleteStockItem:any
}


function StockItemRow({item, isEditing, updateItem, deleteStockItem}:Props){

  const [inputText, SetInputText] = useState('')

  const handleStockInputComponentSubmitEvent = (event:any, itemId:string) =>{
    if(event.nativeEvent.text != ''){
      updateItem(itemId, Number(event.nativeEvent.text))
      SetInputText('')
    }
  }

  return (
    <View style = {styles.listRow}>
      <Text style = {styles.rowItem}>{item? item.stockCode : ''}</Text>
      <Text style = {styles.rowItem}>{item? item.quantity : ''}</Text>
      {isEditing && <TextInput
        style = {[styles.rowItem, styles.rowInput]}
        inputMode ='numeric'
        value={inputText}
        onChangeText={SetInputText}
        onSubmitEditing={submitEvent => handleStockInputComponentSubmitEvent(submitEvent, item.id)}
      />}
      {isEditing && <TouchableOpacity style={[styles.rowItem, styles.deleteButton]} onPress={() => deleteStockItem(item.id)}>
        <FontAwesomeIcon
            icon={faTrash}
            size={24}
            color='red'
        />
      </TouchableOpacity>}
    </View>
  )
}

const styles = StyleSheet.create({
  listRow:{
    flexDirection: 'row',
    flex: 1,
  },
  rowItem:{
    flex: 2,
    fontSize: 18,
    marginTop: 18,
    textAlign: 'center',
    color: 'white',
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

export default StockItemRow;
