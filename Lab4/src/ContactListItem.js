import React from 'react';
import { View, Text, Image, TouchableHighlight, StyleSheet } from 'react-native';

const ContactListItem = ({ name, avatar, phone, onPress }) => (
  <TouchableHighlight onPress={onPress} underlayColor="lightgray" style={styles.container}>
    <View style={styles.contactInfo}>
      <Image source={{ uri: avatar }} style={styles.avatar} />
      <View style={styles.details}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.phone}>{phone}</Text>
      </View>
    </View>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    marginVertical: 2,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  avatar: {
    borderRadius: 30,
    width: 60,
    height: 60,
    marginRight: 16,
    backgroundColor: '#eee',
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 2,
  },
  phone: {
    color: '#888',
    fontSize: 15,
  },
});

export default ContactListItem;
