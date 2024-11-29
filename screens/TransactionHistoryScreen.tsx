import TransactionHistory from "../components/TransactionHistory";
import { Transaction } from "../models/transactions";

const TransactionHistoryScreen = ({ route }: { route: { params: { transactions: Transaction[] } } }) => {
    const { transactions } = route.params;
    
    return (
        <TransactionHistory transactions={transactions} />
    );
}

export default TransactionHistoryScreen;
