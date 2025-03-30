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
      <Text style = {styles.rowItemOne}>{item? item.stockEan : ''}</Text>
      <Text style = {styles.rowItemTwo}>{item? item.stockCode : ''}</Text>
      <Text style = {isEditing? styles.rowItemFour : styles.rowItemThree}>{item? item.quantity : ''}</Text>
      {isEditing && <TextInput
        style = {[styles.rowItemThree, styles.rowInput]}
        inputMode ='numeric'
        value={inputText}
        onChangeText={SetInputText}
        onSubmitEditing={submitEvent => handleStockInputComponentSubmitEvent(submitEvent, item.id)}
      />}
      {isEditing && <TouchableOpacity style={[styles.rowItemThree, styles.deleteButton]} onPress={() => deleteStockItem(item.id)}>
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
  rowItemOne:{
    flex: 3,
    fontSize: 18,
    marginTop: 18,
    paddingRight: 5,
    textAlign: 'left',
    color: 'white',
  },
  rowItemTwo:{
    flex: 3,
    fontSize: 18,
    marginTop: 18,
    paddingHorizontal: 5,
    textAlign: 'left',
    color: 'white',
  },
  rowItemThree:{
    flex: 1,
    fontSize: 18,
    marginTop: 18,
    textAlign: 'right',
    color: 'white',
  },
  rowItemFour:{
    flex: 1,
    fontSize: 18,
    marginTop: 18,
    paddingRight: 5,
    textAlign: 'right',
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
