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
import React, {Component,useEffect, useState} from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { mapContacts, fetchContactsSuccess } from './Store';
import ContactListItem from './ContactListItem';

const keyExtractor = ({phone}) => phone;

const fetchContacts = async () => {
  const data = await fetch('https://randomuser.me/api/?results=50');
  const contactData = await data.json();
  return contactData.results.map(mapContacts);
};

export const Contacts = ({navigation}) => {
  const state = useSelector(state => state);
  console.log('full redux state:', state);
  const contacts = state.contacts && state.contacts.contacts ? state.contacts.contacts : [];
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchContacts()
      .then(contacts => {
        console.log('contacts fetched:', contacts);
        dispatch(fetchContactsSuccess(contacts));
        setLoading(false);
      })
      .catch(e => {
        console.log('fetch error:', e);
        setError(e.message || 'Fetch error');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="blue" />
        <Text>Loading contacts...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={{color: 'red'}}>Error: {error}</Text>
      </View>
    );
  }

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

  console.log('contacts in redux:', contacts);

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
