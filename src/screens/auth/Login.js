import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  Platform,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthAPI, handleApiError } from '../../utils/api'; // Adjust the import path as necessary

export default function Login({ navigation }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    // Clear validation error when user types
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    // Email validation
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

    // Password validation
    if (!form.password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (form.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const { data } = await AuthAPI.login(form.email, form.password);
      
      // Success - handle user data
      console.log('Login successful:', data);
      navigation.navigate('Home', { user: data });
      
    } catch (error) {
      console.error('Login error:', error);
      
      if (error.message === 'Network Error') {
        Alert.alert(
          'Network Error',
          'Unable to connect to the server. Please check your internet connection and try again.'
        );
      } else {
        Alert.alert(
          'Login Failed', 
          handleApiError(error) || 'Invalid email or password',
          [{ text: 'OK', onPress: () => setForm(prev => ({ ...prev, password: '' })) }]
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F0F0F0" />

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContainer} 
            keyboardShouldPersistTaps="handled"
          >
            {/* Header Section */}
            <View style={styles.headerSection}>
              <Text style={styles.screenTitle}>Login</Text>
              <Text style={styles.screenSubtitle}>Add your details to login</Text>
            </View>

            {/* Input Fields */}
            <View style={styles.inputFieldsContainer}>
              <TextInput
                placeholder="Your Email"
                placeholderTextColor="#AAAAAA"
                keyboardType="email-address"
                autoCapitalize="none"
                style={[styles.textInput, validationErrors.email && styles.errorInput]}
                value={form.email}
                onChangeText={(text) => handleChange('email', text)}
              />
              
              {validationErrors.email && (
                <View style={styles.Errorcon}>
                <Text style={styles.errorText}>{validationErrors.email}</Text>
                </View>
              )}

              <TextInput
                placeholder="Password"
                placeholderTextColor="#AAAAAA"
                secureTextEntry
                style={[styles.textInput, validationErrors.password && styles.errorInput]}
                value={form.password}
                onChangeText={(text) => handleChange('password', text)}
              />
              {validationErrors.password && (
                 <View style={styles.Errorcon}>
                <Text style={styles.errorText}>{validationErrors.password}</Text>
                </View>
              )}
            </View>

            {/* Login Button */}
            <TouchableOpacity 
              style={[styles.loginButton, isLoading && styles.buttonDisabled]} 
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.loginButtonText}>Login</Text>
              )}
            </TouchableOpacity>

            {/* Forgot Password Link */}
            <TouchableOpacity
              onPress={() => navigation?.navigate('ForgotPassword')}
              style={styles.forgotPasswordLinkContainer}
              activeOpacity={0.7}
            >
              <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
            </TouchableOpacity>

            {/* Signup Link */}
            <View style={styles.signupLinkContainer}>
              <Text style={styles.signupText}>
                Don't have an Account?{' '}
                <Text
                  style={styles.signupLink}
                  onPress={() => navigation?.navigate('Register')}
                >
                  Sign Up
                </Text>
              </Text>
            </View>

            {/* Back Button with Arrow */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
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
  // Container Styles
  safe: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 20, // Added for consistent side padding
  },

  // Scroll Container
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
    width: '100%',
  },

  // Header Section
  headerSection: {
    marginBottom: 25,
    width: '100%',
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 8,
  },
  screenSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },

  // Input Fields
  inputFieldsContainer: {
    width: '100%',
    marginBottom: 15,
  },
  textInput: {
    backgroundColor: '#E7E7E7',
    borderRadius: 30,
    height: 56,
    width: '100%',
    paddingHorizontal: 25,
    fontSize: 16,
    color: '#333',
    marginBottom:5 ,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  errorInput: {
    borderColor: '#64381e',
  },

  // Error Handling
  errorContainer: {
    
    marginLeft: 20,
    alignSelf: 'flex-start',
  },
  errorText: {
    color: '#64381e',
    fontSize: 14,
    marginLeft:25,
    marginBottom:25,

  },

  // Buttons
  loginButton: {
    backgroundColor: '#64381e',
    borderRadius: 30,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#64381e',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    width: '100%',
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.6,
  },

  // Links
  forgotPasswordLinkContainer: {
    marginTop: 15,
    alignSelf: 'center',
  },
  forgotPasswordText: {
    fontSize: 15,
    color: '#666',
  },
  signupLinkContainer: {
    marginTop: 25,
  },
  signupText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  signupLink: {
    color: '#64381e',
    fontWeight: '600',
  },

  // Back Button
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#64381e',
    alignSelf: 'center',
  },
  backButtonText: {
    color: '#64381e',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});