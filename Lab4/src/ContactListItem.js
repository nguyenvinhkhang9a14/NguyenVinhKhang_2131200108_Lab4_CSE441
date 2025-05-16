import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ContactListItem = ({ name, avatar, phone, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <Image source={{ uri: avatar }} style={styles.avatar} />
    <View>
      <Text style={styles.name}>{name}</Text>
      <Text>{phone}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 25,
    height: 50,
    marginRight: 10,
    width: 50,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 8,
  },
  name: {
    fontWeight: 'bold',
  },
});

export default ContactListItem;
