import { Text, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

function CartScreen() {
  const cart = useSelector(state => state.cart.cart);

  return (
    <>
      <Text>Total: {cart.length}</Text>
      <FlatList
        data={cart}
        renderItem={({ item }) => <Text>{item.title}</Text>}
        keyExtractor={item => item.id}
      />
    </>
  );
}
export default CartScreen;
