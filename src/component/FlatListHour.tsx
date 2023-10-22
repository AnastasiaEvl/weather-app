import {FlatList, Image, StyleSheet, Text, View} from "react-native";
import React from "react";
import {WeatherConditions} from "../utils/WeatherConditions";

export const FlatListHour = ({data}: { data: any }) => {
    return (
        <View>
            <Text style={styles.titleList}>Hourly Forecast</Text>
            <FlatList horizontal
                      style={styles.listHour}
                      data={data}
                      keyExtractor={(acc, index) => index.toString()}
                      renderItem={(hour) => {
                          const weather = hour.item.weather[0];
                          const dt = new Date(hour.item.dt * 1000);
                          return <View style={{
                              borderRadius: 10,
                              backgroundColor: WeatherConditions[weather.main].color,
                              padding: 3,
                              margin: 3,
                              width: 100,
                          }}>
                              <View style={styles.imgListContainer}>
                                  <Image source={WeatherConditions[weather.main].icon}
                                         style={styles.imgListHour}></Image>
                              </View>
                              <Text style={styles.dateList}>
                                  {dt.toLocaleTimeString('ru-RU').replace(/:\d+/, ' ')}
                              </Text>
                              <Text style={styles.tempListHour}>{Math.round(hour.item.main.temp)}t</Text>
                              <Text style={styles.descriptionList}>{weather.main}</Text>
                          </View>
                      }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    titleList: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingLeft: 10,
        paddingTop: 5,
        textAlign: 'center'
    },
    listHour: {
        padding: 2,
        height: 150,
        marginTop: 5
    },
    dateList: {
        textAlign: 'center',
        paddingTop: 10,
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
    },
    tempListHour: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white'
    },
    descriptionList: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white'
    },
    imgListHour: {
        height: 35,
        width: 35,
    },
    imgListContainer: {
        backgroundColor: 'white',
        width: 40,
        borderRadius: 10,
        height: 30
    }
});
