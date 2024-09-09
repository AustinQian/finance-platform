import { config } from "dotenv";
import { subDays } from "date-fns";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { categories, accounts, transactions } from "@/db/schema"

config ({ path: ".env.local"});

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

const SEED_USER_ID = "user_2gOWaPV3XEq7ylHLc3bceKdqPDi"
const SEED_CATEGORIES = [
    { id: "category_1", name: "food", userId: SEED_USER_ID, plaidId: null },
    { id: "category_2", name: "recreation", userId: SEED_USER_ID, plaidId: null },
    { id: "category_3", name: "living", userId: SEED_USER_ID, plaidId: null },
];

const defaultTo = new Date();
const defaultFrom = subDays(defaultTo, 90);

const SEED_TRANSACTIONS:  typeof transactions.$inferSelect[] = [];

import { eachDayOfInterval, format } from "date-fns";
import { converAmountToMiliunites } from "@/lib/utils";

const generateRandomAmount = (category: typeof categories.$inferInsert) => {
    switch (category.name) {
        case "food":
            return Math.random() * 50 + 90;
        case "recreation":
            return Math.random() * 70 + 40;
        case "living":
            return Math.random() * 200 + 100;
        default:
            return Math.random() * 50 + 10;
    }
};

const generateTransactionsForDay = (day: Date) => {
    const numTransactions = Math.floor(Math.random() * 4) + 1; //let's say 1 to 4 transactions per day
    for (let i = 0; i<numTransactions; i++) {
        const category = SEED_CATEGORIES[Math.floor(Math.random() * SEED_CATEGORIES.length)];
        const isExpense = Math.random() > 0.6; //60% chance to be an expense
        const amount = generateRandomAmount(category);
        const formattedAmount = converAmountToMiliunites(isExpense ? -amount : amount); //-amount for amount of expense

        SEED_TRANSACTIONS.push({
            id: `transaction_${format(day, "yyyy-MM-dd")}_${i}`,
            accountId: SEED_USER_ID, // use SEED_USER_ID instead of SEED_ACCOUNTS[0].id,
            categoryId: category.id,
            date: day,
            amount: formattedAmount,
            payee: "MerchantTest",
            notes: "Random for test purpose"
        });
    }
};

const generateTransactions = () => {
    const days = eachDayOfInterval({ start:defaultFrom, end: defaultTo });
    days.forEach(day => generateTransactionsForDay(day));
};

generateTransactions();

const main = async () => {
    try {
        await db.delete(transactions).execute;
        //await db.delete(accounts).execute;
        await db.delete(categories).execute;
        //seed categories
        await db.insert(categories).values(SEED_CATEGORIES).execute();
        //await db.insert(accounts).values(SEED_USER_ID).execute();
        await db.insert(transactions).values(SEED_TRANSACTIONS).execute();        
    }
    catch (error) {
        console.error("Error during seed:", error);
        process.exit(1);
    }
};

main();