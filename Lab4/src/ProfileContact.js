import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from './Store';

const ProfileContact = ({ route }) => {
  const { contact } = route.params;
  const dispatch = useDispatch();
  
  
  const updatedContact = useSelector(state => state.contacts.contacts.find(c => c.id === contact.id)) || contact;

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(updatedContact.id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarSection}>
        <Image source={{ uri: updatedContact.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{updatedContact.name}</Text>
        <View style={styles.rowCenter}>
          <MaterialCommunityIcons name="star-outline" color={updatedContact.favorite ? '#FFD700' : '#fff'} size={22} />
          <Text style={styles.phone}>{updatedContact.phone}</Text>
        </View>
      </View>
      <View style={styles.detailsSection}>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="email-outline" size={20} color="#388e3c" />
          <Text style={styles.detailText}>{updatedContact.email}</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="phone-outline" size={20} color="#388e3c" />
          <Text style={styles.detailText}>{updatedContact.cell}</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="star-outline" size={20} color={updatedContact.favorite ? '#FFD700' : '#ccc'} />
          <Text style={styles.detailText}>{updatedContact.favorite ? 'Favorite' : 'Not favorite'}</Text>
        </View>
        <View style={[styles.detailRow, { justifyContent: 'center', marginTop: 20 }]}> 
          <TouchableOpacity onPress={handleToggleFavorite} style={styles.favBtn}>
            <MaterialCommunityIcons name={updatedContact.favorite ? 'star-check' : 'star-check-outline'} size={28} color="#388e3c" />
            <Text style={styles.favBtnText}>{updatedContact.favorite ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  avatarSection: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#388e3c', 
    paddingTop: 32,
    paddingBottom: 24,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 10,
    backgroundColor: '#eee',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  phone: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 4,
  },
  detailsSection: {
    marginTop: 30,
    paddingHorizontal: 30,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  detailText: {
    fontSize: 16,
    color: '#222',
    marginLeft: 8,
  },
  favBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f5e9',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 18,
  },
  favBtnText: {
    color: '#388e3c',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default ProfileContact;
