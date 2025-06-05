import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, Modal
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { getCustomerById, deleteCustomer,getTransactionsByCustomer  } from '../services/api';
import { Customer } from '../types/Customer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Transaction } from '../types/Transaction';




type Props = {
  route: RouteProp<{ params: { id: string } }, 'params'>;
  navigation: any;
};

const CustomerDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { id } = route.params;
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

useEffect(() => {
  const fetchData = async () => {
    try {
      const [customerData, customerTransactions] = await Promise.all([
        getCustomerById(id),
        getTransactionsByCustomer(id),
      ]);
      setCustomer(customerData);
      setTransactions(customerTransactions);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, [id]);


  const handleDelete = async () => {
    try {
      await deleteCustomer(id);
      setConfirmVisible(false);
      navigation.goBack();
    } catch (err) {
      Alert.alert('Error', 'Failed to delete customer');
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#E91E63" style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Customer detail</Text>
        <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
          <Icon name="more-vert" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {menuVisible && (
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => navigation.navigate('EditCustomer', { id })}>
            <Text style={styles.menuItem}> Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setMenuVisible(false);
            setConfirmVisible(true);
          }}>
            <Text style={styles.menuItem}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>General information</Text>
        <Text><Text style={styles.label}>Name:</Text> {customer?.name}</Text>
        <Text><Text style={styles.label}>Phone:</Text> {customer?.phone}</Text>
        <Text><Text style={styles.label}>Total spent:</Text> <Text style={styles.money}>{customer?.totalSpent?.toLocaleString()} đ</Text></Text>
        <Text><Text style={styles.label}>Time:</Text> </Text>
        <Text><Text style={styles.label}>Last update:</Text> </Text>
      </View>

  <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Transaction history</Text>
{transactions.length === 0 ? (
  <Text>No transaction...</Text>
) : (
  transactions.map(t => (
    <View key={t._id} style={styles.transactionCard}>
      <Text style={styles.transactionId}>
        {t._id} - {formatDate(t.createdAt)}
      </Text>
      {t.services?.map(s => (
        <Text key={s._id}>
          • {s.name} - {s.price.toLocaleString()} đ x {s.quantity}
        </Text>
      ))}
      <Text style={styles.total}>
        {t.services?.reduce((sum, s) => sum + s.price * s.quantity, 0).toLocaleString()} đ
      </Text>
    </View>
  ))
)}


      {/* Confirm delete modal */}
      <Modal visible={confirmVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text>Are you sure to remove this client?</Text>
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setConfirmVisible(false)}><Text>Cancel</Text></TouchableOpacity>
              <TouchableOpacity onPress={handleDelete}><Text style={{ color: 'red' }}>Delete</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const formatDate = (iso: string) => {
  const date = new Date(iso);
  return `${date.getDate().toString().padStart(2, '0')}/${
    (date.getMonth() + 1).toString().padStart(2, '0')
  }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#E91E63', padding: 10, borderRadius: 8 },
  title: { fontSize: 18, color: '#fff' },
  menu: { position: 'absolute', top:20,right: 20, backgroundColor: '#fff', elevation: 100,flex:2, borderRadius: 6, padding: 18,zIndex:100 },
  menuItem: { paddingVertical: 5 },
  sectionTitle: { fontWeight: 'bold', color: '#e91e63', fontSize: 16, marginBottom: 8 },
  label: { fontWeight: 'bold' },
  card: { backgroundColor: '#f9f9f9', padding: 15, borderRadius: 8  },
  transactionCard: { backgroundColor: '#f3f3f3', padding: 10, marginVertical: 5, borderRadius: 6 },
  transactionId: { fontWeight: 'bold' },
  total: { textAlign: 'right', fontWeight: 'bold', color: '#e91e63' },
  money: { color: '#e91e63', fontWeight: 'bold' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)' },
  modalBox: { backgroundColor: '#fff', padding: 20, borderRadius: 10 },
  modalActions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 },
});

export default CustomerDetailScreen;
