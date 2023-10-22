import React from 'react'
import Main from './src/screens/Main';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CityWeather} from './src/screens/CityWeather'

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='WeatherApp' component={Main}/>
                <Stack.Screen name='Selected Region Weather' component={CityWeather}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
