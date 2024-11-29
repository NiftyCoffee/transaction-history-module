import { StyleSheet } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AuthScreen from './screens/AuthScreen';
import { useState } from 'react';
import transactions from './data/transactions.json';
import { Transaction } from './models/transactions';
import TransactionDetailsScreen from './screens/TransactionDetailsScreen';

export type StackParams = {
  Home: { transactions: Transaction[] };
  "Transaction Details": { transaction: Transaction };
};

const Stack = createNativeStackNavigator<StackParams>();

// Format date string back to date to match type
const formattedTransactions: Transaction[] = transactions.map((transaction: any) => {
  return {
    ...transaction,
    date: new Date(transaction.date)
  };
});

// Customize background color of app
const navTheme = DefaultTheme;
navTheme.colors.background = "#fff";

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
    <NavigationContainer theme={navTheme}>
      {authenticated ? (
        // If authenticated, serve home page
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          initialParams={{ transactions: formattedTransactions }}
          />
          <Stack.Screen
          name="Transaction Details"
          component={TransactionDetailsScreen}
          />
        </Stack.Navigator>
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
