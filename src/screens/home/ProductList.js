import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

const productsData = {
  news: [
    {
      id: '1',
      name: 'Carrot Cake',
      price: '$14',
      seller: 'Lomrre',
      image: 'https://via.placeholder.com/150',
      isNew: true,
    },
    {
      id: '1',
      name: 'Carrot Cake',
      price: '$14',
      seller: 'Lomrre',
      image: 'https://via.placeholder.com/150',
      isNew: true,
    },
    {
      id: '1',
      name: 'Carrot Cake',
      price: '$14',
      seller: 'Lomrre',
      image: 'https://via.placeholder.com/150',
      isNew: true,
    },
    {
      id: '1',
      name: 'Carrot Cake',
      price: '$14',
      seller: 'Lomrre',
      image: 'https://via.placeholder.com/150',
      isNew: true,
    },
    {
      id: '1',
      name: 'Carrot Cake',
      price: '$14',
      seller: 'Lomrre',
      image: 'https://via.placeholder.com/150',
      isNew: true,
    },
    // other items...
  ],
  CakesMuffins: [
    {
      id: '2',
      name: 'Chocolate Cake',
      price: '$18',
      seller: 'Lomrre',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '2',
      name: 'Chocolate Cake',
      price: '$18',
      seller: 'Lomrre',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '2',
      name: 'Chocolate Cake',
      price: '$18',
      seller: 'Lomrre',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '2',
      name: 'Chocolate Cake',
      price: '$18',
      seller: 'Lomrre',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '2',
      name: 'Chocolate Cake',
      price: '$18',
      seller: 'Lomrre',
      image: 'https://via.placeholder.com/150',
    },
    // other items...
  ],
  BreadMacarons: [
    {
      id: '3',
      name: 'Banana Bread',
      price: '$16',
      seller: 'Lomrre',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '3',
      name: 'Banana Bread',
      price: '$16',
      seller: 'Lomrre',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '3',
      name: 'Banana Bread',
      price: '$16',
      seller: 'Lomrre',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '3',
      name: 'Banana Bread',
      price: '$16',
      seller: 'Lomrre',
      image: 'https://via.placeholder.com/150',
    },
    // other items...
  ],
};

export default function ProductListingScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>POPULAR CAKES AND MUFFINS</Text>
        <View style={styles.headerIcons}>
          {/* <TouchableOpacity>
            <Ionicons name="heart-outline" size={24} color="#333" />
          </TouchableOpacity> */}
          <TouchableOpacity>
           <Ionicons name="person-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Sections */}
        {['news', 'CakesMuffins', 'BreadMacarons'].map((key) => (
          <View key={key} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                {key === 'news'
                  ? 'News Flavors and Pastries'
                  : key === 'CakesMuffins'
                  ? 'Cakes and Muffins'
                  : 'Bread and Macarons'}
              </Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.productList}>
              {productsData[key].map((item, index) => (
                <TouchableOpacity
                  key={`${item.id}-${index}`}
                  style={styles.card}
                  onPress={() =>
                    navigation.navigate('ProductDetail', {
                      productName: item.name,
                      productImage: item.image,
                      price: parseFloat(item.price.replace('$', '')),
                      description: `Enjoy our delicious ${item.name} by ${item.seller}.`
                    })
                  }
                >
                  <View>
                    <Image source={{ uri: item.image }} style={styles.cardImage} />
                    {item.isNew && (
                      <View style={styles.newTag}>
                        <Text style={styles.newTagText}>New</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{item.name}</Text>
                    <Text style={styles.cardPrice}>{item.price}</Text>
                    <Text style={styles.cardSeller}>{item.seller}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        ))}
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
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: {
  flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 90,
    paddingBottom: 20,
    // position: 'absolute',
    width: '100%',
    zIndex: 1
  },
  headerTitle: {
    color: '#FFC073',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 1.5,
  },
  headerIcons: { flexDirection: 'row', gap: 12 },
  section: { marginTop: 30 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  sectionTitle: { fontSize: 21, fontWeight: '700', color: '#333' },
  seeAllText: { fontSize: 15, fontWeight: '500', color: '#A8877B' },
  productList: { paddingLeft: 24, paddingVertical: 15 },
  card: {
    width: 250,
    height: 220,
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginRight: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    height: 110,
    resizeMode: 'cover',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  newTag: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FFC073',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
  },
  newTagText: { color: '#FFF', fontSize: 12 },
  cardContent: { padding: 10 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 5 },
  cardPrice: { fontSize: 15, fontWeight: 'bold', color: '#A8877B', marginBottom: 5 },
  cardSeller: { fontSize: 13, color: '#999' },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 65,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  navLabel: { fontSize: 11, color: '#A8877B', textAlign: 'center' },
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
