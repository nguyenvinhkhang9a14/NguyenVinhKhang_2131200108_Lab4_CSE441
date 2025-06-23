import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import { IconButton } from 'react-native-paper';
import PropTypes from 'prop-types';

const ContactThum = ({ name, phone, avatar, textColor, onPress }) => {
  const colorStyle = {
    color: textColor,
  };
  const ImageContact = onPress ? TouchableOpacity : View;
  return (
    <View style={styles.container}>
      <ImageContact onPress={onPress}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
      </ImageContact>
      {name !== '' && (
        <Text style={[styles.name, colorStyle]}>{name}</Text>
      )}
      {phone !== '' && (
        <View style={styles.phoneSection}>
          <IconButton icon="phone" size={16} color={textColor} style={{ margin: 0 }} />
          <Text style={[styles.phone, colorStyle]}>{phone}</Text>
        </View>
      )}
    </View>
  );
};

ContactThum.propTypes = {
  name: PropTypes.string,
  phone: PropTypes.string,
  avatar: PropTypes.string.isRequired,
  textColor: PropTypes.string,
  onPress: PropTypes.func,
};

ContactThum.defaultProps = {
  name: '',
  phone: '',
  textColor: 'black',
  onPress: null,
};

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 45,
    height: 90,
    width: 90,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: '#eee',
  },
  container: {
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
  phone: {
    fontSize: 14,
    marginLeft: 5,
    color: '#888',
  },
  phoneSection: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 4,
  },
});

export default ContactThum;
