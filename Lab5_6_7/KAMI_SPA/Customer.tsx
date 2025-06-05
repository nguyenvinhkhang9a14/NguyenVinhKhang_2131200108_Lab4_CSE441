import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {getCustomers} from '../services/api';
import {Customer} from '../types/Customer';
import {useIsFocused} from '@react-navigation/native';

const CustomerScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const isFocused = useIsFocused(); // để reload khi quay về

  useEffect(() => {
    const fetchCustomers = async () => {
      const data = await getCustomers();
      setCustomers(data);
    };
    if (isFocused) fetchCustomers();
  }, [isFocused]);

  const renderItem = ({item}: {item: Customer}) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() => navigation.navigate('CustomerDetail', { id: item._id })}
  >
    <Text style={styles.textBold}>
      Customer: <Text style={styles.textNormal}>{item.name}</Text>
    </Text>
    <Text>Phone: {item.phone}</Text>
    <Text>
      Total money:{' '}
      <Text style={styles.money}>{item.totalSpent.toLocaleString()} đ</Text>
    </Text>
    <Text style={styles.loyalty}>
      {item.loyalty === 'member' ? 'Member' : 'Guest'}
    </Text>
  </TouchableOpacity>
);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer</Text>
      <FlatList
        data={customers}
        keyExtractor={item => item._id}
        renderItem={renderItem}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddCustomer')}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomerScreen;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
  title: {fontSize: 20, fontWeight: 'bold', marginBottom: 10,  marginTop:30,color: '#e91e63'},
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
  },
  textBold: {fontWeight: 'bold'},
  textNormal: {fontWeight: 'normal'},
  money: {color: '#E34C66', fontWeight: 'bold'},
  loyalty: {color: '#E34C66', position: 'absolute', right: 15, top: 15},
  addButton: {
    backgroundColor: '#E34C66',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    bottom: 30,
  },
  addButtonText: {fontSize: 24, color: '#fff'},
});
