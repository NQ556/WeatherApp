export const apiKey = 'cbaa1f66c24147b08ae135433231107';

import PartlyCloudy from '../assets/svg/partly_cloudy.svg'
import ModerateRain from '../assets/svg/moderate_rain.svg'
import LightRain from '../assets/svg/light_rain.svg'
import Sunny from '../assets/svg/sunny.svg'
import Cloudy from '../assets/svg/cloudy.svg'
import HeavyRain from '../assets/svg/heavy_rain.svg'

export const weatherImages = {
    'Partly cloudy': <PartlyCloudy width={200} height={208}/>,
    'Moderate rain': <ModerateRain width={200} height={208}/>,
    'Patchy rain possible': <LightRain width={200} height={208}/>,
    'Sunny': <Sunny width={200} height={208}/>,
    'Clear': <Sunny width={200} height={208}/>,
    'Overcast': <Cloudy width={200} height={208}/>,
    'Cloudy': <Cloudy width={200} height={208}/>,
    'Light rain': <LightRain width={200} height={208}/>,
    'Moderate rain at times': <ModerateRain width={200} height={208}/>,
    'Heavy rain': <HeavyRain width={200} height={208}/>,
    'Heavy rain at times': <HeavyRain width={200} height={208}/>,
    'Moderate or heavy freezing rain': <HeavyRain width={200} height={208}/>,
    'Moderate or heavy rain shower': <HeavyRain width={200} height={208}/>,
    'Moderate or heavy rain with thunder': <HeavyRain width={200} height={208}/>,
    'other': <ModerateRain width={200} height={208}/>
}