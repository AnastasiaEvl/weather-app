import {ActivityIndicator, ImageBackground, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'
import weather from '../../public/icons/weather.png'
import {BASE_URL, WEATHER_API_KEY} from "../api/api";
import {StatusBar} from "expo-status-bar";

export function CityWeather(): React.JSX.Element {
    const [weatherData, setWeatherData] = useState<any>(null)
    const [description, setDescription] = useState<any>(null)
    const [additional, setAdditional] = useState<any>('')
    const [hourlyInf, setHourlyInf] = useState<string>('')

    useEffect(() => {
        getData()
    }, []);

    async function getData(): Promise<void> {
        let value = await AsyncStorage.getItem('name');
        let unit = await AsyncStorage.getItem('unit');
        await fetchWeatherData(value, unit)
    }

    async function fetchWeatherData(value: string | null, unit: string | null): Promise<void> {
        const API = `${BASE_URL}weather?q=${value}&units=${unit}&appid=${WEATHER_API_KEY}`
        try {
            const response = await fetch(API);
            if (response.status == 200) {
                const data = await response.json();
                setDescription(data.name)
                setWeatherData(data.main.temp)
                setAdditional(data.weather[0].description)
                setHourlyInf(data.weather[0].main)
            } else {
                setWeatherData(null);
            }
        } catch (error) {
            console.error(error);
        }
    }

    if (weatherData) {
        return (
            <View style={styles.container}>
                <ImageBackground source={weather} resizeMode="cover" style={styles.container}>
                    <View style={styles.tempInf}>
                        <Text style={styles.tempText}>
                            {Math.round(weatherData)}t
                        </Text>
                        <Text style={styles.tempDescription}>
                            {description}
                        </Text>
                        <Text style={styles.tempLocation}>
                            {hourlyInf}
                        </Text>
                        <Text style={styles.tempAdditional}>
                            {additional}
                        </Text>
                    </View>
                </ImageBackground>
            </View>)
    } else {
        return (
            <View style={styles.container}>
                <ImageBackground source={weather} resizeMode="cover" style={styles.container}>
                    <ActivityIndicator size="large" color='blue'/>
                    <StatusBar style="auto"/>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tempInf: {
        backgroundColor: 'rgba(205, 214, 219, 0.6)',
        borderRadius: 10,
        width: '90%',
        marginLeft: 25,
        marginTop: 200,
        padding: 20
    },
    tempText: {
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30
    },
    tempDescription: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        paddingTop: 20
    },
    tempLocation: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
        paddingTop: 20
    },
    tempAdditional: {
        color: 'black',
        fontSize: 15,
        textAlign: 'center',
        paddingTop: 20
    }
});
