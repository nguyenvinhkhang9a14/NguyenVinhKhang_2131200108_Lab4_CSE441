import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

const Product_Add = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [rating, setRating] = useState('');
  const [stock, setStock] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState('');

  const handleSubmit = () => {
    fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        description,
        price: Number(price),
        discountPercentage: Number(discountPercentage),
        rating: Number(rating),
        stock: Number(stock),
        brand,
        category,
        images: [images],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        Alert.alert('Add successful!');
      })
      .catch((err) => {
        console.error(err);
        Alert.alert('Failed to add product.');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Add a Product</Text>

        <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} />
        <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />
        <TextInput style={styles.input} placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Discount Percentage" value={discountPercentage} onChangeText={setDiscountPercentage} keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Rating" value={rating} onChangeText={setRating} keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Stock" value={stock} onChangeText={setStock} keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Brand" value={brand} onChangeText={setBrand} />
        <TextInput style={styles.input} placeholder="Category" value={category} onChangeText={setCategory} />
        <TextInput style={styles.input} placeholder="Images URL" value={images} onChangeText={setImages} />

        <View style={styles.button}>
          <Button title="Submit" onPress={handleSubmit} color="#1E90FF" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Product_Add;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: 'blue',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
  button: {
    marginTop: 10,
  },
});
