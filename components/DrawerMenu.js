// components/CustomDrawer.js

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function CustomDrawer({ visible, onClose }) {
  const navigation = useNavigation();
  const [slideAnim] = useState(new Animated.Value(SCREEN_WIDTH));

  React.useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: SCREEN_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleNavigate = (screen) => {
    onClose();
    navigation.navigate(screen);
  };
  

  return (
    <Animated.View
      style={[styles.drawerContainer, { transform: [{ translateX: slideAnim }] }]}
    >
      <View style={styles.drawerContent}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={28} color="#333" />
        </TouchableOpacity>

        <ScrollView>
          <Text style={styles.sectionTitle}>General</Text>
          <DrawerItem label="Favorites" onPress={() => handleNavigate('Favorites')} />

          <Text style={styles.sectionTitle}>Orders & Activity</Text>
          <DrawerItem label="Orders" onPress={() => handleNavigate('Orders')} />
          <DrawerItem label="Order History" onPress={() => handleNavigate('OrderHistory')} />

          <Text style={styles.sectionTitle}>Support & Legal</Text>
          <DrawerItem label="Help Center" onPress={() => handleNavigate('HelpCenter')} />
          <DrawerItem label="Terms & Conditions" onPress={() => handleNavigate('TermsOfService')} />
          <DrawerItem label="Privacy Policy" onPress={() => handleNavigate('PrivacyPolicy')} />
        </ScrollView>
      </View>
    </Animated.View>
  );
}

const DrawerItem = ({ label, onPress }) => (
  <TouchableOpacity style={styles.drawerItem} onPress={onPress}>
    <Text style={styles.drawerLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  drawerContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: SCREEN_WIDTH * 0.8,
    backgroundColor: '#FFF',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    zIndex: 999,
  },
  drawerContent: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  drawerItem: {
    paddingVertical: 10,
  },
  drawerLabel: {
    fontSize: 16,
    color: '#555',
  },
});
