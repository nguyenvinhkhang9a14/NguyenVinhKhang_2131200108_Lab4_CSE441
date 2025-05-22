import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { getServiceById, deleteService } from '../services/api';
import { Service } from '../types/Service';

const DetailScreen: React.FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
  const { id } = route.params;
  const [service, setService] = useState<Service | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getServiceById(id);
      setService(data);
    })();
  }, [id]);

  const handleDelete = () => {
    Alert.alert('Warning', 'Are you sure you want to remove this service?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'DELETE', style: 'destructive', onPress: async () => {
          await deleteService(id);
          navigation.navigate('Home');
        }
      }
    ]);
  };

  if (!service) {return <Text>Loading...</Text>;}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Service name: {service.name}</Text>
      <Text>Price: {service.price} đ</Text>
      <Text>Creator: {service.creator}</Text>
      <Text>Time: {new Date(service.createdAt).toLocaleString()}</Text>
      <Text>Final update: {new Date(service.updatedAt).toLocaleString()}</Text>

      <View style={styles.actions}>
        <Button title="Edit" onPress={() => navigation.navigate('EditService', { service })} />
        <Button title="Delete" onPress={handleDelete} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
});

export default DetailScreen;
