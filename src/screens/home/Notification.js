// screens/Profile/NotificationsScreen.js
import Icon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import React from 'react';
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
const NotificationsScreen = () => {
      const navigation = useNavigation();
    
  return (
    <SafeAreaView style={styles.container}>
            <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
         <Ionicons name="menu" size={28} color="#333" />
       </TouchableOpacity>
       
               <Text style={styles.headerTitle}>Notifications</Text>
               <View style={styles.headerIcons}>
                 {/* <Ionicons name="cart-outline" size={24} color="#333" style={styles.icon} /> */}
               <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                  <Ionicons name="person-outline" size={24} color="#333" />
                 </TouchableOpacity>
               </View>
             </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
       
        {/* Placeholder for real-time notifications */}
        <View style={styles.notificationItem}>
          <Text style={styles.notificationTitle}>🔔 Food Ready!</Text>
          <Text style={styles.notificationMessage}>Your order #A1B2C3 is ready for pickup!</Text>
          <Text style={styles.notificationTime}>Just now</Text>
        </View>

        <View style={styles.notificationItem}>
          <Text style={styles.notificationTitle}>✅ Order Confirmed!</Text>
          <Text style={styles.notificationMessage}>Your order #X4Y5Z6 has been successfully placed.</Text>
          <Text style={styles.notificationTime}>15 minutes ago</Text>
        </View>

        <View style={styles.notificationItem}>
          <Text style={styles.notificationTitle}>⭐ New Feature Alert!</Text>
          <Text style={styles.notificationMessage}>Check out our new loyalty program!</Text>
          <Text style={styles.notificationTime}>Yesterday</Text>
        </View>

        <Text style={styles.infoText}>
          Real-time updates and important alerts will appear here.
        </Text>
      </ScrollView>
        <View style={styles.bottomNavBar}>
              {[
                { iconLibrary: Ionicons, iconName: 'home', label: 'Home', screen: 'Home' },
                { iconLibrary: FontAwesome5, iconName: 'shopping-cart', label: 'Cart', screen: 'Cart' },
                // { iconLibrary: MaterialCommunityIcons, iconName: 'heart', label: 'Favorites', screen: 'Favorites' },
                { iconLibrary: Ionicons, iconName: 'notifications-outline', label: 'Notifications', screen: 'Notifications' },
              ].map(({ iconLibrary: IconLib, iconName, label, screen }, idx) => {
                const active = screen === 'Notifications';
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
    backgroundColor: '#F8F8F8',
  },

  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
    header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 90,
    // position: 'absolute',
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
  notificationItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF7F37',
    marginBottom: 5,
  },
  notificationMessage: {
    fontSize: 15,
    color: '#333',
    marginBottom: 5,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
  },
  infoText: {
    fontSize: 14,
    color: '#999',
    marginTop: 20,
    textAlign: 'center',
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

export default NotificationsScreen;