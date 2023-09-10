import { useState } from "react";
import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";

interface Props {
    visible:boolean
    value:string
    toggle:any
    // onTextChange:any
    // onSubmit:any
}

const ModalInput = ({ visible, value, toggle }:Props) => {
    const [serverIpAddress, setServerIpAddress] = useState<null|string>(null)
    const [inputValue, setInputValue] = useState<string>('')
    const [errorText, SetErrorText] = useState('')
    const regexIpAddress = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\\b){4}$/
    
    const onTextChange = (newIpAddress:string) => {
        console.log("Text changed")
        console.log(newIpAddress)
        setInputValue(newIpAddress)
    }

    const isValidInput = (string:string) => {
    
        if(regexIpAddress.test(string)){
          SetErrorText('')
          return true;
        }
    
        SetErrorText('Not a valid Ipaddress')
    
        return false;
      }

    const onSubmit = () => {
        console.log("submitted to server")
        if(isValidInput(inputValue)){
            setServerIpAddress(inputValue)
            console.log("Valid ipaddress added")
            console.log(serverIpAddress)
        }
    }

    return ( 
        <Modal visible={visible} transparent={true} style={{justifyContent:'center'}}>
            <View
                style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>Server Ip Address</Text>
                    <TextInput
                        style={styles.modalTextInput}
                        placeholder='192.168.1.1'
                        placeholderTextColor='grey'
                        value={inputValue}
                        onChangeText={onTextChange}
                    />
                    <View style={styles.modalButtons}>
                        <Button title="close" onPress={toggle} />
                        <Button title="ok" onPress={onSubmit} />
                    </View>
                </View>
            </View>
        </Modal>
     );
}

const styles = StyleSheet.create({

    modalContainer:{
      backgroundColor: 'rgba(52, 52, 52, 0.7)',
      flex: 1,
      justifyContent: 'center',
    },
    modalContent:{
        height: 200,
        opacity: 1,
        padding: 20,
        width: '80%',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    modalText:{
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
        height: 40,
        fontSize: 21,
        color: 'black',
    },
    modalTextInput:{
      flex: 0,
      borderWidth: 1,
      borderColor: '#777',
      padding: 8,
      margin: 10,
      color: 'grey',
      fontSize: 21,
    },
    modalButtons:{
        flexDirection: 'row',
        gap: 20,
        alignSelf: 'center',
        marginTop: 30,
    }
  })
 
export default ModalInput;