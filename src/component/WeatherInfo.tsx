import React from 'react'
import {Image, StyleSheet, Text, View} from 'react-native'
import {WeatherConditions} from "../utils/WeatherConditions";

export default function WeatherInfo({currentWeatherDetails}: { currentWeatherDetails: any }) {
    let {main: {temp}, weather: [details]} = currentWeatherDetails
    const {main} = details
    return (
        <View style={{
            backgroundColor: WeatherConditions[details.main].color,
            alignItems: 'center',
            borderRadius: 10,
            marginBottom: 20,
            marginTop: 10,
            paddingBottom: 20,
            paddingTop: 10,
            marginLeft: 15,
            width: '90%',
            flexDirection: 'row',
            justifyContent: 'space-between'
        }}>
            <View style={styles.imgContainer}>
                <Image source={WeatherConditions[details.main].icon} style={styles.imgMain}></Image>
            </View>
            <Text style={styles.textSecondary}>{Math.round(temp.toFixed(1))}t </Text>
            <View style={styles.descrContainer}>
                <Text style={styles.weatherDescription}>{main}</Text>
                <Text style={styles.weatherDescriptionSec}>{WeatherConditions[details.main].title}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    weatherInfo: {
        alignItems: 'center',
    },
    weatherIcon: {
        width: 100,
        height: 100
    },
    imgContainer: {
        backgroundColor: 'white',
        width: 75,
        borderRadius: 10,
        marginLeft: 5
    },
    imgMain: {
        height: 70,
        width: 75,
        marginBottom: 5,
        borderRadius: 10
    },
    weatherDescription: {
        fontWeight: 'bold',
        textTransform: 'capitalize',
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    },
    weatherDescriptionSec: {
        fontWeight: 'bold',
        textTransform: 'capitalize',
        fontSize: 15,
        color: 'white',
        paddingTop: 10,
        textAlign: 'center'
    },
    textPrimary: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
        textAlign: "center",
        marginLeft: 5
    },
    textSecondary: {
        fontWeight: 'bold',
        marginTop: 10,
        fontSize: 25,
        color: 'white',
        marginBottom: 10,
        marginLeft: 10
    },
    descrContainer: {
        width: '40%'
    }
})
