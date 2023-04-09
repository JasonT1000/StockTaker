/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';



function BarcodeScanner({navigation}:any){
  const [data, Setdata] = useState('')
  const [itemQuantity, SetItemQuantity] = useState(0)
  const [torchMode, SetTorchMode] = useState(RNCamera.Constants.FlashMode.torch)

  const TorchMode = Object.freeze({
    ON: RNCamera.Constants.FlashMode.torch,
    OFF: RNCamera.Constants.FlashMode.off
  });

  const updateData = (stockCode:string) => {
    if(stockCode === data){
      SetItemQuantity(itemQuantity+1)
    }
    else{
      Setdata(stockCode)
      SetItemQuantity(1)
    }
  }

  const clickHandler = () => {
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
        onRead={({data}) => updateData(data)}
        flashMode={torchMode}
        // reactivate = {canScan}
        // reactivateTimeout={500}
        showMarker={true}
        ref={(node) => {this.scanner = node}}
        topContent={
          <View style={styles.topView}>
            <View style={styles.topViewRow}>
              <Text style={[styles.barcodeData, styles.topViewHeading]}>Barcode: </Text>
              <Text style={styles.barcodeData}>{data}</Text>
            </View>
            
            {itemQuantity > 0 ?
              <View style={styles.topViewRow}>
                <Text style={[styles.barcodeData, styles.topViewHeading]}>Quantity: </Text>
                <Text style={styles.barcodeData}>{itemQuantity}</Text>
              </View>
              : null }
          </View>
        }
        containerStyle={styles.cameraContainer}
        cameraStyle={styles.cameraWindow}
        // markerStyle={styles.marker}
        bottomContent={
          <View style={styles.bottomView}>
            <Button title='scan code' onPress={clickHandler}/>
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
