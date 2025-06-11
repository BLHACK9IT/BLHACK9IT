import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import ResetPassword from '../screens/auth/ResetPassword';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
};

export default AuthStack;