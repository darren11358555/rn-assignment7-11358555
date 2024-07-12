import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;

  const addToCart = async () => {
    const cartData = await AsyncStorage.getItem('cart');
    let cart = cartData ? JSON.parse(cartData) : [];
    cart.push(product);
    await AsyncStorage.setItem('cart', JSON.stringify(cart));
    navigation.navigate('Cart');
  };

  return (
    <ScrollView style={styles.container}>
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
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{product.title}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
        <Text style={styles.productPrice}>${product.price}</Text>
        <Text style={styles.sectionTitle}>MATERIALS</Text>
        <Text style={styles.sectionContent}>
          We work with monitoring programmes to ensure compliance with safety, health, and quality standards for our products.
        </Text>
        <View style={styles.iconRow}>
          <View style={styles.iconContainer}>
            <Image source={require('./assets/Do Not Bleach.png')} style={styles.icon} />
            <Text style={styles.iconText}>Do not use bleach</Text>
          </View>
          <View style={styles.iconContainer}>
            <Image source={require('./assets/Do Not Tumble Dry.png')} style={styles.icon} />
            <Text style={styles.iconText}>Do not tumble dry</Text>
          </View>
          <View style={styles.iconContainer}>
            <Image source={require('./assets/Do Not Wash.png')} style={styles.icon} />
            <Text style={styles.iconText}>Dry clean with tetrachloroethylene</Text>
          </View>
          <View style={styles.iconContainer}>
            <Image source={require('./assets/Iron Low Temperature.png')} style={styles.icon} />
            <Text style={styles.iconText}>Iron at a maximum of 110°C/230°F</Text>
          </View>
        </View>
        <Text style={styles.sectionTitle}>SHIPPING</Text>
        <View style={styles.iconContainer}>
          <Image source={require('./assets/Shipping.png')} style={styles.icon} />
          <Text style={styles.sectionContent}>Free Flat Rate Shipping</Text>
        </View>
        <Text style={styles.sectionContent}>Estimated to be delivered on 09/11/2021 - 12/11/2021.</Text>
      </View>
      <View style={styles.addToCartContainer}>
        <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
          <Image source={require('./assets/Plus.png')} style={styles.addToCartIcon} />
          <Text style={styles.addToCartText}>ADD TO BASKET</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('./assets/Heart.png')} style={styles.heartIcon} />
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    backgroundColor: '#fff',
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
  productImage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  productDescription: {
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'orange',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  sectionContent: {
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
  },
  iconRow: {
    marginBottom: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  iconText: {
    fontSize: 16,
    color: '#888',
  },
  addToCartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 16,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addToCartIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  heartIcon: {
    width: 24,
    height: 24,
  },
});

export default ProductDetailScreen;
