/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useContext, useEffect, useState } from 'react';
import {
  BackHandler,
  Button,
  StyleSheet,
  Text,
  TextInput,
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
  const [currentItemQuantity, SetCurrentItemQuantity] = useState<number>(0)
  const [tempQuantity, setTempQuantity] = useState<string>('')
  const [torchMode, SetTorchMode] = useState(RNCamera.Constants.FlashMode.off)

  enum TorchMode {
    ON = RNCamera.Constants.FlashMode.torch,
    OFF = RNCamera.Constants.FlashMode.off
  };

  useEffect(() => {
    const backAction = () => {
      if(currentItemCode !== ''){
        dispatch({
          type: Types.AddManual,
          payload: {
            stockCode: currentItemCode,
            quantity: currentItemQuantity
          }
        })
      }

      return false
    }

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)

    return () => backHandler.remove()
  }, [currentItemCode, currentItemQuantity])

  const addStockItem = (newStockCode:string) => {
    if(newStockCode == currentItemCode){ // same stock code
      SetCurrentItemQuantity(currentItemQuantity + 1)
      setTempQuantity((currentItemQuantity + 1).toString())
    }
    else{ // different stock code
      if(currentItemCode !== ''){ // stockcode has been set before
        dispatch({
          type: Types.AddManual,
          payload: {
            stockCode: currentItemCode,
            quantity: currentItemQuantity
          }
        })
      }

      SetCurrentItemCode(newStockCode)
      SetCurrentItemQuantity(1)
      setTempQuantity((1).toString())
    }
    
    SetScanningEnabled(false)
    scannerRef?.disable
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

  const onHandleQuantityChange = (newQuantity:string) =>{
    setTempQuantity(newQuantity)
    if(newQuantity == '') return

    SetCurrentItemQuantity(parseInt(newQuantity))
  }

  const onHandleSubmit = (event:any) =>{
    SetCurrentItemQuantity(parseInt(event.nativeEvent.text))
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
              
              {currentItemQuantity > 0 ?
                <View style={styles.topViewRow}>
                  <Text style={[styles.barcodeData, styles.topViewHeading]}>Quantity: </Text>
                  <Text style={styles.barcodeData}>{currentItemQuantity}</Text>
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
      ) : 
      
        currentItemQuantity > 0 ?
          (
            <View style={styles.parentView}>
              <View style={styles.topViewRow}>
                <Text style={[styles.barcodeData, styles.topViewHeading]}>Barcode: </Text>
                <Text style={styles.barcodeData}>{currentItemCode}</Text>
              </View>
              <View style={styles.topViewRow}>
                <Text style={[styles.barcodeData, styles.topViewHeading]}>Quantity: </Text>
                <TextInput
                    style={styles.textInput}
                    keyboardType='numeric'
                    value={tempQuantity}
                    onChangeText={onHandleQuantityChange}
                    onSubmitEditing={submitEvent => onHandleSubmit(submitEvent)}
                  />
              </View>
              <View style={styles.bottomView2}>
                <Text style={styles.startText}>Press Scan Code button to start</Text>
                <TouchableOpacity onPress={reactivateScanner}>
                  <Text style={styles.scanButton}>Scan Code</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) :
          (
            <View style={styles.bottomView2}>
              <Text style={styles.startText}>Press Scan Code button to start</Text>
              <TouchableOpacity onPress={reactivateScanner}>
                <Text style={styles.scanButton}>Scan Code</Text>
              </TouchableOpacity>
            </View>
          )
        }
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
  textInput:{
    borderWidth: 1,
    borderColor: '#777',
    fontSize: 20,
    padding: 0,
    paddingLeft: 5,
  },
  bottomView: {
    flex: 1,
    marginTop: 10,
    paddingTop: 10,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  bottomView2: {
    flex: 1,
    marginTop: 40,
    paddingTop: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  parentView: {
    flex: 1,
    height: '100%',
    marginTop: 10,
    paddingTop: 10,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  scanButton: {
    fontSize: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#1AB329',
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
