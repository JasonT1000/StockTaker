import React, { useEffect, useState } from 'react';
import {
    Alert,
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
import { faFile } from '@fortawesome/free-solid-svg-icons/faFile'

interface Props {
    toggleEditing:any
    openBarcodeScanner:any
    saveCSV:any
    loadCSV:any
    clearAllStockItems:any
  }

function Header({toggleEditing, openBarcodeScanner, saveCSV, loadCSV, clearAllStockItems}:Props)
{
    const [isEditing, SetIsEditing] = useState(false)
    const [showBox, setShowBox] = useState(true);

    // Toggle editing on and off
    useEffect(() => {
        toggleEditing(isEditing)
    }, [isEditing]);

    const editStockStockItems = () => {
        SetIsEditing(prevState => !prevState)
    }

    const showConfirmDialog = () => {
        return Alert.alert(
          "Clear all stock items",
          "Are you sure you want to clear all stock items?",
          [
            {
              text: "Yes",
              onPress: () => {
                clearAllStockItems();
                setShowBox(false);
              },
            },
            {
              text: "No",
            },
          ]
        );
      };

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
            <TouchableOpacity style={styles.iconButtons} onPress={showConfirmDialog}>
                <FontAwesomeIcon
                    icon={faFile}
                    size={32}
                    color='black'
                />
                <Text style={styles.buttonText}>New</Text>
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
        alignItems: 'center',
    },
    buttonText:{
        color: 'black',
    },
})

export default Header