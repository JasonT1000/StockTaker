import React, { useEffect, useState } from "react";
import { Button, Text, TextInput, View, StyleSheet, TouchableOpacity, ScrollView, FlatList } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

interface Props {
    visible:boolean
    toggle:any
    serverIpAddress:null|string
    uploadStockCodesToServer:any
}

type dropdownItem = {
    id: number,
    label: string,
    value: string
}

const CategoryDropdown = () => {
    const [serverIpAddress, setServerIpaddress] = useState<string>('')
    const [inputValue, setInputValue] = useState<string>('')
    const [open, setOpen] = useState(false);
    const [stockCategories, setStockCategories] = useState<dropdownItem[]>([{id: 0, label: 'None', value: 'None'}])
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
                    newCategories.push({id: newCategories.length, label:category, value:category})
                }
    
                setStockCategories(newCategories)
    
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
            // uploadStockCodesToServer(serverIpAddress)
            setServerIpaddress(serverIpAddress)
            // Create a stockSection and send to server
        }
        else if(isValidInput(inputValue)){
            // uploadStockCodesToServer(inputValue)
            setServerIpaddress(inputValue)
            console.log("Valid ipaddress added")
            console.log(serverIpAddress)
            // Create a stockSection and send to server
        }
    }

    // const createDropdownItem = (value:string|null):dropdownItem|null => {
    //     if(!value) return null
    //     return {
    //         label: value,
    //         value: value
    //     }
    // }

    const DropdownTogglerItem = ({ title }:{title:string}) => (
        <TouchableOpacity style={styles.button} onPress={() => {setOpen(!open); console.log("toggle dropdown")}}>
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
    const Item = ({ title }:{title:string}) => (
        <TouchableOpacity style={styles.button}>
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );

    const renderItem = ({ item }:{item:dropdownItem}) => {
        return <Item title={item.value} />
    };

    return ( 
        <View style={styles.container}>
            { open?
                <>
                    <DropdownTogglerItem title={">"}/>
                    <TextInput
                        // style={styles.modalTextInput}
                        style={styles.title}
                        placeholder='Create new category'
                        placeholderTextColor='rgba(52, 52, 52, 0.3)'
                        value={inputValue}
                        onChangeText={onTextChange}
                    />
                
                    <FlatList
                        data={stockCategories}
                        renderItem={renderItem}
                        // keyExtractor={item => item.id}
                    />
                </>
                : <DropdownTogglerItem title={"<"}/>
            }
        </View>
     );
}

const styles = StyleSheet.create({
    container: {
        height: 250,
        width: '100%',
        marginTop: 0,
        alignSelf: "center",
        zIndex: 1000,
        backgroundColor: 'white',
      },
      button: {
        alignItems: 'center',
        // backgroundColor: '#DDDDDD',
        // padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      title: {
        fontSize: 20,
        color: 'black'
      },
})
 
export default CategoryDropdown;