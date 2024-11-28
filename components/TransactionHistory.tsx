import { FlatList, Text, StyleSheet, View } from "react-native";
import { Transaction } from "../models/transactions";
import TransactionView from "./TransactionView";

const TransactionHistory = ({ transactions }: { transactions: Transaction[] }) => {
    return transactions.length > 0 ? (
        <FlatList 
        style={styles.container}
        data={transactions}
        renderItem={({item}) => <TransactionView transaction={item} />}
            />
    ) : (
        <Text style={styles.emptyList}>No transactions this month</Text>
    );
    // <View style={styles.container}>
    //     {transactions.length > 0 ? 
    //     <FlatList 
    //     data={transactions}
    //     renderItem={({item}) => <TransactionView transaction={item} />}
    //     /> 
    //     : <Text style={styles.emptyList}>No transactions this month</Text>}
    // </View>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
    }, 
    emptyList: {
        backgroundColor: "#fff",
        paddingTop: 10,
        width: "100%",
        textAlign: "center"
    }
})

export default TransactionHistory;
