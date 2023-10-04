import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";
// import SearchableDropdown from 'react-native-searchable-dropdown';
// import DropDownPicker from 'react-native-dropdown-picker';
import CategoryDropdown from "./categoryDropdown";
import { AppContext } from "../Store/stockItemContext";

interface Props {
    visible:boolean
    toggle:Function
    serverIpAddress:null|string
    // updateServerIpaddress:any
    updateServerIpaddress:(newServerIpAddress:string) => boolean
    // uploadStockCodesToServer:any
}

export type dropdownItem = {
    label: string,
    value: string
}

const ModalInput = ({ visible, toggle, serverIpAddress, updateServerIpaddress}:Props) => {
    const {state, dispatch} = useContext(AppContext)
    
    const [tempIpAddress, setTempIpAddress] = useState<string>('')
    const [stockCategories, setStockCategories] = useState<dropdownItem[]>([{label: 'None', value: 'None'}])
    const [selectedCategory, setSelectedCategory] = useState<string>('')
    const [errorIpAddressText, setErrorIpAddressText] = useState('')
    const [errorCategoryText, setErrorCategoryText] = useState<null|string>('')
    const [errorUploadText, setErrorUploadText] = useState<null|string>('')

    const firstUpdate = useRef(true);

    const regexIpAddress = /^((\d){1,3}\.){3}(\d){1,3}$/

    useEffect(() => {
        if(serverIpAddress) loadStockCategories()
    }, [serverIpAddress])

    useEffect(() => { // On first load dont show empty category error message
        if(firstUpdate.current && serverIpAddress){
            firstUpdate.current = false;
        }
        else if(serverIpAddress){
            isValidCategory()
        }
    }, [selectedCategory])

    const loadStockCategories = async () => {

        fetch('http://' + serverIpAddress + ':4000/api/stockcodes/categories', {method: "GET",})
        .then((resp) => resp.json())
        .then((data) => {
            let newCategories: dropdownItem[] = []

            for (const category of data) {
                newCategories.push({label:category, value:category})
            }

            setStockCategories(newCategories)

        }).catch((error) => {
            console.log("Error fetching categories from server")
            console.log(error)
        })
    }

    const uploadStockCodesToServer = async (updatedIpAddress?:string) => {
        let ipAddress = serverIpAddress
        if(updatedIpAddress) ipAddress = updatedIpAddress

        let stockCodeSection = (stockCode: string, stockQuantity: number) => {
            return {
                stockCode: stockCode,
                stockQuantity: stockQuantity
            }
        }

        let stockCodeData = []

        for (const stockItem of state.stockItems) {
            stockCodeData.push(stockCodeSection(stockItem.stockCode, stockItem.quantity))
        }
        console.log("uploadStockCodesToServer function 2")
        if(stockCodeData.length > 0)
        {
            fetch('http://' + ipAddress + ':4000/api/stockcodes/' + selectedCategory + '&true' , {
                method: 'POST',
                body: JSON.stringify(stockCodeData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("Successfully uploaded stock code data")
                hideModal()    
            }).catch((error) => {
                console.log("Error uploading stockItems to server")
                console.log(error)
                setErrorUploadText("Error uploading stockItems to server. Check server is running and Ipaddress is correct")
            })


            // const response = await fetch('http://' + ipAddress + ':4000/api/stockcodes/' + selectedCategory + '&true', {
            //     method: 'POST',
            //     body: JSON.stringify(stockCodeData),
            //     headers: {
            //         'Content-Type': 'application/json'
            //     }
            // })

            // const json = await response.json()

            // if(response.ok){
            //     console.log("Successfully uploaded stock code data")
            //     console.log(response.statusText)
            //     hideModal()
            // }
            // else if(!response.ok){
            //     console.log("response from server NOT ok")
            //     console.log(response.statusText)
            //     console.log(json.error)
            //     // Display the error message user
            //     setErrorUploadText(json.error)
            // }
        }
    }

    const onTextChange = (newIpAddress:string) => {
        setTempIpAddress(newIpAddress)
    }

    const isValidInput = (string:string) => {
        if(regexIpAddress.test(string)){
          setErrorIpAddressText('')
        //   setTempIpAddress('')
          return true;
        }
    
        setErrorIpAddressText('Not a valid Ipaddress')
    
        return false;
    }

    const isValidCategory = () => {
        if(selectedCategory === ''){
            setErrorCategoryText('Please choose a category')
            return false
        }

        setErrorCategoryText(null)
        return true
    }

    const onSubmitIpAddress = () => {
        if(isValidInput(tempIpAddress)){
            updateServerIpaddress(tempIpAddress)
        }
    }

    const onSubmit = () => {
        setErrorUploadText('')

        if(isValidCategory())
        {
            if(serverIpAddress)
            {
                if(tempIpAddress === ''){
                    uploadStockCodesToServer()
                }
                else if(isValidInput(tempIpAddress)){
                    updateServerIpaddress(tempIpAddress)
                    uploadStockCodesToServer(tempIpAddress)
                    setTempIpAddress('')
                }
            }
            else if(isValidInput(tempIpAddress)){
                updateServerIpaddress(tempIpAddress)
                uploadStockCodesToServer(tempIpAddress)
                setTempIpAddress('')
            }
        }
        else if( tempIpAddress !== '') isValidInput(tempIpAddress)
    }

    const hideModal = () => {
        setTempIpAddress('')
        toggle()
    }

    // const createDropdownItem = (value:string|null):dropdownItem|null => {
    //     if(!value) return null
    //     return {
    //         label: value,
    //         value: value
    //     }
    // }

    return ( 
        <Modal animationType="fade" visible={visible} transparent={true} style={{justifyContent:'center'}}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTextTitle}>Upload stockCodes to server</Text>
                    {serverIpAddress?
                        <>
                            <View style={styles.ipaddressContentContainer}>
                                <Text style={styles.modalTextLabel}>Current server IpAddress:</Text>
                                <Text style={styles.modalText}>{serverIpAddress}</Text>

                                <Text style={styles.modalTextLabel}>Change server IpAddress:</Text>
                                <TextInput
                                    style={styles.modalTextInput}
                                    placeholder='192.168.1.1'
                                    placeholderTextColor= 'rgba(52, 52, 52, 0.3)'
                                    value={tempIpAddress}
                                    onChangeText={onTextChange}
                                    // onSubmitEditing={(value) => onSubmitIpAddress(value.nativeEvent.text)}
                                />
                                { errorIpAddressText ? <Text style={{ color: 'red' }}>{errorIpAddressText}</Text> : null }
                            </View>
                            
                            <View style={styles.dropdownContentContainer} pointerEvents="auto">
                                <Text style={styles.modalTextLabel}>Select stocktake category:</Text>
                                <CategoryDropdown
                                    inputValue={selectedCategory}
                                    items={stockCategories}
                                    setValue={setSelectedCategory}
                                    setItems={setStockCategories}
                                />
                                { errorCategoryText? <Text style={{ color: 'red' }}>{errorCategoryText}</Text> : null }
                            </View>
                        </>
                        :
                            <View>
                                <Text style={styles.modalTextLabel}>Set server IpAddress:</Text>
                                <TextInput
                                    style={styles.modalTextInput}
                                    placeholder='192.168.1.1'
                                    placeholderTextColor= 'rgba(52, 52, 52, 0.3)'
                                    value={tempIpAddress}
                                    onChangeText={onTextChange}
                                    // onSubmitEditing={(value) => onSubmitIpAddress(value.nativeEvent.text)}
                                />
                                { errorIpAddressText ? <Text style={{ color: 'red' }}>{errorIpAddressText}</Text> : null }
                            </View>
                    }

                    <View>
                        { errorUploadText ? <Text style={{ color: 'red' }}>{errorUploadText}</Text> : null }
                    </View>
                    <View style={styles.modalButtonContainer}>
                        <Button title="Cancel" onPress={hideModal} />
                        { serverIpAddress? 
                            <Button title={"Upload"} onPress={onSubmit} />
                            :
                            <Button title={"Set IpAddress"} onPress={onSubmitIpAddress} />
                        }
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