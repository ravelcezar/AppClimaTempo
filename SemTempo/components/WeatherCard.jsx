import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // ou 'react-native-vector-icons/MaterialCommunityIcons'

const getWeatherIcon = (condition) => {
  switch (condition.toLowerCase()) {
    case 'clear_day':
    case 'clear':
      return 'weather-sunny';
    case 'cloudly_day':
    case 'cloud':
    case 'cloudly':
      return 'weather-partly-cloudy';
    case 'rain':
      return 'weather-rainy';
    case 'storm':
      return 'weather-lightning';
    case 'snow':
      return 'weather-snowy';
    case 'fog':
      return 'weather-fog';
    default:
      return 'weather-cloudy';
  }
};

const WeatherCard = ({ city, temperature, condition, maxTemp, minTemp, precipitation, windSpeed }) => {
  const iconName = getWeatherIcon(condition);

  return (
    <View style={styles.card}>
      <Text style={styles.city}>{city}</Text>
      <MaterialCommunityIcons name={iconName} size={48} color="#555" style={{ marginBottom: 10 }} />
      <Text style={styles.temperature}>{temperature}°</Text>
      <Text style={styles.condition}>{condition}</Text>

      <View style={styles.detailsRow}>
        <Text style={styles.detailLabel}>Precipitação</Text>
        <Text style={styles.detailValue}>{precipitation}%</Text>
      </View>

      <View style={styles.tempRow}>
        <Text style={styles.tempLabel}>Max.: {maxTemp}°</Text>
        <Text style={styles.tempLabel}>Min.: {minTemp}°</Text>
      </View>

      <View style={styles.detailsRow}>
        <Text style={styles.detailLabel}>Vento</Text>
        <Text style={styles.detailValue}>{windSpeed}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    padding: 20,
    margin: 15,
    alignItems: 'center',
  },
  city: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  condition: {
    fontSize: 18,
    marginBottom: 15,
    color: '#555',
    textTransform: 'capitalize',
  },
  tempRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
  },
  tempLabel: {
    fontSize: 16,
    color: '#555',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 5,
  },
  detailLabel: {
    fontSize: 16,
    color: '#555',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WeatherCard;