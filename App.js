import { Text, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { CartProvider } from './src/context/CartContext';
import 'react-native-gesture-handler';


export default function App() {
  return (

     <CartProvider>
      {/* Your NavigationContainer or Navigator here */}

    <NavigationContainer>
      <SafeAreaView style={styles.container}>
     
        {/* Optional: You can keep your example card below the navigation if needed */}
      <AppNavigator />
      </SafeAreaView>
    </NavigationContainer>

    </CartProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    margin: 16,
    padding: 16,
  },
});