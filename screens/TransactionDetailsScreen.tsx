import { View, Text } from "react-native";
import { Transaction } from "../models/transactions";

const TransactionDetailsScreen = ({ route }: { route: { params: { transaction: Transaction } } }) => {
    const transaction = route.params;

    return (
        <View>
            <Text>Transaction Details Screen</Text>
        </View>
    );
}

export default TransactionDetailsScreen;