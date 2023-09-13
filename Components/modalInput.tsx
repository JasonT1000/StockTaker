import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
// import SearchableDropdown from 'react-native-searchable-dropdown';
// import DropDownPicker from 'react-native-dropdown-picker';
import CategoryDropdown from "./categoryDropdown";

interface Props {
    visible:boolean
    toggle:any
    serverIpAddress:null|string
    uploadStockCodesToServer:any
}

export type dropdownItem = {
    label: string,
    value: string
}

const ModalInput = ({ visible, toggle, serverIpAddress, uploadStockCodesToServer}:Props) => {
    const [inputValue, setInputValue] = useState<string>('')
    const [stockCategories, setStockCategories] = useState<dropdownItem[]>([{label: 'None', value: 'None'}])
    const [selectedCategory, setSelectedCategory] = useState<string>('')
    const [errorIpAddressText, setErrorIpAddressText] = useState('')
    const [errorCategoryText, setErrorCategoryText] = useState('')

    const firstUpdate = useRef(true);

    const regexIpAddress = /^((\d){1,3}\.){3}(\d){1,3}$/

    useEffect(() => {
        const loadStockCategories = async () => {

            fetch('http://192.168.1.74:4000/api/stockcodes/categories', {method: "GET",}).then((resp) => {
                return resp.json()
            }).then((data) => {
                let newCategories: dropdownItem[] = []
    
                for (const category of data) {
                    newCategories.push({label:category, value:category})
                }
    
                setStockCategories(newCategories)
    
            }).catch((error) => {
                console.log(error)
            })
        }

        loadStockCategories()
    }, [])

    useEffect(() => {
        if(firstUpdate.current){
            firstUpdate.current = false;
        }
        else{
            isValidCategory()
        }
    }, [selectedCategory])

    const onTextChange = (newIpAddress:string) => {
        console.log("Text changed")
        console.log(newIpAddress)
        setInputValue(newIpAddress)
    }

    const isValidInput = (string:string) => {
    
        if(regexIpAddress.test(string)){
          setErrorIpAddressText('')
          setInputValue('')
          return true;
        }
    
        setErrorIpAddressText('Not a valid Ipaddress')
    
        return false;
    }

    const isValidCategory = () => {
        console.log("selectedCategory")
        console.log(selectedCategory)
        if(selectedCategory === ''){
            setErrorCategoryText('Please choose a category')
            return false
        }

        setErrorCategoryText('')
        return true
    }

    const onSubmitIpAddress = (newIpaddress:string) => {

    }

    const onSubmit = () => {

        // Check a stockcategory has been chosen
        // display errror if not
        
        console.log("inputvalue is " + inputValue)
        if(inputValue === '' && serverIpAddress && isValidCategory()){
            console.log('1')
            uploadStockCodesToServer(serverIpAddress)
            // Create a stockSection and send to server
        }
        else if(isValidInput(inputValue) && isValidCategory()){
            uploadStockCodesToServer(inputValue)
            console.log("Valid ipaddress added")
            console.log(serverIpAddress)
            // Create a stockSection and send to server
        }

        isValidCategory()
    }

    const createDropdownItem = (value:string|null):dropdownItem|null => {
        if(!value) return null
        return {
            label: value,
            value: value
        }
    }

    return ( 
        <Modal animationType="fade" visible={visible} transparent={true} style={{justifyContent:'center'}}>
            <View style={styles.modalContainer} onTouchStart={() => {console.log("pressing modalContainer")}}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTextTitle}>Upload stockCodes to server</Text>

                    <View style={styles.ipaddressContentContainer}>
                        <Text style={styles.modalTextLabel}>Current server IpAddress:</Text>
                        <Text style={styles.modalText}>{serverIpAddress}</Text>

                        <Text style={styles.modalTextLabel}>Change server IpAddress:</Text>
                        <TextInput
                            style={styles.modalTextInput}
                            placeholder='192.168.1.1'
                            placeholderTextColor= 'rgba(52, 52, 52, 0.3)'
                            value={inputValue}
                            onChangeText={onTextChange}
                            // onSubmitEditing={(value) => onSubmitIpAddress(value.nativeEvent.text)}
                        />
                        {errorIpAddressText ? <Text style={{ color: 'red' }}>{errorIpAddressText}</Text> : null}
                    </View>
                    
                    <View style={styles.dropdownContentContainer} pointerEvents="auto">
                        <Text style={styles.modalTextLabel}>Select stocktake category:</Text>
                        <CategoryDropdown
                            inputValue={selectedCategory}
                            items={stockCategories}
                            setValue={setSelectedCategory}
                            setItems={setStockCategories}
                        />
                        {errorCategoryText? <Text style={{ color: 'red' }}>{errorCategoryText}</Text> : null}
                    </View>

                    <View style={styles.modalButtonContainer}>
                        <Button title="Cancel" onPress={toggle} />
                        <Button title="Upload" onPress={onSubmit} />
                    </View>
                </View>
            </View>
        </Modal>
     );
}

const styles = StyleSheet.create({

    modalContainer:{
        backgroundColor: 'rgba(52, 52, 52, 0.7)',
        height: '100%',
    },
    modalContent:{
        flex: 0,
        opacity: 1,
        padding: 20,
        // height: '100%',
        // height: 450,
        width: '80%',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderColor: 'orange',
        borderWidth: 2,
        flexGrow: 0,
    },
    modalTextTitle:{
        flex: 0,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 21,
        color: 'black',
    },
    modalTextLabel:{
        flex: 0,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 15,
        fontSize: 18,
        color: 'grey',
    },
    ipaddressContentContainer:{
        flex: 0,
        zIndex: 1,
    },
    dropdownContentContainer:{
        flex: 0,
        alignContent: "center",
        margin: 9,
        zIndex: 2000,
    },
    // dropdownPicker:{
    //     height: 50,
    //     alignContent: "center",
    //     zIndex: 1000,
    // },
    modalText:{
        flex: 0,
        fontWeight: 'bold',
        textAlign: 'center',
        height: 40,
        fontSize: 18,
        color: 'grey',
    },
    modalTextInput:{
        flex: 0,
        padding: 8,
        margin: 9,
        color: 'black',
        fontSize: 21,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
    },
    modalButtonContainer:{
        flexDirection: 'row',
        gap: 30,
        alignSelf: 'center',
        marginTop: 30,
        zIndex: 1,
    },
  })
 
export default ModalInput;