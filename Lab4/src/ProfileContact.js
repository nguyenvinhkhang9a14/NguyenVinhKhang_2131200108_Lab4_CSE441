import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProfileContact = ({ route }) => {
  const { contact } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: contact.avatar }} style={styles.avatar} />
      <Text style={styles.name}>{contact.name}</Text>
      <Text>Phone: {contact.phone}</Text>
      <Text>Cell: {contact.cell}</Text>
      <Text>Email: {contact.email}</Text>
      <Text>Favorite: {contact.favorite ? "Yes" : "No"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 50,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ProfileContact;
