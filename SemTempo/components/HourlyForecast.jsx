import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HourlyForecast = ({ data, date }) => {
  const currentHour = new Date().getHours();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="clock-outline" size={20} color="#fff" />
        <Text style={styles.sectionTitle}>Today • {date}</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hourlyContainer}>
        {data.map((hour, index) => {
          const isActive = new Date().getHours() === parseInt(hour.time.split(':')[0]);

          return (
            <View key={index} style={[styles.hourItem, isActive && styles.activeHour]}>
              <Text style={styles.temp}>{hour.temperature}°C</Text>
              <Icon name="weather-partly-cloudy" size={24} color="#fff" />
              <Text style={styles.time}>{hour.time}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#205295',
    borderRadius: 20,
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 10,
  },
  hourlyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  hourItem: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginRight: 10,
  },
  activeHour: {
    borderColor: '#fff',
    borderWidth: 1.5,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  temp: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  time: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
  },
});

export default HourlyForecast;
