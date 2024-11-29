import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Transaction } from "../models/transactions";
import TransactionHistory from "../components/TransactionHistory";
import { useEffect, useRef, useState } from "react";
import MonthlyChart from "../components/MonthlyChart";
import { useNavigation } from "@react-navigation/native";
import { StackParams } from "../App";
import { NavigationProp } from "@react-navigation/native";

// Define navigation type for All Transactions
type AllTransactionsNavigationProp = NavigationProp<
    StackParams,
    "All Transactions"
>;

const HomeScreen = ({ route }: { route: { params: { transactions: Transaction[] } } }) => {
    const { transactions } = route.params;
    const navigation = useNavigation<AllTransactionsNavigationProp>();

    const [currentMonth, setCurrentMonth] = useState(transactions[0].date.getMonth());
    const [currentYear, setCurrentYear] = useState(transactions[0].date.getFullYear());

    /**
     * Navigate to All Transactions screen
     */
    const handleViewAll = (): void => {
        navigation.navigate("All Transactions", { transactions });
    }

    /**
     * Get all transactions that occurred in given month and year
     * @param month Month to get transactions
     * @param year Year to get transactions
     * @returns List of transactions corresponding to given month and year
     */
    const getMonthlyTransactions = (month: number, year: number): Transaction[] => {
        return transactions.filter(transaction => {
            const date = transaction.date;
            return date.getMonth() === month && date.getFullYear() === year;
        });
    }

    const months = getLast12Months(transactions[0].date);

    /**
     * Handles user selecting a month from nav slider
     * @param month Selected month
     * @param year Selected year
     */
    const handleSelectMonth = (month: number, year: number) => {
        setCurrentMonth(month);
        setCurrentYear(year);
    }

    // Ref for the ScrollView
    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        // Scroll to the end of the ScrollView when the component mounts
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.h1}>Welcome</Text>
            <MonthlyChart transactions={getMonthlyTransactions(currentMonth, currentYear)} />
            <View style={styles.heading}>
                <Text style={styles.headingText}>Monthly Transactions</Text>
                <TouchableOpacity style={styles.headingButton} onPress={handleViewAll}>
                    <Text>View All</Text>
                </TouchableOpacity>
            </View>
            <ScrollView 
            horizontal={true} 
            contentContainerStyle={styles.slider}
            ref={scrollViewRef}
            showsHorizontalScrollIndicator={false}
            >
                {months.map((month, index) => (
                <TouchableOpacity key={index} onPress={() => handleSelectMonth(month.num, month.year)}>
                    <Text style={[styles.sliderButton, currentMonth === month.num ? styles.selectedMonth : styles.nonselectedMonth]}>{month.month}</Text>
                </TouchableOpacity>
                ))}
            </ScrollView>
                <TransactionHistory transactions={getMonthlyTransactions(currentMonth, currentYear)} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "stretch",
        backgroundColor: "#fff",
    },
    h1: {
        fontSize: 30,
        fontWeight: 700,
        textAlign: "left",
        width: "100%",
        paddingLeft: 20,
        paddingTop: 20,
        paddingBottom: 20
    },
    heading: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 15,
    },
    headingText: {
        fontSize: 20
    },
    headingButton: {
        borderRadius: 20,
        backgroundColor: "#d4d4d4",
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    slider: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginBottom: 10,
    },
    sliderButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginHorizontal: 5,
    },
    selectedMonth: {
        backgroundColor: "#9575ff",
        color: "#fff",
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "#9575ff",
    },
    nonselectedMonth: {
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "#9575ff",
    }
});

// <===== HELPER FUNCTIONS =====>

const getLast12Months = (referenceDate: Date): { month: string, year: number, num: number }[] => {
    const months = [];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    for (let i = 0; i < 12; i++) {
        const date = new Date(referenceDate);
        date.setMonth(date.getMonth() - i);

        months.unshift({ // Add to the beginning to ensure correct order
            month: monthNames[date.getMonth()],
            year: date.getFullYear(),
            num: date.getMonth(),
        });
    }

    return months;
};

export default HomeScreen;
