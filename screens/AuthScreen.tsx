import { useEffect } from "react";
import { StyleSheet, View, Text, Alert, Button, TouchableOpacity } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

const AuthScreen = ({ onAuthenticated }: { onAuthenticated: () => void }) => {
    useEffect(() => {
        // Automatically triggers authentication process upon page loading
        handleAuthenticate();
    }, []);

    /**
     * Authenticates user with biometrics by:
     * 1) Check if biometric authentication is available on the device
     * 2) Check if biometric credentials are saved on the device
     * 3) Authenticates with biometric fingerprint or face ID
     * @returns 
     */
    const handleAuthenticate = async (): Promise<void> => {
        try {
            // Check if biometrics are available on the device
            const compatible = await LocalAuthentication.hasHardwareAsync();
            
            if (!compatible) {
                Alert.alert("Your device does not support biometric authentication.");
                return;
            }

            // Check if biometrics are enrolled on the device
            const enrolled = await LocalAuthentication.isEnrolledAsync();

            if (!enrolled) {
                Alert.alert("No biometric credentials are enrolled on your device.");
                return;
            }

            // Authenticate
            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: "Authenticate with biometrics",
                fallbackLabel: "Use Passcode",
            });

            if (result.success) {
                // If successful, set authenticated variable to true via prop passed by parent
                onAuthenticated();
            } else {
                Alert.alert("Authentication failed. Please try again.");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("An error occurred while authenticating.");
        }
    }

    return (
        <View style={styles.container}>
            <Text>Please authenticate to proceed.</Text>
            <TouchableOpacity onPress={handleAuthenticate} style={styles.authenticateButton}>
                <Text style={{ color: "#fff" }}>Authenticate</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    authenticateButton: {
        borderRadius: 20,
        backgroundColor: "#9575ff",
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginVertical: 20
    }
})

export default AuthScreen;
