import React, { useEffect, useState } from 'react';
import {
    Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPenToSquare, faBarcode, faFile, faFileExport, faFileDownload, faUpload } from '@fortawesome/free-solid-svg-icons'

interface Props {
    toggleEditing:any
    toggleInputModal: any
    openBarcodeScanner:any
    saveCSV:any
    loadCSV:any
    clearAllStockItems:any
}

function Header({toggleEditing, toggleInputModal, openBarcodeScanner, saveCSV, loadCSV, clearAllStockItems}:Props)
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

    const showNewStocktakeConfirmDialog = () => {
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
                    icon={faFileDownload}
                    size={32}
                    color='blue'
                />
                <Text style={styles.buttonText}>Load</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButtons} onPress={saveCSV}>
                <FontAwesomeIcon
                    icon={faFileExport}
                    size={32}
                    color='green'
                />
                <Text style={styles.buttonText}>Export</Text>
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
                <Text style={styles.buttonText}>Scan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButtons} onPress={showNewStocktakeConfirmDialog}>
                <FontAwesomeIcon
                    icon={faFile}
                    size={32}
                    color='#1E3050'
                />
                <Text style={styles.buttonText}>New</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButtons} onPress={() => toggleInputModal()}>
                <FontAwesomeIcon
                    icon={faUpload}
                    size={32}
                    color='#1E3050'
                />
                <Text style={styles.buttonText}>Upload</Text>
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