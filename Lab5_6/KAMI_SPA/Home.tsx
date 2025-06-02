import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
} from 'react-native';
import {getServices} from '../services/api';
import {Service} from '../types/Service';

const HomeScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      const data = await getServices();
      setServices(data);
    };
    const unsubscribe = navigation.addListener('focus', fetchServices);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>Danh sách dịch vụ</Text>
        <TouchableOpacity
          style={styles.btnAdd}
          onPress={() => navigation.navigate('AddService')}>
          <Text style={styles.btnAddText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={services}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Detail', {id: item._id})}>
            <View style={styles.detailService}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>{item.price.toLocaleString()} đ</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {padding: 20, flex: 1},
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop:30,
  },
  header: {fontSize: 20, fontWeight: 'bold',color: '#e91e63',},
  item: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  name: {fontSize: 16,fontWeight:600},
  price: {color: '#888'},
  detailService: {},
  btnAdd:{
    backgroundColor:'#E34C66',
    width:30,
    height:30,
    borderRadius:50
  },
  btnAddText:{
    fontSize:20,
    color:'white',
    textAlign:'center'
  }
});

export default HomeScreen;
