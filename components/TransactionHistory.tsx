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

    const transactionsByDate = getTransactionsByDate(transactions);

    return transactionsByDate.length > 0 ? (
        <View style={styles.container}>
            <FlatList
            data={transactionsByDate}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({ item }) => 
                <View style={styles.dateContainer}>
                    <Text style={styles.dateHeading}>{item[0].date.toDateString()}</Text>
                    <FlatList 
                    style={styles.container}
                    data={item}
                    renderItem={({item}) => <TransactionView transaction={item} />}
                    />
                </View>
            }
            />
        </View>
    ) : (
        <Text style={styles.emptyList}>No transactions this month</Text>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        // maxHeight: "45%",
    },
    emptyList: {
        backgroundColor: "#fff",
        paddingTop: 10,
        width: "100%",
        textAlign: "center"
    },
    dateHeading: {
        fontWeight: 700,
        paddingLeft: 20,
    },
    dateContainer: {
        marginVertical: 10,
        flex: 1,
    }
});

// <===== HELPER FUNCTIONS =====>

/**
 * Groups a list of transactions by date
 * @param transactions Transactions to group by date
 * @returns A double array of transactions grouped by date
 */
const getTransactionsByDate = (transactions: Transaction[]): Transaction[][] => {
    const transactionsByDate: Transaction[][] = [];

    // Group dates with map
    const dateMap = new Map();
    transactions.forEach((transaction) => {
        const date = transaction.date.toLocaleDateString();
        if (!dateMap.has(date)) {
            dateMap.set(date, []);
        }
        dateMap.get(date).push(transaction);
    });

    // Create double array with grouped dates
    dateMap.forEach((dateTransactions) => {
        transactionsByDate.push(dateTransactions);
    });

    return transactionsByDate;
}

export default TransactionHistory;
