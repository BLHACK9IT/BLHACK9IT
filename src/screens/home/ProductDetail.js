import React, { useState } from 'react';
import { useCart } from '../../context/CartContext'; // adjust path if needed

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StatusBar,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function ProductDetailScreen () {
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedSize, setSelectedSize] = useState('6 People');
  const [imageLoading, setImageLoading] = useState(true);

  const sizes = ['4 People', '6 People', '8 People'];
  const { addToCart } = useCart();

  const {
    productName = 'Chocolate Cake',
    productImage = 'https://images.unsplash.com/photo-1606312618574-dce39dbd7e97?auto=format&fit=crop&w=800&q=80',
    rating = 4.8,
    price = 25.5,
    description = 'A delicious chocolate cake layered with truffle frosting, topped with creamy chocolate ganache and decorations.'
  } = route.params || {};

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{productName?.toUpperCase()} DETAILS</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageWrapper}>
          {imageLoading && (
            <ActivityIndicator size="large" color="#FFC073" style={styles.loadingIndicator} />
          )}
          <Image
            source={{ uri: productImage }}
            style={styles.productImage}
            onLoadEnd={() => setImageLoading(false)}
          />
        </View>

        {/* Product Details */}
        <View style={styles.details}>
          <Text style={styles.productName}>{productName}</Text>

          <View style={styles.ratingRow}>
            <FontAwesome name="star" size={16} color="#FFC073" />
            <Text style={styles.ratingText}>{rating}</Text>
            <Text style={styles.separator}>|</Text>
            <Text style={styles.placeholderText}>Popular Choice</Text>
          </View>

          <Text style={styles.price}>${price.toFixed(2)}</Text>

          <Text style={styles.sectionHeader}>Description</Text>
          <Text style={styles.description}>{description}</Text>

          <Text style={styles.sectionHeader}>Size of Cake</Text>
          <View style={styles.sizeRow}>
            {sizes.map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.sizeButton,
                  selectedSize === size && styles.activeSizeButton,
                ]}
                onPress={() => setSelectedSize(size)}
              >
                <Text
                  style={[
                    styles.sizeText,
                    selectedSize === size && styles.activeSizeText,
                  ]}
                >
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Buy Now + Cart Icon */}
          <View style={styles.buyRow}>
            <TouchableOpacity style={styles.buyButton}>
              <Text style={styles.buyButtonText}>BUY NOW</Text>
            </TouchableOpacity>
            <TouchableOpacity
  style={styles.cartButton}
  onPress={() =>
    addToCart({
      id: productName, // or use a better unique ID if available
      name: productName,
      price,
      image: productImage,
      desc: description,
    })
  }
>
  <MaterialCommunityIcons name="cart-plus" size={26} color="#FFFFFF" />
</TouchableOpacity>

          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
     <View style={styles.bottomNavBar}>
            {[
              { iconLibrary: Ionicons, iconName: 'home', label: 'Home', screen: 'Home' },
              { iconLibrary: FontAwesome5, iconName: 'shopping-cart', label: 'Cart', screen: 'Cart' },
              { iconLibrary: MaterialCommunityIcons, iconName: 'heart', label: 'Favorites', screen: 'Favorites' },
              { iconLibrary: Ionicons, iconName: 'notifications-outline', label: 'Notifications', screen: 'Notifications' },
            ].map(({ iconLibrary: IconLib, iconName, label, screen }, idx) => {
              const active = screen === 'Home';
              return (
                <TouchableOpacity
                  key={idx}
                  style={active ? styles.activeTab : styles.navItem}
                  onPress={() => navigation.navigate(screen)}
                >
                  <IconLib name={iconName} size={active ? 28 : 24} color={active ? '#FFFFFF' : '#999999'} />
                  {!active && <Text style={styles.navText}>{label}</Text>}
                </TouchableOpacity>
              );
            })}
          </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 90,
    width: '100%',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFC073',
    letterSpacing: 1.5,
  },
  imageWrapper: {
    height: 300,
    marginHorizontal: 24,
    marginTop: 10,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#EAEAEA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingIndicator: {
    position: 'absolute',
    zIndex: 1,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  details: {
    flex: 1,
    paddingHorizontal: 24,
    marginTop: 20,
    paddingBottom: 100,
  },
  productName: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  ratingText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 6,
  },
  separator: {
    marginHorizontal: 8,
    color: '#999',
    fontSize: 14,
  },
  placeholderText: {
    fontSize: 14,
    color: '#999',
  },
  price: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#64381e',
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    marginBottom: 30,
  },
  sizeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  sizeButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  activeSizeButton: {
    backgroundColor: '#FFC073',
    borderColor: '#FFC073',
  },
  sizeText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  activeSizeText: {
    color: '#FFFFFF',
  },
  buyButton: {
    flex: 1,
    height: 60,
    backgroundColor: '#FFC073',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 10,
  },
  
cartButton: {
  height: 60,
  width: 60,
  backgroundColor: '#FFC073',
  borderRadius: 12,
  justifyContent: 'center',
  alignItems: 'center',
  elevation: 10,
},
buyRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 30,
  gap: 10
},
cartButton: {
  height: 60,
  width: 60,
  backgroundColor: '#FFC073',
  borderRadius: 12,
  justifyContent: 'center',
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.25,
  shadowRadius: 5,
  elevation: 10,
},


  buyButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
   bottomNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

    backgroundColor: '#FFFFFF',
    height: 110,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  navItem: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  navText: {
    fontSize: 10,
    color: '#999999',
    marginTop: 2,
  },
  activeTab: {
    alignItems: 'center',
    backgroundColor: '#64381e',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 30,
  },
});


