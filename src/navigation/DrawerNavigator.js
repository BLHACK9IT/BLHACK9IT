// src/navigation/DrawerNavigator.js

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from '../screens/home/Home';
import FavoritesScreen from '../screens/drawer/General/FavoritesScreen';
import OrdersScreen from '../screens/drawer/Orders/OrdersScreen';
import OrderHistoryScreen from '../screens/drawer/Orders/OrderHistoryScreen';
// import HelpCenterScreen from '../screens/drawer/Support/HelpCenterScreen';
// import TermsOfServiceScreen from '../screens/drawer/Support/TermsOfServiceScreen';
// import PrivacyPolicyScreen from '../screens/drawer/Support/PrivacyPolicyScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{ 
        headerShown: true,
        drawerActiveTintColor: '#FF7F37',
        drawerInactiveTintColor: '#555',
        drawerLabelStyle: { fontSize: 16 },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          drawerLabel: 'Favorites',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          drawerLabel: 'Orders',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="OrderHistory"
        component={OrderHistoryScreen}
        options={{
          drawerLabel: 'Order History',
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="clipboard-text-outline" size={size} color={color} />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="HelpCenter"
        component={HelpCenterScreen}
        options={{
          drawerLabel: 'Help Center',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="help-circle-outline" size={size} color={color} />
          ),
        }}
      /> */}
      {/* <Drawer.Screen
        name="TermsOfService"
        component={TermsOfServiceScreen}
        options={{
          drawerLabel: 'Terms & Conditions',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
        options={{
          drawerLabel: 'Privacy Policy',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="shield-outline" size={size} color={color} />
          ),
        }}
      /> */}
    </Drawer.Navigator>
  );
}
