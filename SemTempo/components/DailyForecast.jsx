import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DailyForecast = ({ data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="calendar-month-outline" size={20} color="#fff" />
        <Text style={styles.title}>Next Forecast</Text>
      </View>

      {data.map((day, index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.day}>{day.day}</Text>
          <Icon
            name={index === 0 ? 'weather-pouring' : 'weather-lightning-rainy'}
            size={22}
            color="#fff"
          />
          <View style={styles.tempBox}>
            <Text style={styles.tempMax}>{day.maxTemp}°</Text>
            <Text style={styles.tempMin}>{day.minTemp}°</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#205295',
    borderRadius: 20,
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  day: {
    fontSize: 16,
    color: '#fff',
    flex: 1,
  },
  tempBox: {
    flexDirection: 'row',
    gap: 10,
    width: 70,
    justifyContent: 'flex-end',
  },
  tempMax: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  tempMin: {
    fontSize: 16,
    color: '#ddd',
  },
});

export default DailyForecast;
