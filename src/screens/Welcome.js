import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

export default function WelcomeScreen() {
  const navigation = useNavigation(); // ✅ FIXED

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1697320777464-4db89a223861?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        }}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <View style={styles.overlay} />

        {/* Top Navigation Bar */}
        <View style={styles.topNav}>
          <Icon name="menu" size={28} color="#FFFFFF" />
          <Text style={styles.welcomeText}>WELCOME</Text>
        </View>

        {/* Title Block */}
        <View style={styles.titleContainer}>
          <Text style={styles.titleBold}>CEASAR</Text>
          <View style={styles.underline} />
          <Text style={styles.title}>PASTRIES APP</Text>
          <View style={styles.underline} />
        </View>

        {/* Welcome Message */}
        <Text style={styles.description}>
          Baking is a science, but cooking is an art. Pastries  blend both
        </Text>
        <View style={styles.buttonConflex}>
        {/* Register Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.buttonText}>Register now</Text>
        </TouchableOpacity>

        {/* Explore Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>Explore now</Text>
        </TouchableOpacity>
         </View>
         {/* Login Button */}
        <TouchableOpacity
          style={styles.login}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  topNav: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  welcomeText: {
    position: 'absolute',
    alignSelf: 'center',
    color: '#FFFFFF',
    fontSize: 18,
    letterSpacing: 2,
    fontWeight: '500'
  },
  titleContainer: {
    marginTop: 120,
    alignItems: 'center'
  },
  titleBold: {
    fontSize: 38,
    fontWeight: 'bold',
    color: 'aliceblue'
  },
  title: {
    fontSize: 38,
    fontWeight: '400',
    color: 'aliceblue',
    marginTop: 5
  },
  underline: {
    width: '40%',
    height: 2,
    backgroundColor: 'aliceblue',
    marginTop: 5
  },
  description: {
    marginTop: 30,
    color: '#FFFFFF',
    fontSize: 20,
    lineHeight: 28,
    textAlign: 'center',
    paddingHorizontal: 35
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 45,
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin:10,
    // color: '#FFC073',
  },
  login: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 45,
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin:10,
  },
  buttonConflex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop: 20,
    width: '70%',
    alignSelf: 'center',
    // backgroundColor: 'red',
  },

  buttonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333333',
    textAlign: 'center',
  }
});


