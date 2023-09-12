import { height } from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import React, { useEffect, useState } from "react";
import { Button, FlatList, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
// import SearchableDropdown from 'react-native-searchable-dropdown';
import DropDownPicker from 'react-native-dropdown-picker';
import CategoryDropdown from "./categoryDropdown";

interface Props {
    visible:boolean
    toggle:any
    serverIpAddress:null|string
    uploadStockCodesToServer:any
}

type dropdownItem = {
    label: string,
    value: string
}

const ModalInput = ({ visible, toggle, serverIpAddress, uploadStockCodesToServer}:Props) => {
    const [inputValue, setInputValue] = useState<string>('')
    const [open, setOpen] = useState(false);
    const [stockCategories, setStockCategories] = useState<dropdownItem[]>([{label: 'None', value: 'None'}])
    const [selectedCategory, setSelectedCategory] = useState<null|string>(null)
    const [errorText, SetErrorText] = useState('')

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
                // console.log(stockCategories)
    
            }).catch((error) => {
                console.log(error)
            })
        }

        loadStockCategories()
        // fetch('http://' + serverIpAddress + ':4000/api/stockcodes/categories', {method: "GET",}).then((resp) => {
        //     return resp.json()
        // }).then((data) => {
        //     let newCategories: dropdownItem[] = []

        //     for (const category of data) {
        //         newCategories.push({id:category, name:category})
        //     }

        //     setStockCategories(newCategories)
        //     console.log(stockCategories)

        // }).catch((error) => {
        //     console.log(error)
        // })
    }, [])

    const onTextChange = (newIpAddress:string) => {
        console.log("Text changed")
        console.log(newIpAddress)
        setInputValue(newIpAddress)
    }

    const isValidInput = (string:string) => {
    
        if(regexIpAddress.test(string)){
          SetErrorText('')
          setInputValue('')
          return true;
        }
    
        SetErrorText('Not a valid Ipaddress')
    
        return false;
      }

    const onSubmit = () => {

        // Check a stockcategory has been chosen
        // display errror if not
        
        console.log("inputvalue is " + inputValue)
        if(inputValue === '' && serverIpAddress){
            console.log('1')
            uploadStockCodesToServer(serverIpAddress)
            // Create a stockSection and send to server
        }
        else if(isValidInput(inputValue)){
            uploadStockCodesToServer(inputValue)
            console.log("Valid ipaddress added")
            console.log(serverIpAddress)
            // Create a stockSection and send to server
        }
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
            <View style={styles.modalContainer}>
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
                        />
                        {errorText ? <Text style={{ color: 'red' }}>{errorText}</Text> : null}
                    </View>
                    
                    <View style={styles.dropdownContentContainer}>
                        <Text style={styles.modalTextLabel}>Select stocktake category:</Text>
                        <CategoryDropdown/>
                        {/* <DropDownPicker
                            open={open}
                            value={selectedCategory}
                            items={stockCategories}
                            setOpen={setOpen}
                            setValue={setSelectedCategory}
                            setItems={setStockCategories}
                            searchable={true}
                            addCustomItem={true}
                            listMode="SCROLLVIEW"
                            autoScroll={true}
                        />                   */}
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
        // flex: 1,
        height: '100%',
        borderColor: 'purple',
        borderWidth: 2,
    },
    modalContent:{
        // flex: 1,
        opacity: 1,
        padding: 20,
        height: '80%',
        width: '80%',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderColor: 'orange',
        borderWidth: 2,
    },
    modalTextTitle:{
        fontWeight: 'bold',
        textAlign: 'center',
        height: 40,
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
        flex: 1,
        alignContent: "center",
        borderColor: 'green',
        borderWidth: 2,
        zIndex: 2000,
        
    },
    dropdownPicker:{
        // flex: 1,
        height: 50,
        alignContent: "center",
        zIndex: 1000,
        // flexGrow: 1,
    },
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
        borderWidth: 1,
        borderColor: '#777',
        padding: 8,
        margin: 10,
        color: 'grey',
        fontSize: 21,
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