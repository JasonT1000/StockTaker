import React, { useEffect, useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons/faFloppyDisk'
import { faFileImport } from '@fortawesome/free-solid-svg-icons/faFileImport'
import { faBarcode } from '@fortawesome/free-solid-svg-icons/faBarcode'

function Header({toggleEditing}:any)
{
    const [isEditing, SetIsEditing] = useState(false)

    // Toggle editing on and off
    useEffect(() => {
        console.log("toggling Editing mode")
        toggleEditing(isEditing)
    }, [isEditing]);

    const editStockStockItems = () => {
        console.log("editing stock items")
        SetIsEditing(prevState => !prevState)
    }

    // Other header functions
    const loadCSV = () =>{
        console.log("Loading CSV")
    }
    const saveCSV = () =>{
        console.log("Saving CSV")
    }
    const openBarcodeScanner = () =>{
        console.log("Loading barcode scanner")
    }

    return(
        <View style={styles.header}>
            <TouchableOpacity style={styles.iconButtons} onPress={loadCSV}>
                <FontAwesomeIcon
                    icon={faFileImport}
                    size={32}
                    color='blue'
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButtons} onPress={saveCSV}>
                <FontAwesomeIcon
                    icon={faFloppyDisk}
                    size={32}
                    color='green'
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButtons} onPress={editStockStockItems}>
                <FontAwesomeIcon
                    icon={faPenToSquare}
                    size={32}
                    color='orange'
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButtons} onPress={openBarcodeScanner}>
                <FontAwesomeIcon
                    icon={faBarcode}
                    size={32}
                    color='navy'
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        backgroundColor: 'coral',
        flexDirection: 'row',
        height: 50,
        borderRadius: 5
    },
    iconButtons:{
        padding: 5,
        flex: 1,
        alignItems: 'center'
    }
})

export default Header