import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { getCustomerById, updateCustomer } from '../services/api';
import { Customer } from '../types/Customer';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  route: RouteProp<{ params: { id: string } }, 'params'>;
  navigation: any;
};

const EditCustomerScreen: React.FC<Props> = ({ route, navigation }) => {
  const { id } = route.params;
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

useEffect(() => {
  const fetchCustomer = async () => {
    const data = await getCustomerById(id); 
    setCustomer(data);
    setName(data.name);
    setPhone(data.phone);
  };
  fetchCustomer();
}, [id]);

  const handleUpdate = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      Alert.alert('Error', 'No login token found');
      return;
    }

    await updateCustomer(id, { name, phone }, token);
    Alert.alert('Success', 'Customer updated successfully!');
    navigation.goBack();
  } catch (err: any) {
    console.error('Update failed:', err.response?.data || err.message);
    Alert.alert('Error', 'Failed to update customer');
  }
};

  if (!customer) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Customer</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditCustomerScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: '#E91E63' },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10,
    borderRadius: 8, marginBottom: 15,
  },
  button: {
    backgroundColor: '#E91E63', padding: 15, borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
