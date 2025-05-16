import 'react-native-gesture-handler';
import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

const ContactThum = ({ name, phone, avatar, textColor, onPress }) => {
  const colorStyle = {
    color: textColor,
  };

  const ImageContact = onPress ? TouchableOpacity : View;

  return (
    <View style={styles.container}>
      <ImageContact onPress={onPress}>
        <Image
          source={{ uri: avatar }}
          style={styles.avatar}
        />
      </ImageContact>

      {name !== '' && (
        <Text style={[styles.name, colorStyle]}>{name}</Text>
      )}

      {phone !== '' && (
        <View style={styles.phoneSection}>
          <Icon name="phone" size={16} style={{ color: textColor }} />
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
    borderRadius: 30,
    height: 60,
    width: 60,
  },
  container: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  phone: {
    fontSize: 14,
    marginLeft: 5,
  },
  phoneSection: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 4,
  },
});

export default ContactThum;
