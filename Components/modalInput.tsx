import React, { useEffect, useState } from "react";
import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import SearchableDropdown from 'react-native-searchable-dropdown';

interface Props {
    visible:boolean
    toggle:any
    serverIpAddress:null|string
    uploadStockCodesToServer:any
}

type dropdownItem = {
    id: number,
    name: string
}

const ModalInput = ({ visible, toggle, serverIpAddress, uploadStockCodesToServer}:Props) => {
    // const [serverIpAddress, setServerIpAddress] = useState<null|string>(null)
    const [inputValue, setInputValue] = useState<string>('')
    const [stockCategories, setStockCategories] = useState<null|dropdownItem[]>([{id: 0, name: 'None'}])
    const [selectedCategory, setSelectedCategory] = useState<null|dropdownItem>(null)
    const [errorText, SetErrorText] = useState('')

    const regexIpAddress = /^((\d){1,3}\.){3}(\d){1,3}$/

    useEffect(() => {
        fetch('http://' + serverIpAddress + ':4000/api/stockcodes/categories', {method: "GET",}).then((resp) => {
            return resp.json()
        }).then((data) => {
            let newCategories: dropdownItem[] = []

            for (const category of data) {
                newCategories.push({id:category, name:category})
            }

            setStockCategories(newCategories)
            console.log(stockCategories)

        }).catch((error) => {
            console.log(error)
        })
    }, [])

    // const loadStockCategories = async () => {

    //     fetch('http://192.168.1.74:4000/api/stockcodes/categories', {method: "GET",}).then((resp) => {
    //         return resp.json()
    //     }).then((data) => {
    //         let newCategories: dropdownItem[] = []

    //         for (const category of data) {
    //             newCategories.push({id:category, name:category})
    //         }

    //         setStockCategories(newCategories)
    //         console.log(stockCategories)

    //     }).catch((error) => {
    //         console.log(error)
    //     })
    // }
    
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
        // loadStockCategories()
        console.log("submitted to server")
        if(inputValue === '' && serverIpAddress){
            uploadStockCodesToServer()
        }
        if(isValidInput(inputValue)){
            uploadStockCodesToServer(inputValue)
            console.log("Valid ipaddress added")
            console.log(serverIpAddress)
        }
    }

    const setCustomCategory = (newCategory:string) =>{
        const newCategoryItem:dropdownItem = {id: 0, name: newCategory}

        if(stockCategories){
            newCategoryItem.id = stockCategories.length
            setStockCategories([...stockCategories, newCategoryItem])
        }
        else{
            setStockCategories([newCategoryItem])
        }

        setSelectedCategory(newCategoryItem)
    }

    return ( 
        <Modal animationType="fade" visible={visible} transparent={true} style={{justifyContent:'center'}}>
            <View
                style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTextTitle}>Upload stockCodes to server</Text>

                    <View style={styles.modalContentContainer}>
                        <Text style={styles.modalTextLabel}>Current server IpAddress:</Text>
                        <Text style={styles.modalText}>{serverIpAddress}</Text>
                    </View>
                    
                    <View style={styles.modalContentContainer}>
                        <Text style={styles.modalTextLabel}>Select stocktake category:</Text>
                        <SearchableDropdown
                            selectedItems={selectedCategory}
                            onItemSelect={(item:dropdownItem) => {
                                console.log(item)
                                setSelectedCategory(item)
                            }}
                            onSubmit={((value:string) => { console.log(value)})}
                            containerStyle={{ padding: 5 }}
                            itemStyle={styles.SearchableDropdownItem}
                            itemTextStyle={{ color: 'black' }}
                            itemsContainerStyle={{ maxHeight: 240, zIndex: 5, elevation: 5 }}
                            items={stockCategories}
                            defaultIndex={0}
                            resetValue={false}
                            textInputProps={
                                {
                                    placeholder: "placeholder",
                                    underlineColorAndroid: "transparent",
                                    style: styles.SearchableDropdownTextInput,
                                    // onTextChange: text => alert(text)
                                    onSubmitEditing : (event:any) => setCustomCategory(event.nativeEvent.text)
                                }
                            }
                            listProps={
                                {
                                    nestedScrollEnabled: true,
                                }
                            }
                        />
                    </View>

                    <View style={styles.modalContentContainer}>
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
                    
                    <View style={styles.modalButtons}>
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
        flex: 1,
        // justifyContent: 'center',
    },
    modalContent:{
        height: 500,
        opacity: 1,
        padding: 20,
        width: '80%',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    modalTextTitle:{
        flex: 1,
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
    modalContentContainer:{
        flex: 2,
    },
    modalText:{
        flex: 1,
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
    modalButtons:{
        flexDirection: 'row',
        gap: 30,
        alignSelf: 'center',
        marginTop: 30,
    },
    SearchableDropdownTextInput:{
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        color: 'black',
        textTransform:'capitalize',
    },
    SearchableDropdownItem:{
        padding: 10,
        marginTop: 2,
        backgroundColor: '#ddd',
        borderColor: '#bbb',
        borderWidth: 1,
        borderRadius: 5,
    },
  })
 
export default ModalInput;