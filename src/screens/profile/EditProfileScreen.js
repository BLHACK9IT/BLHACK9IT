// screens/Profile/EditProfileScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView, // Added for better UI on different devices
  KeyboardAvoidingView, // To handle keyboard pushing content
  Platform, // To check platform for KeyboardAvoidingView
} from 'react-native';

export default function EditProfileScreen() {
  const [name, setName] = useState('John Doe'); // Placeholder initial value
  const [email, setEmail] = useState('john.doe@example.com'); // Placeholder initial value
  const [phone, setPhone] = useState('123-456-7890'); // Placeholder initial value

  const handleSaveChanges = () => {
    // Here you would typically send the updated data to your backend
    console.log('Saving changes:', { name, email, phone });
    alert('Profile changes saved!');
    // In a real app, you might navigate back or update global state
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <Text style={styles.header}>Edit Profile</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your full name"
            autoCapitalize="words"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            maxLength={15} // Example max length
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F8F8', // Consistent background
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F8F8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    shadowColor: '#000', // Basic shadow for input fields
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  saveButton: {
    backgroundColor: '#FF7F37', // Your app's accent color
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});