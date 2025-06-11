import { registerRootComponent } from 'expo';


import { NavigationContainer } from '@react-navigation/native';
import App from './App';

function Root() {
  return (
      <App />

  );
}

registerRootComponent(Root);