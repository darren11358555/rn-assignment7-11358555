import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const loadCart = async () => {
      const cartData = await AsyncStorage.getItem('cart');
      if (cartData) {
        setCart(JSON.parse(cartData));
      }
    };

    fetchProducts();
    loadCart();
  }, []);

  const addToCart = async (product) => {
    const newCart = [...cart, product];
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
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Image source={require('./assets/shoppingBag.png')} style={styles.headerIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.subHeader}>
        <TouchableOpacity>
          <Image source={require('./assets/Listview.png')} style={styles.subHeaderIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('./assets/Filter.png')} style={styles.subHeaderIcon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>OUR STORY</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { product: item })}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
            </TouchableOpacity>
            <Text style={styles.productName}>{item.title}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
              <Image source={require('./assets/add_circle.png')} style={styles.addIcon} />
            </TouchableOpacity>
          </View>
        )}
        numColumns={2}
        contentContainerStyle={styles.productList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
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
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  subHeaderIcon: {
    width: 24,
    height: 24,
    marginHorizontal: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  productList: {
    justifyContent: 'space-between',
  },
  productContainer: {
    flex: 1,
    margin: 8,
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  productImage: {
    width: 150,
    height: 200,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
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
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  addIcon: {
    width: 24,
    height: 24,
  },
});

export default HomeScreen;
