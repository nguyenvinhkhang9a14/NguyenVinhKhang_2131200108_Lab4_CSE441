import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { updateService } from '../services/api';
import { Service } from '../types/Service';

const EditServiceScreen: React.FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
  const { service }: { service: Service } = route.params;
  const [name, setName] = useState(service.name);
  const [price, setPrice] = useState(service.price.toString());

  const handleUpdate = async () => {
    try {
      await updateService(service._id, name, price);
      Alert.alert('Success', 'Service updated');
      navigation.goBack();
    } catch (err) {
      Alert.alert('Error', 'Failed to update');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Service name"
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
      <Button title="Update" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10,
    marginBottom: 15, borderRadius: 5,
  },
});

export default EditServiceScreen;
