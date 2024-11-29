import { StyleSheet, View, Text, Button, ScrollView, TouchableOpacity } from "react-native";
import { Transaction } from "../models/transactions";
import TransactionHistory from "../components/TransactionHistory";
import { useEffect, useRef, useState } from "react";
import MonthlyChart from "../components/MonthlyChart";

const HomeScreen = ({ route }: { route: { params: { transactions: Transaction[] } } }) => {
    const { transactions } = route.params;

    const [currentMonth, setCurrentMonth] = useState(transactions[0].date.getMonth());
    const [currentYear, setCurrentYear] = useState(transactions[0].date.getFullYear());

    const getMonthlyTransactions = (month: number, year: number): Transaction[] => {
        return transactions.filter(transaction => {
            const date = transaction.date;
            return date.getMonth() === month && date.getFullYear() === year;
        });
    }

    const months = getLast12Months(transactions[0].date);

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
            <Text style={styles.h1}>Welcome.</Text>
            <MonthlyChart transactions={getMonthlyTransactions(currentMonth, currentYear)} />
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
        // flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
