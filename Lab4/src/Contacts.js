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
import React, {Component,useEffect} from 'react';

import { useSelector, useDispatch } from 'react-redux';

const keyExtractor = ({phone}) => phone;

const fetchContacts = async () => {
  const data = await fetch('https://randomuser.me/api/?results=50');
  const contactData = await data.json();
  return contactData.results.map(Contacts);
};

export const Contacts = ({navigation}) => {
const contacts = useSelector(state => state.contacts.contacts);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchContacts()
      .then(contacts => {
        dispatch(fetchContactsSuccess(contacts));
      })
      .catch(e => {});
  }, []);

  // const contactsSorted = contacts.slice().sort((a, b) => a.name.localeCompare(b.name));

  const renderContacts = ({item}) => {
    const {name, avatar, phone} = item;
    return (
      <ContactListItem
        name={name}
        avatar={avatar}
        phone={phone}
        onPress={() => navigation.navigate('ProfileContact', {contact: item})}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={keyExtractor}
        renderItem={renderContacts}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
     flex: 1,
    justifyContent: 'center',
   
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default Contacts;
