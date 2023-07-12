import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { theme } from '../theme'
import { debounce } from 'lodash'

import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'

import Sunny from '../assets/svg/sunny.svg'

import Wind from '../assets/svg/wind.svg'
import Drop from '../assets/svg/drop.svg'
import Clock from '../assets/svg/clock.svg'

import { fetchLocations, fetchWeatherForecast } from '../api/weather.js'

import { weatherImages } from '../constants/index';

export default function HomeScreen() {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState({});
  
  const textInputRef = useRef(null); 

  const selectLocation = (location) => {
    console.log('Location: ', location);
    setLocations([]);
    textInputRef.current.clear();
    toggleSearch(false);

    fetchWeatherForecast({
      cityName: location.name,
      days: '7'
    }).then(data => {
      setWeather(data);
    })
  }

  const getLocation = value => {
    if (value.length > 2)
    {
      fetchLocations({cityName: value}).then(data => {
        setLocations(data);
      })
    }
  }

  const handleTextDebounce = useCallback(debounce(getLocation, 1200), []);
  const {current, location} = weather;

  return (
    <SafeAreaView>
      <StatusBar style='dark'/>

      <SafeAreaView>
        {/* Location search box */}
        <View style={styles.container}>
          {
            showSearch ? (
              <TextInput placeholder='Search location' 
                placeholderTextColor={'black'}
                style={styles.searchInput}
                onChangeText={getLocation}
                ref={textInputRef}
              />
            ):null
          }

          <TouchableOpacity style={styles.searchButton}
            onPress={() => toggleSearch(!showSearch)}>
            <Ionicons name='search-outline' style={styles.searchIcon}/>
          </TouchableOpacity>
        </View>

        {/* Location drop down */}
        {
          locations.length > 0 && showSearch? (
            <View style={styles.locationContainer}>
              {
                locations.map((location, index) => {
                  /* Remove bottom border from last item */
                  let isShowBorder = index + 1 != locations.length;
                  let showBorder = isShowBorder ? {borderBottomWidth: "0.3%"} : {}; 

                  return (
                    <TouchableOpacity key={index}
                      style={[styles.locationDropdown, showBorder]}
                      onPress={() => selectLocation(location)}>
                      <Ionicons name='location-outline' style={styles.locationIcon}/>

                      <Text>{location?.name}, {location?.country}</Text>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
          ):null
        }

        {/* Location and weather symbol */}
        <View style={styles.forecastSection}>
          <Text style={styles.locationText}>
            {location?.name}, {location?.country}
          </Text>

          {weatherImages[current?.condition?.text]} 
        </View>

        {/* Celsius and weather forecast text */}
        <View style={styles.statusContainer}>
            <Text style={styles.celsiusText}>{current?.temp_c}°</Text>

            <Text style={styles.weatherText}>{current?.condition?.text}</Text>
        </View>

        {/* Other information */}
        <View style={styles.otherStatusContainer}>
          <View style={styles.statusItem}>
            <Wind width={30} height={30}/>
            <Text style={styles.statusText}>{current?.wind_kph} km</Text>
          </View>

          <View style={styles.statusItem}>
            <Drop width={30} height={30}/>
            <Text style={styles.statusText}>{current?.humidity} %</Text>
          </View>

          <View style={styles.statusItem}>
            <Clock width={30} height={30}/>
            <Text style={styles.statusText}>10:00 AM</Text>
          </View>
        </View>

        {/* Forecast calendar */}
        <View style={{marginEnd: 20}}>
          <View style={styles.dailyForecastContainer}>
            <AntDesign name='calendar' style={{fontSize: "25%"}}/>
            <Text style={styles.dailyForecastText}>Daily forecast</Text>
          </View>

          <ScrollView horizontal
            contentContainerStyle={styles.calendarContainer}
            showsHorizontalScrollIndicator={false}>
            <View style={styles.calendar}>
              <Text style={styles.dayText}>Monday</Text>
              <Sunny width={60} height={60}/>
              <Text style={styles.degreeText}>21°</Text>
            </View>

            <View style={styles.calendar}>
              <Text style={styles.dayText}>Monday</Text>
              <Sunny width={60} height={60}/>
              <Text style={styles.degreeText}>21°</Text>
            </View>

            <View style={styles.calendar}>
              <Text style={styles.dayText}>Monday</Text>
              <Sunny width={60} height={60}/>
              <Text style={styles.degreeText}>21°</Text>
            </View>

            <View style={styles.calendar}>
              <Text style={styles.dayText}>Monday</Text>
              <Sunny width={60} height={60}/>
              <Text style={styles.degreeText}>21°</Text>
            </View>

            <View style={styles.calendar}>
              <Text style={styles.dayText}>Monday</Text>
              <Sunny width={60} height={60}/>
              <Text style={styles.degreeText}>21°</Text>
            </View>

            <View style={styles.calendar}>
              <Text style={styles.dayText}>Monday</Text>
              <Sunny width={60} height={60}/>
              <Text style={styles.degreeText}>21°</Text>
            </View>

            <View style={styles.calendar}>
              <Text style={styles.dayText}>Monday</Text>
              <Sunny width={60} height={60}/>
              <Text style={styles.degreeText}>21°</Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginStart: "5%",
  },

  searchInput: {
    borderBottomWidth: "1.5%",
    fontSize: "20%",
    marginEnd: "5%",
    width: "80%"
  },

  searchButton: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 50,
    marginEnd: "5%"
  },

  searchIcon: {
    color: 'white',
    fontSize: "25%"
  },

  locationContainer: {
    marginStart: "5%",
    marginEnd: "20%",
    borderWidth: "1%",
    marginBottom: "3%"
  },

  locationDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: "3%"
  },

  locationIcon: {
    color: 'black',
    fontSize: "20%",
    marginEnd: "5%"
  },

  forecastSection: {
    alignItems: 'center'
  },

  locationText: {
    fontSize: "25%",
    marginBottom: "5%"
  },

  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginStart: "10%",
    marginEnd: "10%",
    marginTop: "5%"
  },

  celsiusText: {
    fontSize: "60%"
  },

  weatherText: {
    fontSize: "35%",
    fontWeight: "300"
  },

  otherStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: "5%"
  },

  statusItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  statusText: {
    fontSize: "25%",
    fontWeight: "300",
    marginStart: "5%"
  },

  dailyForecastContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: "10%",
    marginStart: "5%"
  },

  dailyForecastText: {
    fontSize: "20%",
    marginStart: "2%"
  },

  calendarContainer: {
    marginTop: "5%",
    marginEnd: 20
  },

  calendar: {
    alignItems: 'center',
    marginStart: 20
  },

  dayText: {
    fontSize: "20%",
    marginBottom: 10
  },

  degreeText: {
    fontSize: "20%",
    marginTop: 10
  }
})