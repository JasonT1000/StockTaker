/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { AppContext } from '../Store/stockItemContext';
import { Types } from '../Store/reducers';

function BarcodeScanner({navigation}:any){
  const {state, dispatch} = useContext(AppContext)

  let scannerRef:QRCodeScanner|null = null
  
  const [scanningEnabled, SetScanningEnabled] = useState(false)
  const [currentItemCode, SetCurrentItemCode] = useState('')
  const [CurrentItemQuantity, SetCurrentItemQuantity] = useState(0)
  const [torchMode, SetTorchMode] = useState(RNCamera.Constants.FlashMode.off)

  enum TorchMode {
    ON = RNCamera.Constants.FlashMode.torch,
    OFF = RNCamera.Constants.FlashMode.off
  };

  useEffect(() => {
    const updatedItem = state.stockItems.find(stockItem => stockItem.stockCode === currentItemCode)
    if(updatedItem){
      SetCurrentItemQuantity(updatedItem? updatedItem.quantity: 1)
    }
  }, [state.stockItems]);

  const addStockItem = (newStockCode:string) => {
      dispatch({
        type: Types.Add,
        payload: {
          stockCode: newStockCode
        }
      })

      SetCurrentItemCode(newStockCode)
  }

  const reactivateScanner = () => {
    if(!scanningEnabled){
      SetScanningEnabled(true)
    }

    if(scannerRef){
      scannerRef.reactivate()
    }
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
      {scanningEnabled ? (
        <QRCodeScanner
          onRead={({data}) => addStockItem(data)}
          flashMode={torchMode}
          // reactivate = {canScan}
          // reactivateTimeout={500}
          showMarker={true}
          ref={(node) => {scannerRef = node}}
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
              <TouchableOpacity onPress={reactivateScanner}>
                <Text style={styles.scanButton}>Scan Code</Text>
              </TouchableOpacity>
              <View style={[styles.bottomView, styles.torchButton]}>
                <Button title='Toggle Torch' onPress={torchPressHandler}/>
              </View>
            </View>
          }
        />
      ) : (
      <View style={styles.bottomView}>
        <Text style={styles.startText}>Press Scan Code button to start</Text>
        <TouchableOpacity onPress={reactivateScanner}>
          <Text style={styles.scanButton}>Scan Code</Text>
        </TouchableOpacity>
      </View>
      )}
      
    </View>
      
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'black',
  },
    cameraContainer: {
    backgroundColor: 'black',
  },
  cameraWindow:{
    alignSelf: 'center',
    maxHeight: 400,
  },
  marker:{
    width: 100,
    height: 100,
  },
  topView: {
    flex: 1,
    paddingVertical: 20,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  topViewRow: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  topViewHeading: {
    color: '#B5B4BB',
    opacity: 0.75,
  },
  barcodeData:{
    color: 'white',
    fontSize: 20,
  },
  bottomView: {
    flex: 1,
    // height: 300,
    marginTop: 10,
    // marginBottom: 20,
    paddingTop: 10,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  scanButton: {
    // flex: 1,
    fontSize: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#1AB329',
    // backgroundColor: '#2D81D2',
    borderRadius: 5,
    color: 'white',
  },
  torchButton: {
    flex: 1,
    marginTop: 20,
    
    marginBottom: 5,
  },
  startText: {
    marginBottom: 20,
  },
})

export default BarcodeScanner;
