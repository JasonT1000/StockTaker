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

interface Props {
    toggleEditing:any
    openBarcodeScanner:any
    saveCSV:any
    loadCSV:any
  }

function Header({toggleEditing, openBarcodeScanner, saveCSV, loadCSV}:Props)
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

    return(
        <View style={styles.header}>
            <TouchableOpacity style={styles.iconButtons} onPress={loadCSV}>
                <FontAwesomeIcon
                    icon={faFileImport}
                    size={32}
                    color='blue'
                />
                <Text style={styles.buttonText}>Load</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButtons} onPress={saveCSV}>
                <FontAwesomeIcon
                    icon={faFloppyDisk}
                    size={32}
                    color='green'
                />
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButtons} onPress={editStockStockItems}>
                <FontAwesomeIcon
                    icon={faPenToSquare}
                    size={32}
                    color='coral'
                />
                <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButtons} onPress={openBarcodeScanner}>
                <FontAwesomeIcon
                    icon={faBarcode}
                    size={32}
                    color='navy'
                />
                <Text style={styles.buttonText}>Scanner</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        backgroundColor: 'white',
        flexDirection: 'row',
        height: 60,
        borderRadius: 5
    },
    iconButtons:{
        padding: 5,
        flex: 1,
        alignItems: 'center'
    },
    buttonText:{
        color: 'black',
    },
})

export default Header