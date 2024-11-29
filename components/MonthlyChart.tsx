import { StyleSheet, View } from "react-native"
import { Transaction } from "../models/transactions"
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryTheme } from "victory-native";

const MonthlyChart = ({ transactions }: { transactions: Transaction[] }) => {

    // Calculates the total income for the month
    const income = transactions
    .filter(transaction => transaction.type === "credit")
    .reduce((total, transaction) => total + transaction.amount, 0);

    // Calculates the total expenses for the month
    const expenses = transactions
    .filter(transaction => transaction.type === "debit")
    .reduce((total, transaction) => total + transaction.amount, 0);

    // Format data for chart
    const data = [
        {
            name: "Income",
            value: income
        },
        {
            name: "Expenses",
            value: expenses
        }
    ]

    return (
        <View style={styles.container}>
            <VictoryChart 
                theme={VictoryTheme.material}
                domainPadding={85} 
                domain={{ y: [0, Math.max(income, expenses) * .4] }}
                height={200}>
                <VictoryAxis 
                    tickValues={["Income", "Expenses"]} 
                    tickFormat={["Income", "Expenses"]}
                    style={{ 
                        grid: { stroke: "transparent" },
                        ticks: { stroke: "transparent" },
                        tickLabels: { fontSize: 16 },
                        axis: { stroke: "transparent" }
                    }} />
                <VictoryBar
                    data={data}
                    x="name"
                    y="value"
                    style={{ data: { fill: "#9575ff" } }}
                    barWidth={60}
                    cornerRadius={5}
                    labels={({ datum }) => datum.name === "Expenses" ? `-$${datum.value}` : `$${datum.value}`}
                    labelComponent={<VictoryLabel style={{ fontSize: 16 }} />}
                />
            </VictoryChart>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
});

export default MonthlyChart;
