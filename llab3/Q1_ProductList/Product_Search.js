import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

const Product_Search = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState('');

  const searchProduct = () => {
    if (value.trim() === '') return;

    fetch(`https://dummyjson.com/products/search?q=${value}`)
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((d) => setData(d.products))
      .catch((error) => console.error('Error fetching data:', error));
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: item.thumbnail }} />
      <Card.Content>
        <Title style={styles.title}>Title: {item.title}</Title>
        <Paragraph>Description: {item.description}</Paragraph>
        <Paragraph>Price: ${item.price}</Paragraph>
        <Paragraph>Rating: {item.rating}</Paragraph>
        <Paragraph>Stock: {item.stock}</Paragraph>
        <Paragraph>Brand: {item.brand}</Paragraph>
        <Paragraph>Category: {item.category}</Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Search Products</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter product name"
        value={value}
        onChangeText={setValue}
      />
      <TouchableOpacity style={styles.button} onPress={searchProduct}>
        <Text style={styles.buttonText}>SEARCH</Text>
      </TouchableOpacity>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListHeaderComponent={<Text style={styles.resultHeader}>Product Detail</Text>}
      />
    </SafeAreaView>
  );
};

export default Product_Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    color: '#1E90FF',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  resultHeader: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 6,
  },
});
