import React, { useState } from "react";
import { Text, TextInput, View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { dropdownItem } from "./modalInput";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons/faCaretDown'
import { faCaretUp } from '@fortawesome/free-solid-svg-icons/faCaretUp'


interface Props {
    inputValue:string
    items:dropdownItem[]
    setValue:any
    setItems:any
}

// type dropdownItem = {
//     // id: number,
//     label: string,
//     value: string
// }

const CategoryDropdown = ({inputValue, items, setValue, setItems}:Props) => {
    const [tempCategory, setTempCategory] = useState<string>('')
    const [open, setOpen] = useState(false);

    const onPressDropdownButton = () => {
        setTempCategory('')
        setOpen(!open);
    }

    const onItemSelect = (category:string) => {
        setValue(category)
        setOpen(false)
    }

    const onInputSubmit = (newCategory:any) => {
        if(newCategory === '') {
            setOpen(false)
            return
        }

        //If item doesnt exist
        let existingIndex = items.findIndex((stockCategory) => stockCategory.label === newCategory)
        if(existingIndex == -1){
            setItems([...items, createDropdownItem(newCategory)])
            setValue(newCategory)
            
        }

        // clear input
        setTempCategory('')
    }

    const createDropdownItem = (value:string):dropdownItem => {
        return {
            label: value,
            value: value
        }
    }

    const DropdownTogglerItem = ({ title }:{title:string}) => (
        <TouchableOpacity
            style={[styles.dropdownButton, open? styles.dropdownButtonOpen: null]}
            onPress={onPressDropdownButton}
            >
            <Text style={styles.dropdownButtonText}>{title}</Text>
            <FontAwesomeIcon
                icon={open? faCaretUp : faCaretDown}
                size={32}
                color='grey'
                style={styles.dropdownButtonIcon}
            />
        </TouchableOpacity>
    );
    const Item = ({ title }:{title:string}) => (
        <TouchableOpacity style={styles.button} onPress={() => onItemSelect(title)}>
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );

    const renderItem = ({ item }:{item:dropdownItem}) => {
        return <Item title={item.value} />
    };

    return ( 
        <View style={[styles.container, open? styles.open: styles.closed]}>
            { open?
                <>
                    <DropdownTogglerItem title={inputValue}/>
                    <TextInput
                        style={[styles.title, styles.textInputNewCat]}
                        placeholder='New category...'
                        placeholderTextColor='rgba(52, 52, 52, 0.3)'
                        value={tempCategory}
                        onChangeText={setTempCategory}
                        onSubmitEditing={(value)=> onInputSubmit(value.nativeEvent.text)}
                    />
                
                    <FlatList
                        nestedScrollEnabled={true}
                        data={items}
                        renderItem={renderItem}
                        style={{flexGrow:1}}
                    />
                </>
                : <DropdownTogglerItem title={inputValue}/>
            }
        </View>
     );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 0,
        alignSelf: "center",
        backgroundColor: 'white',
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
        zIndex: 1000,
    },
    open:{
        height: 280,
    },
    closed:{
        height: 50,
    },
    dropdownButton:{
        flex: 0,
        flexDirection: 'row',
        width: '100%',
        padding: 10,
    },
    dropdownButtonOpen:{
        borderColor: 'grey',
        borderBottomWidth: 1
    },
    dropdownButtonIcon:{
        width: 20,
    },
    dropdownButtonText:{
        width: '90%',
        fontSize: 20,
        color: 'black',
        textAlign: 'left',
    },
    button: {
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 20,
        color: 'black',
    },
    textInputNewCat: {
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
        margin: 10,
    },
})
 
export default CategoryDropdown;