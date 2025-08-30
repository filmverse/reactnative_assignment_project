import React, { useCallback, useMemo } from 'react';
import { FlatList, Text, Button, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './redux/cartSlice';

const DATA = Array.from({ length: 5000 }, (_, i) => ({
  id: String(i + 1),
  title: `Item ${i + 1}`,
}));

const getItemLayout = (_, index) => ({
  length: 60,
  offset: 60 * index,
  index,
});

export default function ProductListScreen({ navigation }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const cartItemIds = useMemo(() => new Set(cart.map(item => item.id)), [cart]);

  const renderItem = useCallback(
    ({ item }) => {
      const inCart = cartItemIds.has(item.id);
      return (
        <View style={styles.row}>
          <Text>{item.title}</Text>
          <TouchableOpacity
            disabled={inCart}
            onPress={() => dispatch(addToCart(item))}
          >
            <Text style={{ color: inCart ? 'gray' : 'blue' }}>
              {inCart ? 'Added to Cart' : 'Add to Cart'}
            </Text>
          </TouchableOpacity>
        </View>
      );
    },
    [cartItemIds, dispatch]
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
      <View style={styles.footer}>
        <Button title="Go to Cart" onPress={() => navigation.navigate('Cart')} />
      </View>
      <View style={[styles.footer, { bottom: 60 }]}>
        <Button title="Go to Offline Users" onPress={() => navigation.navigate('Users')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    padding: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
  },
});
