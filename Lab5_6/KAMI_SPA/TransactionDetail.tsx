import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

const TransactionDetailScreen = ({route}: any) => {
  const {transaction} = route.params;
  const customer = transaction.customer;
  const services = transaction.services || [];

  // Tổng tiền trước giảm giá (nếu chưa tính sẵn)
  const total = services.reduce(
    (sum: number, s: {price: any; quantity: any}) =>
      sum + (s.price || 0) * (s.quantity || 1),
    0,
  );

  const discount = transaction.discountAmount || 0;
  const finalAmount = total - discount;

  return (
    <ScrollView style={styles.container}>
      {/* General Info */}
      <Text style={styles.sectionTitle}>General information</Text>
      <View style={styles.card}>
        <Text>Transaction code: {transaction.id}</Text>
        <Text>
          Customer: {customer?.name} - {customer?.phone}
        </Text>
        <Text>
          Creation time: {new Date(transaction.createdAt).toLocaleString()}
        </Text>
      </View>

      {/* Services List */}
      <Text style={styles.sectionTitle}>Services list</Text>
      <View style={styles.card}>
        {services.map((s: any, idx: number) => (
          <View key={idx} style={styles.serviceRow}>
            <Text style={{flex: 1}}>{s.name}</Text>
            <Text>x{s.quantity || 1}</Text>
            <Text>{(s.price || 0).toLocaleString()} đ</Text>
          </View>
        ))}
        <View style={styles.totalRow}>
          <Text style={{fontWeight: 'bold'}}>Total</Text>
          <Text>{total.toLocaleString()} đ</Text>
        </View>
      </View>

      {/* Cost Section */}
      <Text style={styles.sectionTitle}>Cost</Text>
      <View style={styles.card}>
        <View style={styles.costRow}>
          <Text>Amount of money</Text>
          <Text>{total.toLocaleString()} đ</Text>
        </View>
        <View style={styles.costRow}>
          <Text>Discount</Text>
          <Text>-{discount.toLocaleString()} đ</Text>
        </View>
        <View style={styles.paymentRow}>
          <Text style={{fontWeight: 'bold'}}>Total payment</Text>
          <Text style={{color: 'red', fontWeight: 'bold'}}>
            {finalAmount.toLocaleString()} đ
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

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
    flexDirection: 'row',
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
});

export default TransactionDetailScreen;
