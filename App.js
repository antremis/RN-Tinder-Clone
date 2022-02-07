import { NavigationContainer } from '@react-navigation/native';
import AuthContextProvider from './context/AuthContext';
import CardContextProvider from './context/CardContext';
import UserContextProvider from './context/UserContext';
import StackNavigator from './navigation/stack';
console.warn = () => {}

export default function App() {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <UserContextProvider>
          <CardContextProvider>
            <StackNavigator />
          </CardContextProvider>
        </UserContextProvider>
      </AuthContextProvider>
    </NavigationContainer>
  );
}