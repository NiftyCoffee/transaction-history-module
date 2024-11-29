import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { Transaction } from "../models/transactions";
import { useNavigation } from "@react-navigation/native";
import { StackParams } from "../App";
import { NavigationProp } from "@react-navigation/native";
import * as LocalAuthentication from "expo-local-authentication";

// Define navigation type for Transaction Details screen
type TransactionDetailsNavigationProp = NavigationProp<
    StackParams,
    "Transaction Details"
>;

const TransactionView = ({ transaction }: { transaction: Transaction }) => {
    const navigation = useNavigation<TransactionDetailsNavigationProp>();

    // Set icon based on category
    const icon = transaction.category === "Groceries"
    ? require("../assets/icons/groceries-icon.png")
    : transaction.category === "Shopping"
    ? require("../assets/icons/shopping-icon.png")
    : transaction.category === "Food"
    ? require("../assets/icons/food-icon.png")
    : transaction.category === "Transportation"
    ? require("../assets/icons/transportation-icon.png")
    : require("../assets/icons/salary-icon.png");

    const arrowIcon = require("../assets/icons/right-arrow-icon.png");

    /**
     * Authenticates user with biometrics by:
     * 1) Check if biometric authentication is available on the device
     * 2) Check if biometric credentials are saved on the device
     * 3) Authenticates with biometric fingerprint or face ID
     * @returns 
     */
    const handleAuthenticate = async (): Promise<boolean> => {
        try {
            // Check if biometrics are available on the device
            const compatible = await LocalAuthentication.hasHardwareAsync();
            
            if (!compatible) {
                Alert.alert("Your device does not support biometric authentication.");
                return false;
            }

            // Check if biometrics are enrolled on the device
            const enrolled = await LocalAuthentication.isEnrolledAsync();

            if (!enrolled) {
                Alert.alert("No biometric credentials are enrolled on your device.");
                return false;
            }

            // Authenticate
            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: "Authenticate with biometrics",
                fallbackLabel: "Use Passcode",
            });

            if (result.success) {
                return true;
            } else {
                Alert.alert("Authentication failed. Please try again.");
                return false;
            }
        } catch (error) {
            console.error(error);
            Alert.alert("An error occurred while authenticating.");
        }
        // False by default
        return false;
    }

    /**
     * Go navigate to transaction details screen upon card click
     */
    const handleCardClick = async () => {
        const isAuthenticated = await handleAuthenticate();

        // Navigate to transaction details screen if authentication successful
        if (isAuthenticated) {
            navigation.navigate("Transaction Details", { transaction: transaction });
        }
    }

    return (
        <TouchableOpacity style={styles.card} onPress={handleCardClick}>
            <Image source={icon} style={styles.icon} />
            <View style={styles.container}>
                <View>
                    <Text style={styles.category}>{transaction.category}</Text>
                    <Text style={transaction.type === "debit" ? styles.debit : styles.credit}>{transaction.type === "debit" ? "-" : "+"}$***</Text>
                </View>
                {/* <Text style={styles.date}>{transaction.date.toLocaleDateString()}</Text> */}
                <Image source={arrowIcon} style={{ width: 20, height: 20}} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        maxWidth: "100%",
        backgroundColor: "#fff",
        minHeight: 50
    },
    container: {
        position: "relative",
        width: "80%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: 30,
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomColor: "black",
        borderBottomWidth: 0.2
    },
    category: {
        fontSize: 18,
        color: "#000"
    },
    icon: {
        marginLeft: 20,
        marginRight: 20,
        width: 40,
        height: 40
    },
    debit: {
        color: "red"
    },
    credit: {
        color: "green"
    },
    date: {
        color: "#757575"
    }
});

export default TransactionView;
