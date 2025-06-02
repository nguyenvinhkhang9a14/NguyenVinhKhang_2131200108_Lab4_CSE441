import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Service} from '../types/Service';
import {Customer} from '../types/Customer';
import {Transaction} from '../types/Transaction';
const BASE_URL = 'https://kami-backend-5rs0.onrender.com';

export const login = async (phone: string, password: string) => {
  const response = await axios.post(`${BASE_URL}/auth`, {phone, password});
  const token = response.data.token;
  await AsyncStorage.setItem('token', token);
  return token;
};

export const getServices = async (): Promise<Service[]> => {
  const res = await axios.get(`${BASE_URL}/services`);
  return res.data;
};

export const getServiceById = async (id: string): Promise<Service> => {
  const res = await axios.get(`${BASE_URL}/services/${id}`);
  return res.data;
};

export const addService = async (name: string, price: string) => {
  const token = await AsyncStorage.getItem('token');
  return axios.post(
    `${BASE_URL}/services`,
    {name, price},
    {
      headers: {Authorization: `Bearer ${token}`},
    },
  );
};

export const updateService = async (
  id: string,
  name: string,
  price: string,
) => {
  const token = await AsyncStorage.getItem('token');
  return axios.put(
    `${BASE_URL}/services/${id}`,
    {name, price},
    {
      headers: {Authorization: `Bearer ${token}`},
    },
  );
};

export const deleteService = async (id: string) => {
  const token = await AsyncStorage.getItem('token');
  return axios.delete(`${BASE_URL}/services/${id}`, {
    headers: {Authorization: `Bearer ${token}`},
  });
};

//customer
export const getCustomers = async (): Promise<Customer[]> => {
  const token = await AsyncStorage.getItem('token');
  const res = await axios.get(`${BASE_URL}/customers`, {
    headers: {Authorization: `Bearer ${token}`},
  });
  return res.data;
};

export const addCustomer = async (name: string, phone: string) => {
  const token = await AsyncStorage.getItem('token');
  return axios.post(
    `${BASE_URL}/customers`,
    {name, phone},
    {
      headers: {Authorization: `Bearer ${token}`},
    },
  );
};
export const getTransactions = async (): Promise<Transaction[]> => {
  const token = await AsyncStorage.getItem('token');
  const res = await axios.get(`${BASE_URL}/transactions`, {
    headers: {Authorization: `Bearer ${token}`},
  });
  console.log('Transactions response:', res.data);
  return res.data;
};
