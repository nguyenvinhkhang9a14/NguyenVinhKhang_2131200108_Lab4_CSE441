// screens/Transaction.tsx

import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {getTransactions} from '../services/api';
import {Transaction} from '../types/Transaction';

const TransactionScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTransactions();

      setTransactions(data);
    };

    const unsubscribe = navigation.addListener('focus', fetchData);
    return unsubscribe;
  }, [navigation]);
  const renderItem = ({item}: {item: Transaction}) => {
    const customerName = item.customer?.name || 'N/A';
    const serviceName = item.services?.[0]?.name || 'N/A';
    const amount = item.priceBeforePromotion ?? 'N/A';
    const date = item.createdAt
      ? new Date(item.createdAt).toLocaleDateString()
      : 'N/A';

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          navigation.navigate('TransactionDetail', {transaction: item})
        }>
        <Text style={styles.textBold}>Customer: {customerName}</Text>
        <Text>Service: {serviceName}</Text>
        <Text>
          Amount:{' '}
          {typeof amount === 'number' ? amount.toLocaleString() + ' đ' : 'N/A'}
        </Text>
        <Text>Date: {date}</Text>
      </TouchableOpacity>
    );
  };    

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction History</Text>
      <FlatList
        data={transactions}
        keyExtractor={item => item._id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
  title: {fontSize: 20, fontWeight: 'bold', marginBottom: 10,  marginTop:30,color: '#e91e63',},
  item: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textBold: {
    fontWeight: 'bold',
  },
});

export default TransactionScreen;
