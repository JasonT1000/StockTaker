/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { AppContext } from '../Store/stockItemContext';
import { Types } from '../Store/reducers';



function BarcodeScanner({navigation}:any){
  const [currentItemCode, SetCurrentItemCode] = useState('')
  const {state, dispatch} = useContext(AppContext)
  const [CurrentItemQuantity, SetCurrentItemQuantity] = useState(0)
  const [torchMode, SetTorchMode] = useState(RNCamera.Constants.FlashMode.torch)

  const TorchMode = Object.freeze({
    ON: RNCamera.Constants.FlashMode.torch,
    OFF: RNCamera.Constants.FlashMode.off
  });

  useEffect(() => {
    const updatedItem = state.stockItems.find(stockItem => stockItem.stockCode === currentItemCode)

    SetCurrentItemQuantity(updatedItem.quantity)

  }, [state.stockItems]);

  const addStockItem = (newStockCode:string) => {
      dispatch({
        type: Types.Add,
        payload: {
          stockCode: newStockCode,
          quantity: 44,
          id: 44,
        }
      })

      SetCurrentItemCode(newStockCode)
  }

  const reactivateScanner = () => {
    this.scanner.reactivate()
  }

  const torchPressHandler = () =>{
    if(torchMode === TorchMode.ON){
      SetTorchMode(TorchMode.OFF)
      return
    }

    SetTorchMode(TorchMode.ON)
  }

  return (
    <View style={styles.container}>
      <QRCodeScanner
        onRead={({data}) => addStockItem(data)}
        flashMode={torchMode}
        // reactivate = {canScan}
        // reactivateTimeout={500}
        showMarker={true}
        ref={(node) => {this.scanner = node}}
        topContent={
          <View style={styles.topView}>
            <View style={styles.topViewRow}>
              <Text style={[styles.barcodeData, styles.topViewHeading]}>Barcode: </Text>
              <Text style={styles.barcodeData}>{currentItemCode}</Text>
            </View>
            
            {CurrentItemQuantity > 0 ?
              <View style={styles.topViewRow}>
                <Text style={[styles.barcodeData, styles.topViewHeading]}>Quantity: </Text>
                <Text style={styles.barcodeData}>{CurrentItemQuantity}</Text>
              </View>
              : null }
          </View>
        }
        containerStyle={styles.cameraContainer}
        cameraStyle={styles.cameraWindow}
        // markerStyle={styles.marker}
        bottomContent={
          <View style={styles.bottomView}>
            <Button title='scan code' onPress={reactivateScanner}/>
            <View style={styles.bottomView}>
              <Button title='Toggle Torch' onPress={torchPressHandler}/>
            </View>
          </View>
        }
      />
    </View>
      
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'red',
  },
    cameraContainer: {
    backgroundColor: 'black',
  },
  cameraWindow:{
    // width: 80,
    alignSelf: 'center',
  },
  marker:{
    width: 100,
    height: 100,
  },
  topView: {
    flex: 1,
    backgroundColor: 'blue',
    // padding: 20,
    paddingVertical: 20,
    // margin: 10,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  topViewRow: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  topViewHeading: {
    opacity: 0.75,
  },
  barcodeData:{
    fontSize: 20,
  },
  bottomView: {
    flex: 1,
    backgroundColor: 'green',
    marginTop: 20,
    paddingTop: 20,
    width: '100%',
    alignItems: 'center',
  },
})

export default BarcodeScanner;
