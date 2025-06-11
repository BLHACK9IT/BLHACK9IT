import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../screens/Welcome';

import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';

import Home from '../screens/home/Home';
import AuthStack from './AuthStack';
import ProductList from '../screens/home/ProductList';
import ProductDetail from '../screens/home/ProductDetail';
import Cart from '../screens/home/Cart';
import DrawerNavigator from './DrawerNavigator';
import Notifications from '../screens/home/Notification';
import Profile from '../screens/profile/Profile';
// import EditProfile from '../screens/profile/EditProfile';
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={Welcome} />

      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ProductList" component={ProductList} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Notifications" component={Notifications} />
      {/* Auth Stack for login and registration */}
      <Stack.Screen name="Main" component={DrawerNavigator} />
      <Stack.Screen name="Profile" component={Profile} />
      {/* <Stack.Screen name="EditProfile" component={EditProfile} /> */}
      {/* Add more screens as needed */}


      <Stack.Screen name="AuthStack" component=
      {AuthStack} />
    </Stack.Navigator>
  );
};

export default AppNavigator;