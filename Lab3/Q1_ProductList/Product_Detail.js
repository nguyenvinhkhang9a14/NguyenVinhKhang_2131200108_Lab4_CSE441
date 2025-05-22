import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Card, Button, Title, Paragraph } from 'react-native-paper';

const Product_Detail = () => {
  const [data, setData] = useState(null);
  const filePath = 'https://dummyjson.com/products/2';

  useEffect(() => {
    fetch(filePath)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((d) => setData(d))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  if (!data) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Product Detail</Text>
      <Card style={styles.card}>
        <Card.Cover source={{ uri: data.thumbnail }} />
        <Card.Content>
          <Title style={styles.title}>Title: {data.title}</Title>
          <Paragraph>Description: {data.description}</Paragraph>
          <Paragraph>Price: ${data.price}</Paragraph>
          <Paragraph>Discount: {data.discountPercentage}%</Paragraph>
          <Paragraph>Rating: {data.rating} stars</Paragraph>
          <Paragraph>Stock: {data.stock}</Paragraph>
          <Paragraph>Brand: {data.brand}</Paragraph>
          <Paragraph>Category: {data.category}</Paragraph>
        </Card.Content>
        <Card.Actions style={styles.actions}>
          <Button mode="contained" onPress={() => {}} style={styles.button} >
            Delete
          </Button>
          <Button mode="contained" onPress={() => {}} style={styles.button} >
            Cancel
          </Button>
        </Card.Actions>
      </Card>
    </SafeAreaView>
  );
};

export default Product_Detail;

const styles = StyleSheet.create({
  container: {
    marginTop:15,
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
    marginLeft:10,
  },

  title: {
    fontWeight: 'bold',
    marginBottom: 6,
  },
  actions: {
    paddingBottom: 12,
  },
  button: {
    borderRadius: 20,
  },
});
