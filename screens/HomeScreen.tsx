import { StyleSheet, View, Text, FlatList } from "react-native";
import { Transaction } from "../models/transactions";
import TransactionView from "../components/TransactionView";

const HomeScreen = ({ route }: { route: { params: { transactions: Transaction[] } } }) => {
    const { transactions } = route.params;

    return (
        <View style={styles.container}>
            <FlatList 
            data={transactions}
            renderItem={({item}) => <TransactionView transaction={item} />}
             />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default HomeScreen;
