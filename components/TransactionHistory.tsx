import { FlatList, Text, StyleSheet, View, RefreshControl } from "react-native";
import { Transaction } from "../models/transactions";
import TransactionView from "./TransactionView";
import { useCallback, useState } from "react";

const TransactionHistory = ({ transactions }: { transactions: Transaction[] }) => {
    const [refreshing, setRefreshing] = useState(false);

    /**
     * Handles on refresh with timeout of 1000 ms.
     */
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
        }, 1000);
    }, []);

    return transactions.length > 0 ? (
        <FlatList 
        style={styles.container}
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={transactions}
        renderItem={({item}) => <TransactionView transaction={item} />}
            />
    ) : (
        <Text style={styles.emptyList}>No transactions this month</Text>
    );
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
