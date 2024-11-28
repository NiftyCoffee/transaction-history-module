import { StyleSheet, View, Text } from "react-native"
import { Transaction } from "../models/transactions"

const MonthlyChart = ({ transactions }: { transactions: Transaction[] }) => {

    // Calculates the total income for the month
    const income = transactions
    .filter(transaction => transaction.type === "credit")
    .reduce((total, transaction) => total + transaction.amount, 0);

    // Calculates the total expenses for the month
    const expenses = transactions
    .filter(transaction => transaction.type === "debit")
    .reduce((total, transaction) => total + transaction.amount, 0);

    return (
        <View style={styles.container}>
            <Text>Income: {income}</Text>
            <Text>Expenses: {expenses}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
    }
})

export default MonthlyChart;
