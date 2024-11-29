import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Transaction } from "../models/transactions";
import { useNavigation } from "@react-navigation/native";
import { StackParams } from "../App";
import { NavigationProp } from "@react-navigation/native";

// Define navigation type for Transaction Details screen
type TransactionDetailsNavigationProp = NavigationProp<
    StackParams,
    "Transaction Details"
>;

const TransactionView = ({ transaction }: { transaction: Transaction }) => {
    const navigation = useNavigation<TransactionDetailsNavigationProp>();

    // Set icon based on category
    const icon = transaction.category === "Groceries"
    ? require("../assets/groceries-icon.png")
    : transaction.category === "Shopping"
    ? require("../assets/shopping-icon.png")
    : transaction.category === "Food"
    ? require("../assets/food-icon.png")
    : transaction.category === "Transportation"
    ? require("../assets/transportation-icon.png")
    : require("../assets/salary-icon.png");

    /**
     * Go navigate to transaction details screen upon card click
     */
    const handleCardClick = () => {
        navigation.navigate("Transaction Details", { transaction: transaction });
    }

    return (
        <TouchableOpacity style={styles.card} onPress={handleCardClick}>
            <Image source={icon} style={styles.icon} />
            <View style={styles.container}>
                <View>
                    <Text style={styles.category}>{transaction.category}</Text>
                    <Text style={transaction.type === "debit" ? styles.debit : styles.credit}>{transaction.type === "debit" ? "-" : "+"}${transaction.amount}.00</Text>
                </View>
                <Text style={styles.date}>{transaction.date.toLocaleDateString()}</Text>
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
        backgroundColor: "#fff"
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
