import React, {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {EvilIcons} from "@expo/vector-icons";

function Search({navigation}: { navigation: any }) {

    const [cityName, setCityName] = useState<string>('')

    function add(cityName: string): void {
        if (cityName !== '') {
            AsyncStorage.setItem(
                'name', cityName)
            setCityName('')
            navigation.navigate('Selected Region Weather')
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.inputArea}
                placeholder='Enter City Name'
                value={cityName}
                onChangeText={(text) => setCityName(text)}
                showSoftInputOnFocus={false}
                maxLength={10}
                keyboardType="default"
            />
            <TouchableOpacity onPress={() => add(cityName)}>
                <EvilIcons name="search" size={28} color="black" style={{marginBottom: 3}}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: '8%',
        width: '80%',
        flexDirection: 'row',
        marginLeft: 40,
        borderRadius: 10
    },
    inputArea: {
        textTransform: 'uppercase',
        marginRight: 2,
        width: '40%',
        height: '100%'
    },
    primaryText: {
        margin: 20,
        fontSize: 28
    }
});

export default Search
