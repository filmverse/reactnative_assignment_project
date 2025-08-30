import * as SecureStore from 'expo-secure-store';

export async function storeToken(token) {
  try {
    await SecureStore.setItemAsync('authToken', token);
  } catch (error) {
    console.error('Failed to store token', error);
  }
}

export async function getToken() {
  try {
    const token = await SecureStore.getItemAsync('authToken');
    return token;
  } catch (error) {
    console.error('Failed to get token', error);
    return null;
  }
}
