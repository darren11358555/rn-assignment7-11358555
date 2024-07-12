import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = ({ navigation }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      const cartData = await AsyncStorage.getItem('cart');
      if (cartData) {
        setCart(JSON.parse(cartData));
      }
    };
    loadCart();
  }, []);

  const removeFromCart = async (product) => {
    const newCart = cart.filter((item) => item.id !== product.id);
    setCart(newCart);
    await AsyncStorage.setItem('cart', JSON.stringify(newCart));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image source={require('./assets/Menu.png')} style={styles.headerIcon} />
        </TouchableOpacity>
        <Image source={require('./assets/Logo.png')} style={styles.logo} />
        <View style={styles.headerRight}>
          <TouchableOpacity>
            <Image source={require('./assets/Search.png')} style={styles.headerIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.title}>CHECKOUT</Text>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{item.title}</Text>
              <Text style={styles.productDescription}>{item.description}</Text>
              <Text style={styles.productPrice}>${item.price}</Text>
              <TouchableOpacity onPress={() => removeFromCart(item)} style={styles.removeButton}>
                <Image source={require('./assets/remove.png')} style={styles.removeIcon} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 10,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    width: 24,
    height: 24,
    marginHorizontal: 8,
  },
  logo: {
    width: 100,
    height: 24,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginVertical: 16,
  },
  productContainer: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
    marginLeft: 16,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'orange',
    marginBottom: 8,
  },
  removeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  removeIcon: {
    width: 24,
    height: 24,
  },
});

export default CartScreen;
