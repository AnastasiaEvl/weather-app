import {FlatList, Image, StyleSheet, Text, View} from "react-native";
import {WeatherConditions} from "../utils/WeatherConditions";
import React from "react";

export const FlatListDays = ({dayList}: { dayList: any }) => {
    return (
        <View style={styles.containerList}>
            <Text style={styles.titleList}>Daily Forecast</Text>
            <FlatList
                style={styles.listDays}
                data={dayList}
                renderItem={({item}) => {
                    const rawDate = item.date
                    const correctDate = new Date(rawDate)
                    const localDate = correctDate.toLocaleDateString('ru-RU', {
                        month: 'long',
                        day: 'numeric'
                    });
                    return (
                        <View style={{
                            borderRadius: 10,
                            backgroundColor: WeatherConditions[item.description].color,
                            margin: 3,
                            width: '95%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingRight: 10,
                            marginLeft: 5,
                            paddingTop: 5,
                            paddingBottom: 5
                        }}>
                            <View style={styles.listImgContainer}>
                                <Image source={WeatherConditions[item.description].icon} style={styles.imgList}/>
                            </View>
                            <Text style={styles.dateList}>{localDate}</Text>
                            <View style={styles.tempContText}><Text
                                style={styles.tempList}>{Math.round(item.avgTemp)}t</Text></View>
                        </View>)
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    containerList: {
        paddingTop: 0,
        marginLeft: 15,
        marginRight: 10,
    },
    titleList: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingLeft: 10,
        paddingTop: 5,
        textAlign: 'center'
    },

    listDays: {
        padding: 2,
        height: 150,
        marginTop: 20
    },
    listImgContainer: {
        backgroundColor: 'white',
        width: 60,
        borderRadius: 10,
        marginLeft: 10
    },
    imgList: {
        height: 50,
        width: 50
    },
    dateList: {
        top: 10,
        fontWeight: 'bold',
        color: 'white',
        fontSize: 15
    },
    tempList: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
    },
    tempContText: {
        marginRight: 10
    }
});
