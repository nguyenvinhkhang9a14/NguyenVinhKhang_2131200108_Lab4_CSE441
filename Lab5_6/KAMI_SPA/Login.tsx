import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import {login} from '../services/api';

const LoginScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login(phone, password);
      navigation.replace('Main');
    } catch (err) {
      Alert.alert('Login Failed', 'Invalid phone or password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {padding: 20, flex: 1, justifyContent: 'center'},
  title: {
    fontSize: 60,
    textAlign: 'center',
    color: '#E34C66',
    fontWeight: '600',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 20,
    borderRadius: 10,
    borderColor: '#ccc',
    marginTop: 15,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#E34C66',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
