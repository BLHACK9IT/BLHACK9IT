import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../../context/CartContext'; // adjust the path


// const dummyCart = [
//   {
//     id: '1',
//     name: 'Carrot Cake',
//     desc: 'Delicious layered carrot cake',
//     price: 12,
//     quantity: 1,
//     image: 'https://via.placeholder.com/80',
//   },
//   {
//     id: '2',
//     name: 'Muffins',
//     desc: 'Freshly baked blueberry muffins',
//     price: 7,
//     quantity: 2,
//     image: 'https://via.placeholder.com/80',
//   },
//   {
//     id: '3',
//     name: 'White Bread',
//     desc: 'Soft and fresh loaf',
//     price: 8,
//     quantity: 1,
//     image: 'https://via.placeholder.com/80',
//   },
// ];

export default function OrderSummaryScreen() {
  const navigation = useNavigation();
  const { cartItems, updateQuantity, removeFromCart } = useCart();


//   const handleQuantityChange = (id, type) => {
//     setCartItems(prev =>
//       prev.map(item => {
//         if (item.id === id) {
//           const newQty = type === 'inc' ? item.quantity + 1 : Math.max(1, item.quantity - 1);
//           return { ...item, quantity: newQty };
//         }
//         return item;
//       })
//     );
//   };

//   const handleRemove = id => {
//     setCartItems(prev => prev.filter(item => item.id !== id));
//   };

const handleQuantityChange = (id, type) => {
  updateQuantity(id, type);
};

const handleRemove = (id) => {
  removeFromCart(id);
};
  
const getTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Home');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>YOUR ORDER</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Content */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Order Details */}
        <Text style={styles.sectionHeader}>Order Details</Text>
        <Text style={styles.subText}>
          {cartItems.length} Products from Ceasar Pastries
        </Text>

        <Text style={styles.sectionHeader}>Product List</Text>

        {cartItems.map(item => (
          <View key={item.id} style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productDesc}>{item.desc}</Text>
              <Text style={styles.productPrice}>${item.price}</Text>
            </View>
            <View style={styles.productActions}>
              <TouchableOpacity onPress={() => handleRemove(item.id)}>
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  size={22}
                  color="#FF7F37"
                  style={{ marginBottom: 10 }}
                />
              </TouchableOpacity>
              <View style={styles.quantityControl}>
                <TouchableOpacity onPress={() => handleQuantityChange(item.id, 'dec')}>
                  <MaterialCommunityIcons
                    name="minus"
                    size={18}
                    color="#A8877B"
                    style={styles.qtyButton}
                  />
                </TouchableOpacity>
                <Text style={styles.qtyText}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => handleQuantityChange(item.id, 'inc')}>
                  <MaterialCommunityIcons
                    name="plus"
                    size={18}
                    color="#A8877B"
                    style={styles.qtyButton}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        {/* Shipping */}
        <Text style={styles.sectionHeader}>Shipping</Text>

        <View style={styles.shippingCard}>
          <MaterialCommunityIcons
            name="clock-outline"
            size={26}
            color="#FFC073"
            style={{ marginRight: 15 }}
          />
          <Text style={styles.shippingText}>Estimated time{'\n'}1 - 2 Days</Text>
        </View>

        <View style={styles.shippingCard}>
          <MaterialCommunityIcons
            name="map-marker-outline"
            size={26}
            color="#FFC073"
            style={{ marginRight: 15 }}
          />
          <Text style={styles.shippingText}>
            Your location{'\n'}B4568 Hilton Road, N9 Bristol{'\n'}United Kingdom
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Panel */}
      <View style={styles.bottomPanel}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>$ {getTotal()}</Text>
        </View>
        <TouchableOpacity style={styles.confirmButton} onPress={() => navigation.navigate('OrderConfirmation')}>
          <Text style={styles.confirmText}>CONFIRM NOW</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
 flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 90,
    paddingBottom: 20,
    width: '100%',
   
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    letterSpacing: 1.5,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginTop: 25,
    marginBottom: 5,
    paddingHorizontal: 24,
  },
  subText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    paddingHorizontal: 24,
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    marginHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  productImage: {
    width: 75,
    height: 75,
    borderRadius: 10,
    marginRight: 15,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  productDesc: {
    fontSize: 13,
    color: '#999',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#A8877B',
  },
  productActions: {
    alignItems: 'flex-end',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyButton: {
    padding: 6,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
  },
  qtyText: {
    fontSize: 16,
    color: '#333',
    marginHorizontal: 10,
  },
  shippingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 18,
    marginBottom: 15,
    marginHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  shippingText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  bottomPanel: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  totalLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  confirmButton: {
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
  confirmText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFF',
  },
});
