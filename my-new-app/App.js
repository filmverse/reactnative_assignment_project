import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UsersScreen from './UsersScreen';
import ProductListScreen from './ProductListScreen';
import CartScreen from './CartScreen';
import { storeToken, getToken } from './secureToken';

const Stack = createStackNavigator();

const linking = {
  prefixes: ['myapp://'],
  config: {
    screens: {
      ProductList: 'products',
      Cart: 'cart',
      Users: 'users'
    },
  },
};

export default function App() {

  const saveDummyToken = async () => {
    await storeToken('dummy_auth_token_123');
    alert('Token stored securely.');
  };

  useEffect(() => {
    saveDummyToken();
  }, []);

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        <Stack.Screen name="ProductList" component={ProductListScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Users" component={UsersScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
