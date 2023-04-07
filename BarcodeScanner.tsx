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
import Header from "./Components/header";



function BarcodeScanner(){
  const [data, Setdata] = useState('scan something')
  const [canScan, EnableScanner] = useState(false)

  const clickHandler = () => {
    this.scanner.reactivate()
  }

  return (
      <QRCodeScanner
        onRead={({data}) => Setdata(data)}
        // flashMode={RNCamera.Constants.FlashMode.torch}
        // reactivate = {canScan}
        // reactivateTimeout={500}
        // showMarker={true}
        ref={(node) => {this.scanner = node}}
        topContent={
          <View>
            <Header/>
            <Text style={styles.barcodeData}>{data}</Text>
          </View>
        }
        containerStyle={styles.cameraContainer}
        cameraStyle={styles.cameraWindow}
        // markerStyle={styles.marker}
        topViewStyle={styles.topView}
        bottomViewStyle={styles.bottomView}
        bottomContent={
          <View>
            <Button title='scan code' onPress={clickHandler}/>
          </View>
        }
      />
  )
}

const styles = StyleSheet.create({
  barcodeData:{
    padding: 20,
    fontSize: 20,
    margin: 10
  },
  cameraContainer: {
    backgroundColor: 'blue',
    flex: 1,
    // width: '50%',
    height: '100%'
  },
  cameraWindow:{
    backgroundColor: 'red',
    // width: '50%',
    // height: 25,
    // marginLeft: 60
  },
  marker:{
    width: 100,
    height: 100
  },
  topView: {
    flex: 0.5,
    backgroundColor: 'yellow',
  },
  bottomView: {
    flex: 0.5,
    backgroundColor: 'green',
  },
})

export default BarcodeScanner;
