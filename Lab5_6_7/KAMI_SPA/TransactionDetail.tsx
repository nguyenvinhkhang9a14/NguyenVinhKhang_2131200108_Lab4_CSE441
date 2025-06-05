import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {deleteTransaction} from '../services/api';

const TransactionDetailScreen = ({route}: any) => {
  const {transaction} = route.params;
  const navigation = useNavigation();
  const customer = transaction.customer;
  const services = transaction.services || [];

  const [menuVisible, setMenuVisible] = useState(false);

  const total = services.reduce(
    (sum: number, s: {price: any; quantity: any}) =>
      sum + (s.price || 0) * (s.quantity || 1),
    0,
  );
  const discount = transaction.discountAmount || 0;
  const finalAmount = total - discount;

  const handleDelete = async () => {
    try {
      await deleteTransaction(transaction._id);
      Alert.alert('Success', 'Transaction deleted');
      navigation.goBack();
    } catch (err: any) {
      console.error('Delete failed:', err.response?.data || err.message);
      Alert.alert('Error', 'Failed to delete transaction');
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => setMenuVisible(true)}
          style={{marginRight: 16}}>
          <Icon name="more-vert" size={24} color="#000000" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <Text style={styles.sectionTitle}>General information</Text>
        <View style={styles.card}>
          <Text>Transaction code: {transaction._id}</Text>
          <Text>
            Customer: {customer?.name} - {customer?.phone}
          </Text>
          <Text>
            Creation time: {new Date(transaction.createdAt).toLocaleString()}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Services list</Text>
        <View style={styles.card}>
          {services.map((s: any, idx: number) => (
            <View key={idx} style={styles.serviceRow}>
              <View style={styles.costRow}>
                <Text>{s.name}</Text>
                <Text>{(s.price || 0).toLocaleString()} đ</Text>
              </View>
              <View style={styles.costRow}>
                <Text >Quantity</Text>
                <Text> x{s.quantity || 1}</Text>
              </View>
            </View>
          ))}
          <View style={styles.totalRow}>
            <Text style={{fontWeight: 'bold'}}>Total</Text>
            <Text>{total.toLocaleString()} đ</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Cost</Text>
        <View style={styles.card}>
          <View style={styles.costRow}>
            <Text>Amount of money</Text>
            <Text>{total.toLocaleString()} đ</Text>
          </View>
          <View style={styles.costRow}>
            <Text>Discount</Text>
            <Text>- {discount.toLocaleString()} đ</Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={{fontWeight: 'bold'}}>Total payment</Text>
            <Text style={{color: 'red', fontWeight: 'bold'}}>
              {finalAmount.toLocaleString()} đ
            </Text>
          </View>
        </View>
      </ScrollView>

      <Modal
        transparent
        animationType="fade"
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}>
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setMenuVisible(false)}>
          <View style={styles.menu}>
            <TouchableOpacity style={styles.menuItem}>
              <Text>See more details</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleDelete}>
              <Text>Cancel transaction</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default TransactionDetailScreen;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 6,
    color: '#e91e63',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    elevation: 2,
    marginBottom: 10,
  },
  serviceRow: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  totalRow: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 8,
  },
  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderTopWidth: 1,
    paddingTop: 8,
    borderTopColor: '#ccc',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 50,
    paddingRight: 10,
  },
  menu: {
    width: 180,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 8,
    elevation: 5,
  },
  menuItem: {
    padding: 12,
  },
});
