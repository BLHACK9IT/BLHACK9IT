import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
  const userData = {
    name: 'Ariz F.',
    email: 'ariz@example.com',
    avatarUrl: 'https://via.placeholder.com/150/FF7F37/FFFFFF?text=Ariz', // Placeholder image
  };

  const navigateToSection = (screenName) => {
    console.log(`Navigating to: ${screenName}`);
    navigation.navigate(screenName); // Uncomment and configure your navigator
  };

 const handleLogout = () => {
  Alert.alert('Logout', 'Are you sure you want to log out?', [
    { text: 'Cancel', style: 'cancel' },
    { text: 'Logout', onPress: () => {
      console.log('User logged out');
      navigation.navigate('Login');
    }},
  ]);
};

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F8F8" />
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
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

        {/* User Profile Section */}
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: userData.avatarUrl }}
            style={styles.profileAvatar}
            accessibilityLabel="User Profile Picture"
          />
          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.userEmail}>{userData.email}</Text>
          <TouchableOpacity style={styles.editProfileButton} onPress={() => navigateToSection('EditProfile')}>
            <Text style={styles.editProfileButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Settings Sections - Adjusted */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>General Settings</Text>
          {/* Notifications can still be useful for app updates or promotions */}
          <TouchableOpacity style={styles.settingItem} onPress={() => navigateToSection('Notifications')}>
            <Ionicons name="notifications-outline" size={24} color="#666666" style={styles.settingIcon} />
            <Text style={styles.settingText}>Notifications</Text>
            <Ionicons name="chevron-forward" size={20} color="#BBBBBB" />
          </TouchableOpacity>
          {/* My Favorites is still relevant for a pickup app */}
          {/* <TouchableOpacity style={[styles.settingItem, styles.lastSettingItem]} onPress={() => navigateToSection('Favorites')}>
            <MaterialCommunityIcons name="heart-outline" size={24} color="#666666" style={styles.settingIcon} />
            <Text style={styles.settingText}>My Favorites</Text>
            <Ionicons name="chevron-forward" size={20} color="#BBBBBB" />
          </TouchableOpacity> */}
        </View>

        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Orders & Activity</Text>
          <TouchableOpacity style={[styles.settingItem, styles.lastSettingItem]} onPress={() => navigateToSection('OrderHistory')}>
            <MaterialCommunityIcons name="history" size={24} color="#666666" style={styles.settingIcon} />
            <Text style={styles.settingText}>Order History</Text>
            <Ionicons name="chevron-forward" size={20} color="#BBBBBB" />
          </TouchableOpacity>
        </View>

        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Support & Legal</Text>
          <TouchableOpacity style={styles.settingItem} onPress={() => navigateToSection('HelpCenter')}>
            <MaterialCommunityIcons name="help-circle-outline" size={24} color="#666666" style={styles.settingIcon} />
            <Text style={styles.settingText}>Help Center</Text>
            <Ionicons name="chevron-forward" size={20} color="#BBBBBB" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem} onPress={() => navigateToSection('TermsOfService')}>
            <Ionicons name="document-text-outline" size={24} color="#666666" style={styles.settingIcon} />
            <Text style={styles.settingText}>Terms & Conditions</Text>
            <Ionicons name="chevron-forward" size={20} color="#BBBBBB" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.settingItem, styles.lastSettingItem]} onPress={() => navigateToSection('PrivacyPolicy')}>
            <MaterialCommunityIcons name="shield-lock-outline" size={24} color="#666666" style={styles.settingIcon} />
            <Text style={styles.settingText}>Privacy Policy</Text>
            <Ionicons name="chevron-forward" size={20} color="#BBBBBB" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.versionInfo}>
          <Text style={styles.versionText}>App Version 1.0.0</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  
  scrollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FF7F37',
    marginBottom: 10,
  },
  userName: {
    fontFamily: 'sans-serif',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  userEmail: {
    fontFamily: 'sans-serif',
    fontSize: 16,
    color: '#666666',
    marginBottom: 15,
  },
  editProfileButton: {
    backgroundColor: '#FF7F37',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
    shadowColor: '#FF7F37',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  editProfileButtonText: {
    fontFamily: 'sans-serif',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  settingsSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  sectionTitle: {
    fontFamily: 'sans-serif',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderBottomWidth: 1, // Separator between items
    borderBottomColor: '#F2F2F2',
  },
  lastSettingItem: { // Style for the last item in a section to remove its bottom border
    borderBottomWidth: 0,
  },
  settingIcon: {
    marginRight: 15,
    width: 24,
  },
  settingText: {
    fontFamily: 'sans-serif',
    fontSize: 16,
    color: '#333333',
    flex: 1,
  },

  logoutButton: {
    backgroundColor: '#DC3545',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#DC3545',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  logoutButtonText: {
    fontFamily: 'sans-serif',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  versionInfo: {
    marginTop: 20,
    alignItems: 'center',
  },
  versionText: {
    fontFamily: 'sans-serif',
    fontSize: 12,
    color: '#AAAAAA',
  },
});