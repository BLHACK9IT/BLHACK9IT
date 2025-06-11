import React, { useState } from 'react';
import { useNavigation, DrawerActions } from '@react-navigation/native';

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const categories = ['Cakes', 'Muffins', 'Bread', 'Macarons', 'Coffee'];

const recommendedProducts = [
  {
    id: '1',
    name: 'Carrot Cake',
    price: '$14',
    seller: 'Lomrre',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587'
  },
  {
    id: '2',
    name: 'White Cake',
    price: '$16',
    seller: 'Lomrre',
    image: 'https://images.unsplash.com/photo-1601979031925-3cc8ebf9f69f'
  },
  {
    id: '3',
    name: 'White Cake',
    price: '$16',
    seller: 'Lomrre',
    image: 'https://images.unsplash.com/photo-1601979031925-3cc8ebf9f69f'
  }
];

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Cakes');
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
     <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
  <Ionicons name="menu" size={28} color="#333" />
</TouchableOpacity>

        <Text style={styles.headerTitle}>Home</Text>
        <View style={styles.headerIcons}>
          {/* <Ionicons name="cart-outline" size={24} color="#333" style={styles.icon} /> */}
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
           <Ionicons name="person-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <View>
        {/* Hero Image */}
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1604908177520-472cde52162d' }}
            style={styles.heroImage}
          />
          <View style={styles.searchContainer}>
            <Icon name="search" size={20} color="#666" style={{ marginLeft: 15 }} />
            <TextInput
              placeholder="Find cakes, muffins and bread here"
              placeholderTextColor="#999"
              style={styles.searchInput}
              returnKeyType="search"
            />
            <Icon name="sliders" size={20} color="#999" style={{ marginRight: 15 }} />
          </View>
        </View>

        {/* Categories */}
        <View style={styles.categoryRow}>
          <CategoryCard
            title="Cakes and Muffins"
            description="Sweet and savory delights..."
            imageUrl="https://images.unsplash.com/photo-1512058564366-c9e9ecbea67a"
          />
          <CategoryCard
            title="Bread and Macrons"
            description="Freshly baked daily..."
            imageUrl="https://images.unsplash.com/photo-1579913801914-5bc8e5f37988"
          />
        </View>

        {/* Recommended Products */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended Products</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ProductList')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        {/* Category Tags */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tagContainer}>
          {categories.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[styles.tag, cat === selectedCategory && styles.tagSelected]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={{ color: cat === selectedCategory ? '#fff' : '#333', fontWeight: '500' }}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Products Grid */}
        <View style={styles.gridContainer}>
          {recommendedProducts.map(product => (
            <TouchableOpacity
              key={product.id}
              style={styles.productCard}
              onPress={() =>
                navigation.navigate('ProductDetail', {
                  productName: product.name,
                  productImage: product.image,
                  price: parseFloat(product.price.replace('$', '')),
                  description: `Enjoy our delicious ${product.name} by ${product.seller}.`
                })
              }
            >
              <Image source={{ uri: product.image }} style={styles.productImage} />
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>{product.price}</Text>
              <Text style={styles.productSeller}>{product.seller}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavBar}>
        {[
          { iconLibrary: Ionicons, iconName: 'home', label: 'Home', screen: 'Home' },
          { iconLibrary: FontAwesome5, iconName: 'shopping-cart', label: 'Cart', screen: 'Cart' },
          // { iconLibrary: MaterialCommunityIcons, iconName: 'heart', label: 'Favorites', screen: 'Favorites' },
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
}



function CategoryCard({ title, description, imageUrl }) {
  return (
    <View style={styles.categoryCard}>
      <Image source={{ uri: imageUrl }} style={styles.categoryImage} />
      <Text style={styles.categoryTitle}>{title}</Text>
      <Text style={styles.categoryDesc}>{description}</Text>
      <TouchableOpacity style={styles.findButton}>
        <Text style={styles.findButtonText}>Find now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 90,
    position: 'absolute',
    width: '100%',
    zIndex: 1

  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333'
  },
  headerIcons: {
    flexDirection: 'row'
  },
  icon: {
    marginRight: 15
  },
  heroContainer: {
    position: 'relative',
    marginHorizontal: 20,
    marginBottom: 30
  },
  heroImage: {
    width: '100%',
    height: 220,
    borderRadius: 20
  },
  searchContainer: {
    position: 'absolute',
    bottom: -25,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333'
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 40,
    paddingHorizontal: 10
  },
  categoryCard: {
    backgroundColor: '#fff',
    width: '48%',
    borderRadius: 12,
    padding: 10,
    elevation: 2
  },
  categoryImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333'
  },
  categoryDesc: {
    fontSize: 12,
    color: '#666',
    paddingBottom: 30
  },
  findButton: {
    backgroundColor: '#FFC073',
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  findButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500'
  },
  sectionHeader: {
    marginTop: 30,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333'
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64381e'
  },
  tagContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 10
  },
  tag: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
    elevation: 1
  },
  tagSelected: {
    backgroundColor: '#FFC073'
  },
  gridContainer: {
    flexDirection: 'row',
    // flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 5,
    marginTop: 20
  },
  productCard: {
    backgroundColor: '#fff',
    width: '30%',
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
    elevation: 2
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333'
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#64381e',
    marginVertical: 2
  },
  productSeller: {
    fontSize: 12,
    color: '#999'
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