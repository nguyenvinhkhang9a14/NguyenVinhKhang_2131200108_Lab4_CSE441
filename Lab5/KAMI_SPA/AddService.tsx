import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { addService } from '../services/api';

const AddServiceScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleAdd = async () => {
    if (!name || !price) {
      Alert.alert('Validation', 'Please fill all fields');
      return;
    }
    try {
      await addService(name, price);
      Alert.alert('Success', 'Service added');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to add service');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Input a service name *"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />
       <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    borderColor: '#ccc',
  },
   button: {
    padding: 10,
    backgroundColor: '#E34C66', 
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddServiceScreen;
