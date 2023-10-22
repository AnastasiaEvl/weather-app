import rain from "../../public/icons/rain.png"
import sun from '../../public/icons/sun.png'
import clouds from '../../public/icons/cloud.png'
import snow from '../../public/icons/snowflake.png'
import lightning from '../../public/icons/lightning-bolt-.png'
import drizzle from '../../public/icons/drizzle.png'
import fog from '../../public/icons/fog.png'
import smoke from '../../public/icons/smoke.png'
import {IWeather} from "../types/Interface";

export const WeatherConditions: IWeather = {
    Rain: {
        color: '#0341a6',
        title: 'Dont forget umbrella',
        icon: rain
    },
    Clear: {
        color: '#fcb32a',
        title: 'Great weather outside',
        icon: sun
    },
    Thunderstorm: {
        color: '#f55f5f',
        title: 'OMG, a Storm is coming',
        icon: lightning
    },
    Clouds: {
        color: '#6290f6',
        title: 'Magic clouds around',
        icon: clouds
    },

    Snow: {
        color: '#00d2ff',
        title: 'Time to prepare everything for Christmas',
        icon: snow
    },
    Drizzle: {
        color: '#076585',
        title: 'Maybe rainy, maybe no',
        icon: drizzle
    },
    Haze: {
        color: '#66A6FF',
        title: 'Its better to stay at home',
        icon: fog
    },
    Smoke: {
        color: '#3CD3AD',
        title: 'Its better to stay at home',
        icon: smoke
    },
    Mist: {
        color: '#66A6FF',
        title: 'Its better to stay at home',
        icon: fog
    },
};
