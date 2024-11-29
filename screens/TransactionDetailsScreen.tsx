import { StyleSheet, View, Text, Image } from "react-native";
import { Transaction } from "../models/transactions";

const TransactionDetailsScreen = ({ route }: { route: { params: { transaction: Transaction } } }) => {
    const transaction = route.params.transaction;

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

    return (
        <View style={styles.container}>
            <Image source={icon} style={styles.icon} />
            <Text style={styles.category}>{transaction.category}</Text>
            <Text style={styles.date}>{transaction.date.toDateString()}</Text>
            <Text style={[styles.amount, transaction.type === "debit" ? styles.debit : styles.credit]}>{transaction.type === "debit" ? "-" : "+"}${transaction.amount}.00</Text>
            <Text style={styles.desc}>{transaction.desc}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
        paddingTop: 80
    },
    icon: {
        width: 60,
        height: 60,
        marginVertical: 15,
    },
    category: {
        fontSize: 20,
    },
    amount: {
        fontSize: 40,
        marginVertical: 20
    },
    desc: {
        fontSize: 20
    },
    date: {
        fontSize: 20,
        color: "#757575"
    },
    credit: {
        color: "green"
    },
    debit: {
        color: "red"
    }
});

export default TransactionDetailsScreen;
