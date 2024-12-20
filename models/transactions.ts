import fs from 'fs';
import path from 'path';

// <===== CONSTANTS =====>

// Transaction categories
const CATEGORIES = [
    'Groceries',
    'Transportation',
    'Food',
    'Shopping',
    'Salary',
];

// Price ranges
const MIN_EXPENSE = 1;
const MAX_EXPENSE = 100;
const SALARY = 6000;

// TRANSACTION MODEL
export type Transaction = {
    amount: number;
    date: Date;
    category: string;
    desc: string;
    type: string;
};

// Sample Transaction data
const transactionHistory: Transaction[] = [];


// <===== HELPER FUNCTIONS =====>

/**
 * Generates a single transaction randomly.
 */
const generateTransaction = (): Transaction => {
    // Randomly generate transaction details
    const date = generateRandomDate(new Date(2024, 0, 1), new Date());
    const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];

    // Generate type and amount according to category
    const type = category === "Salary" ? "credit" : "debit";
    const amount = category === "Salary" ? SALARY : Math.floor(Math.random() * MAX_EXPENSE) + MIN_EXPENSE;
    const desc = category === "Salary" ? "Monthly salary" : `Spent $${amount}.00 on ${category}`;

    const newTransaction: Transaction = {
        amount: amount,
        date: date,
        category: category,
        desc: desc,
        type: type
    };

    return newTransaction;
}

/**
 * Populates the transaction history with randomly generated transactions.
 * @param numTransactions Number of transactions to populate history with.
 */
const populateHistory = (numTransactions: number): void => {
    for (let i = 0; i < numTransactions; i++) {
        transactionHistory.push(generateTransaction());
    }

    // Sort transaction history by descending date
    transactionHistory.sort((a, b) => b.date.getTime() - a.date.getTime());
}

/**
 * Generates a random date within the given range
 * @param start Start date
 * @param end End date
 * @returns A random date and timestamp in between start and end
 */
const generateRandomDate = (start: Date, end: Date): Date => {
    const startTime = start.getTime();
    const endTime = end.getTime();
    const randomTime = Math.random() * (endTime - startTime) + startTime;

    return new Date(randomTime);
}

/**
 * Generates sample transaction data and writes sample data to a JSON file.
 * Output file can be found in path root/data/transactions.json.
 */
const writeTransactionsToFile = (): void => {
    // Generates 20 by default
    populateHistory(20);

    const fileName = 'transactions.json';
    const dirPath = path.resolve(__dirname, '../data');
    const filePath = path.join(dirPath, fileName);
    const data = JSON.stringify(transactionHistory, null, 2);

    try {
        // Check data directory exists in root
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }

        fs.writeFileSync(filePath, data, 'utf-8');
        console.log(`Sample data successfully written to ${filePath}`);
    } catch (error) {
        console.error('Error writing transaction data to file:', error);
    }
};

writeTransactionsToFile();
