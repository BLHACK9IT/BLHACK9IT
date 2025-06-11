import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { AuthAPI, handleApiError } from '../../utils/api'; // Adjust the import path as necessary

export default function Register({ navigation }) {
  const [form, setForm] = useState({
    username: '',
    email: '',
    fullName: '',
    phone: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    // Clear validation error when user types
    if (validationErrors[field]) {
      setValidationErrors({ ...validationErrors, [field]: null });
    }
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    // Check required fields
    if (!form.username.trim()) {
      errors.username = 'Username is required';
      isValid = false;
    } else if (form.username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
      isValid = false;
    }

    if (!form.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        errors.email = 'Please enter a valid email address';
        isValid = false;
      }
    }

    if (!form.fullName.trim()) {
      errors.fullName = 'Full name is required';
      isValid = false;
    }

    if (!form.phone.trim()) {
      errors.phone = 'Phone number is required';
      isValid = false;
    } else {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(form.phone.replace(/\s/g, ''))) {
        errors.phone = 'Please enter a valid phone number';
        isValid = false;
      }
    }

    if (!form.password) {
      errors.password = 'Password is required';
      isValid = false;
    } else {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!passwordRegex.test(form.password)) {
        errors.password = 'Password must be at least 8 characters with uppercase, lowercase, and numbers';
        isValid = false;
      }
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleSignUp = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);
      
      const result = await AuthAPI.register({
        username: form.username,
        email: form.email,
        fullname: form.fullName,
        phone: form.phone,
        password: form.password
      });
      
      if (result.error) {
        throw new Error(result.message);
      }
      
      Alert.alert('Success', 'Account created successfully!', [
        { text: 'OK', onPress: () => navigation.navigate('Login') }
      ]);
      
    } catch (error) {
      console.error('Registration error:', error);
      
      if (error.message === 'Network Error') {
        Alert.alert(
          'Network Error',
          'Unable to connect to the server. Please check your internet connection and try again.'
        );
      } else {
        Alert.alert(
          'Registration Failed',
          handleApiError(error) || 'An unexpected error occurred. Please try again.'
        );
      }
    } finally {
      setIsLoading(false);
    }   
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="a09a93" />
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Header */}
            <View style={styles.headerSection}>
              <Text style={styles.screenTitle}>Sign Up</Text>
              <Text style={styles.screenSubtitle}>Add your details to sign up</Text>
            </View>

            {/* Input Fields */}
            <View style={styles.inputFieldsContainer}>
              <TextInput
                placeholder="Username"
                placeholderTextColor="#AAAAAA"
                style={[styles.textInput, validationErrors.username && styles.errorInput]}
                value={form.username}
                onChangeText={(text) => handleChange('username', text)}
                autoCapitalize="none"
                autoCorrect={false}
              />
              {validationErrors.username && (
                <Text style={styles.errorText}>{validationErrors.username}</Text>
              )}

              <TextInput
                placeholder="Email"
                placeholderTextColor="#AAAAAA"
                keyboardType="email-address"
                style={[styles.textInput, validationErrors.email && styles.errorInput]}
                value={form.email}
                onChangeText={(text) => handleChange('email', text)}
                autoCapitalize="none"
                autoCorrect={false}
              />
              {validationErrors.email && (
                <Text style={styles.errorText}>{validationErrors.email}</Text>
              )}

              <TextInput
                placeholder="Full Name"
                placeholderTextColor="#AAAAAA"
                style={[styles.textInput, validationErrors.fullName && styles.errorInput]}
                value={form.fullName}
                onChangeText={(text) => handleChange('fullName', text)}
                autoCapitalize="words"
              />
              {validationErrors.fullName && (
                <Text style={styles.errorText}>{validationErrors.fullName}</Text>
              )}

              <TextInput
                placeholder="Phone Number"
                placeholderTextColor="#AAAAAA"
                keyboardType="phone-pad"
                style={[styles.textInput, validationErrors.phone && styles.errorInput]}
                value={form.phone}
                onChangeText={(text) => handleChange('phone', text)}
              />
              {validationErrors.phone && (
                <Text style={styles.errorText}>{validationErrors.phone}</Text>
              )}

              <TextInput
                placeholder="Password"
                placeholderTextColor="#AAAAAA"
                secureTextEntry
                style={[styles.textInput, validationErrors.password && styles.errorInput]}
                value={form.password}
                onChangeText={(text) => handleChange('password', text)}
                autoCapitalize="none"
              />
              {validationErrors.password && (
                <Text style={styles.errorText}>{validationErrors.password}</Text>
              )}
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity 
              style={[styles.signUpButton, isLoading && styles.buttonDisabled]} 
              onPress={handleSignUp}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.buttonText}>Sign Up</Text>
              )}
            </TouchableOpacity>

            {/* Login Link */}
            <View style={styles.loginLinkContainer}>
              <Text style={styles.loginText}>
                Already have an Account?{' '}
                <Text
                  style={styles.loginLink}
                  onPress={() => navigation?.navigate('Login')}
                >
                  Login
                </Text>
              </Text>
            </View>

            {/* Back Button with Arrow */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation?.goBack()}
            >
              <Ionicons name="arrow-back" size={20} color="#64381e" />
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: 'a09a93',
  },
  container: {
    flex: 1,
    backgroundColor: 'a09a93',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 25,
  },
  headerSection: {
    marginBottom: 30,
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
  },
  screenSubtitle: {
    fontSize: 16,
    color: '#333333',
    marginTop: 10,
    textAlign: 'center',
  },
  inputFieldsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  textInput: {
    backgroundColor: '#E7E7E7',
    borderRadius: 30,
    minHeight: 60,
    width: '100%',
    paddingHorizontal: 25,
    paddingVertical: 15,
    fontSize: 16,
    color: '#333333',
    marginBottom: 5,
    textAlignVertical: 'top',
  },
  errorInput: {
    borderWidth: 1,
    borderColor: '#64381e',
  },
  errorText: {
    color: '#64381e',
    fontSize: 14,
    marginBottom: 15,
    marginLeft: 25,
    alignSelf: 'flex-start',
  },
  signUpButton: {
    backgroundColor: '#64381e',
    borderRadius: 50,
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#64381e',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginLinkContainer: {
    marginTop: 25,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
    color: '#333333',
  },
  loginLink: {
    color: '#64381e',
    fontWeight: 'bold',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#64381e',
  },
  backButtonText: {
    color: '#64381e',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});