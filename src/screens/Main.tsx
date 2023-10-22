import {StatusBar} from "expo-status-bar";
import React, {useEffect, useState} from "react";
import {ActivityIndicator, ImageBackground, StyleSheet, Text, View} from "react-native";
import * as Location from "expo-location";
import _ from 'lodash';
import {PickerList} from "../component/PickerList";
import WeatherInfo from '../component/WeatherInfo';
import Search from "../component/Search";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo, {NetInfoSubscription} from "@react-native-community/netinfo";
import {BASE_URL, WEATHER_API_KEY} from "../api/api";
import {FlatListHour} from "../component/FlatListHour";
import {FlatListDays} from "../component/FlatListDays";
import weather from "../../public/icons/weather.png";

export default function Main({navigation}: { navigation: any }) {
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [country, setCountry] = useState<string>('')
    const [currentWeather, setCurrentWeather] = useState<any>(null);
    const [conditions, setConditions] = useState<any>()
    const [hourWeather, setHourWeather] = useState<any>()
    const [currentWeatherDetails, setCurrentWeatherDetails] = useState<any>(null);
    const [unitsSystem, setUnitsSystem] = useState<string>('metric')
    const [weatherData, setWeatherData] = useState<any>(null)
    const [isConnected, setConnected] = useState<boolean>(false)

    useEffect((): void => {
        getCurrentWeather();
    }, [unitsSystem]);

    async function getCurrentWeather() {
        setCurrentWeatherDetails(null)
        setCurrentWeather(null)
        setErrorMessage('')
        setWeatherData(null)

        const unsubscribe: NetInfoSubscription = NetInfo.addEventListener(state => {
            if (!state.isConnected) {
                setConnected(true)
            }
        });

        try {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status != "granted") {
                setErrorMessage("Access is needed to run the app");
            }
            const location = await Location.getCurrentPositionAsync();
            const {latitude, longitude} = location.coords
            const weatherUrl = `${BASE_URL}weather?lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`;
            const hoursUrl = `${BASE_URL}forecast?lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`
            const response = await fetch(weatherUrl)
            const time = await fetch(hoursUrl)
            const commonWeatherInf = await response.json()
            let hourDayWeather = await time.json()
            if (response.ok) {
                try {
                    await AsyncStorage.setItem('weatherInf', JSON.stringify(commonWeatherInf))
                    await AsyncStorage.setItem('hourDayWeather', JSON.stringify(hourDayWeather))
                    await AsyncStorage.setItem('unit', unitsSystem)
                } catch (error) {
                    console.error(error)
                }
                try {
                    const savedUser = await AsyncStorage.getItem('weatherInf');
                    const savedDays = await AsyncStorage.getItem('hourDayWeather')
                    setCurrentWeather(isConnected ? commonWeatherInf : savedUser)
                    setHourWeather(isConnected ? hourDayWeather.list : savedDays)
                } catch (error) {
                    console.error(error);
                }
                setCountry(commonWeatherInf.sys.country)
                setConditions(commonWeatherInf.weather[0].main)
                setHourWeather(hourDayWeather.list)
                hourDayWeather.list.reduce((acc, elem) => {
                    elem.dt_txt = elem.dt_txt.slice(0, 10)
                }, [])
                const groupedArrWeather = _.groupBy(hourDayWeather.list, 'dt_txt')
                const keys = _.keys(groupedArrWeather)
                const daysList: any[] = []
                keys.map((dateKey) => {
                    const dayInformationList = _.get(groupedArrWeather, dateKey)
                    let avgTemp = 0;
                    let desc = null
                    dayInformationList.map((e) => {
                        avgTemp += e.main.temp
                        desc = e.weather[0].main
                    })
                    const averageDayWeather = avgTemp / dayInformationList.length
                    const dailyWeather = {
                        avgTemp: averageDayWeather.toFixed(1),
                        date: dateKey,
                        description: desc
                    }
                    daysList.push(dailyWeather)
                })
                setWeatherData(daysList)
                setCurrentWeatherDetails(commonWeatherInf)
            } else {
                setErrorMessage(commonWeatherInf.message)
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    const updateData = (name: string) => {
        setUnitsSystem(name)
    }

    if (currentWeatherDetails) {
        return (
            <View style={styles.container}>
                <ImageBackground source={weather} resizeMode="cover" style={styles.container}>
                    <PickerList updateData={updateData} selectedValue={unitsSystem}/>
                    <Text style={styles.title}>
                        Your location:{country}</Text>
                    <WeatherInfo currentWeatherDetails={currentWeatherDetails}/>
                    <Search navigation={navigation}/>
                    <FlatListHour data={hourWeather.slice(0, 7)}/>
                    <FlatListDays dayList={weatherData}/>
                </ImageBackground>
            </View>
        );
    } else if (errorMessage) {
        return (
            <View style={styles.container}>
                <Text>{errorMessage}</Text>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color='blue'/>
                <StatusBar style="auto"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: '#c9e9ff',
    },

    title: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'black'
    },
    main: {
        flex: 0.3,
        justifyContent: "center",
        paddingBottom: 30
    }
});
