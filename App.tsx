import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AuthScreen from './screens/AuthScreen';
import { useState } from 'react';

const RootStack = createNativeStackNavigator();

export default function App() {
  // Keep track of authentication status
  const [authenticated, setAuthenticated] = useState(false);

  /**
   * Set authentication to true.
   */
  const handleAuthentication = (): void => {
    setAuthenticated(true);
  }

  return (
    <NavigationContainer>
      {authenticated ? (
        // If authenticated, serve home page
        <RootStack.Navigator initialRouteName="Home">
        <RootStack.Screen name="Home" component={HomeScreen} />
        </RootStack.Navigator>
      ) : (
        // If not authenticated, perform authentication process
        <AuthScreen onAuthenticated={handleAuthentication} />
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
