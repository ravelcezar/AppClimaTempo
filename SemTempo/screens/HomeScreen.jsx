import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList, SafeAreaView, Text, Image } from 'react-native';
import WeatherCard from '../components/WeatherCard';
import HourlyForecast from '../components/HourlyForecast';
import DailyForecast from '../components/DailyForecast';
import CitySearch from '../components/CitySearch';
import { getWeatherData } from '../services/weatherService';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Recife');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWeather(selectedCity);
  }, [selectedCity]);

  const fetchWeather = async (city) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getWeatherData(city);
      if (data && data.results) {
        setWeatherData(data.results);
      } else {
        setError('Dados meteorológicos não encontrados');
      }
    } catch (error) {
      console.error(error);
      setError('Erro ao buscar dados do clima');
    } finally {
      setLoading(false);
    }
  };

  const getHourlyData = () => {
    if (!weatherData || !weatherData.forecast) return [];
    return [
      { time: '15:00', temperature: weatherData.temp + 1 },
      { time: '16:00', temperature: weatherData.temp - 2 },
      { time: '17:00', temperature: weatherData.temp - 4 },
      { time: '18:00', temperature: weatherData.temp - 5 },
    ];
  };

  const dailyData = weatherData?.forecast?.slice(0, 2).map((item) => ({
    day: item.weekday,
    maxTemp: item.max,
    minTemp: item.min,
  })) || [];

  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleString('default', { month: 'short' })} ${currentDate.getDate()}`;

  return (
    <LinearGradient colors={['#1E3C72', '#2A5298']} style={styles.container}>
      <SafeAreaView>
        <FlatList
          data={[1]}
          keyExtractor={() => 'weather-app'}
          renderItem={() => null}
          ListHeaderComponent={
            <>
              <View style={styles.headerRow}>
                <View style={styles.locationRow}>
                  <Icon name="map-marker" size={22} color="#fff" />
                  <Text style={styles.headerText}>{selectedCity}</Text>
                  <Icon name="chevron-down" size={22} color="#fff" />
                </View>
                <Icon name="bell-outline" size={22} color="#fff" />
              </View>

              <CitySearch onSelectCity={setSelectedCity} />

              {loading && (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#fff" />
                </View>
              )}

              {error && (
                <Text style={styles.errorText}>{error}</Text>
              )}

              {weatherData && (
                <>
                  <View style={styles.weatherBox}>
                    <Text style={styles.cityText}>{weatherData.city || selectedCity}</Text>

                    <Image
                      source={require('../assets/icons/sun.png')}
                      style={styles.weatherIcon}
                      resizeMode="contain"
                    />

                    <Text style={styles.tempText}>{weatherData.temp || '--'}°</Text>
                    <Text style={styles.conditionText}>{weatherData.description || 'Ensolarado'}</Text>

                    <Text style={styles.precipitationText}>Precipitação</Text>

                    <View style={styles.tempRow}>
                      <Text style={styles.tempLabel}>Max.: {weatherData.forecast?.[0]?.max || '--'}°</Text>
                      <Text style={styles.tempLabel}>Min.: {weatherData.forecast?.[0]?.min || '--'}°</Text>
                    </View>

                    <Text style={styles.windText}>Vento: {weatherData.wind_speedy || '--'}</Text>
                  </View>

                  <View style={styles.infoRow}>
                    <Text style={styles.infoItem}>🌧️ {weatherData.rain || 0}%</Text>
                    <Text style={styles.infoItem}>💧 {weatherData.humidity || 0}%</Text>
                    <Text style={styles.infoItem}>🌬️ {weatherData.wind_speedy || '--'}</Text>
                  </View>

                  <HourlyForecast 
                    data={getHourlyData()} 
                    date={formattedDate} 
                  />

                  <DailyForecast data={dailyData} />
                </>
              )}
            </>
          }
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  errorText: {
    textAlign: 'center',
    margin: 15,
    color: 'red',
    fontSize: 16,
  },
  headerRow: {
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    color: '#fff',
    marginHorizontal: 5,
  },
  weatherBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 12,
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  weatherIcon: {
    width: 80,
    height: 80,
    marginVertical: 10,
  },
  cityText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  tempText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  conditionText: {
    fontSize: 18,
    color: '#eee',
    marginVertical: 5,
  },
  precipitationText: {
    color: '#ccc',
    marginTop: 10,
    fontSize: 14,
  },
  tempRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  tempLabel: {
    fontSize: 16,
    color: '#fff',
  },
  windText: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    marginHorizontal: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
  },
  infoItem: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HomeScreen;
