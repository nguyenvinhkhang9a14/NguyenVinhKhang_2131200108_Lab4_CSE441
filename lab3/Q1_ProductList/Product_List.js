import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Button,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

const Products = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const filePath = 'https://dummyjson.com/products';

  useEffect(() => {
    fetch(filePath)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(d => {
        setData(d.products);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <Image source={{uri: item.thumbnail}} style={styles.thumbnail} />
      <View style={styles.info}>
        <Text style={styles.title}>Title: {item.title}</Text>
        <Text>Description: {item.description}</Text>
        <Text>Price: ${item.price}</Text>
        <Text style={styles.discount}>
          Discount: {item.discountPercentage}% off
        </Text>
        <Text>Rating: {item.rating}</Text>
        <Text>Stock: {item.stock}</Text>
        <Text>Brand: {item.brand}</Text>
        <Text>Category: {item.category}</Text>
        <View style={styles.buttonContainer}>
          <Button title="DETAIL" onPress={() => {}} />
          <Button title="ADD" onPress={() => {}} />
          <Button title="DELETE" onPress={() => {}} />
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Product list</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </SafeAreaView>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 30,
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
    color: '#333',
  },
  card: {
    flexDirection: 'row',
    padding: 10,
    marginBottom:5,
    backgroundColor: '#F3FFF4',
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  discount: {
    color: 'green',
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'space-between',
  },
});
