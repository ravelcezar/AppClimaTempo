import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import debounce from 'lodash.debounce';
import { BRAZILIAN_CITIES } from '../data/brazilianCities';

const CitySearch = ({ onSelectCity }) => {
  const [query, setQuery] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const searchCities = debounce((text) => {
    if (text.length > 1) {
      const filtered = BRAZILIAN_CITIES.filter(city =>
        city.name.toLowerCase().includes(text.toLowerCase()) ||
        city.state.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredCities(filtered);
      setShowDropdown(true);
    } else {
      setFilteredCities([]);
      setShowDropdown(false);
    }
  }, 300);

  useEffect(() => {
    searchCities(query);
    return () => searchCities.cancel();
  }, [query]);

  const handleSelectCity = (city) => {
    setQuery(city.name);
    onSelectCity(city.name);
    setShowDropdown(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Busque por cidade..."
        placeholderTextColor="#ccc"
        value={query}
        onChangeText={setQuery}
        onFocus={() => query.length > 1 && setShowDropdown(true)}
      />
      
      {showDropdown && (
        <View style={styles.dropdown}>
          {filteredCities.length > 0 ? (
            <FlatList
              data={filteredCities}
              keyExtractor={(item) => item.id.toString()}
              keyboardShouldPersistTaps="always"
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => handleSelectCity(item)}
                >
                  <Text style={styles.itemText}>
                    {item.name}, {item.state}
                  </Text>
                </TouchableOpacity>
              )}
            />
          ) : (
            <View style={styles.noResults}>
              <Text style={styles.noResultsText}>Nenhuma cidade encontrada</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    marginHorizontal: 15,
    marginBottom: 15,
  },
  input: {
    height: 50,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  dropdown: {
    maxHeight: 200,
    borderRadius: 10,
    marginTop: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  itemText: {
    fontSize: 16,
    color: '#fff',
  },
  noResults: {
    padding: 15,
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 16,
    color: '#ccc',
  },
});

export default CitySearch;
