
"use strict";

// Variables to store the budget and expense information
let totalBudget = 0;
let rentExpense = 0;
let foodExpense = 0;
let transportExpense = 0;
let otherExpense = 0;
let totalExpenses = 0;
let remainingBalance = 0;

// A string variable for the application name
const appName = "SpendWise";

// A function to collect and validate numeric user input
function getAmount(message) {
    const userInput = prompt(message);

    // Stop if the user presses Cancel
    if (userInput === null) {
        return null;
    }

    const amount = Number(userInput);

    // Accept only valid, non-negative numbers
    if (userInput.trim() === "" ||
        !Number.isFinite(amount) ||
        amount < 0) {
        alert("Please enter a valid amount of zero or more.");
        return null;
    }

    return amount;
}

// Function to calculate the total expenses
function calculateTotalExpenses(rent, food, transport, other) {
    return rent + food + transport + other;
}

// Function to calculate the remaining balance
function calculateRemainingBalance(budget, expenses) {
    return budget - expenses;
}

// Function to format money in Kenyan shillings
function formatCurrency(amount) {
    return "KSh " + amount.toLocaleString("en-KE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Main function that runs the budget tracker
function runSpendWise() {
    // Collect the budget
    const budgetInput = getAmount("Enter your total budget in KSh:");

    if (budgetInput === null) {
        return;
    }

    totalBudget = budgetInput;

    // Collect expense information
    const rentInput = getAmount("Enter your rent expense in KSh:");
    if (rentInput === null) return;
    rentExpense = rentInput;

    const foodInput = getAmount("Enter your food expense in KSh:");
    if (foodInput === null) return;
    foodExpense = foodInput;

    const transportInput = getAmount("Enter your transport expense in KSh:");
    if (transportInput === null) return;
    transportExpense = transportInput;

    const otherInput = getAmount("Enter your other expenses in KSh:");
    if (otherInput === null) return;
    otherExpense = otherInput;

    // Perform calculations using reusable functions
    totalExpenses = calculateTotalExpenses(
        rentExpense,
        foodExpense,
        transportExpense,
        otherExpense
    );

    remainingBalance = calculateRemainingBalance(
        totalBudget,
        totalExpenses
    );

    // Display the results on the webpage
    document.getElementById("budget").textContent =
        formatCurrency(totalBudget);

    document.getElementById("expenses").textContent =
        formatCurrency(totalExpenses);

    document.getElementById("balance").textContent =
        formatCurrency(remainingBalance);

    // Display clearly labeled results in the browser console
    console.clear();
    console.log("===== " + appName + " Budget Report =====");
    console.log("Total Budget: " + formatCurrency(totalBudget));
    console.log("Rent Expense: " + formatCurrency(rentExpense));
    console.log("Food Expense: " + formatCurrency(foodExpense));
    console.log("Transport Expense: " + formatCurrency(transportExpense));
    console.log("Other Expenses: " + formatCurrency(otherExpense));
    console.log("Total Expenses: " + formatCurrency(totalExpenses));
    console.log("Remaining Balance: " + formatCurrency(remainingBalance));

    // Give feedback about the budget
    if (remainingBalance < 0) {
        console.log("Status: You have exceeded your budget.");
        alert("You have exceeded your budget!");
    } else if (remainingBalance === 0) {
        console.log("Status: You have used your entire budget.");
        alert("You have used your entire budget.");
    } else {
        console.log("Status: You are within your budget.");
        alert("Calculation complete! Check your dashboard and console.");
    }
}

// Connect the button to the main function
document.getElementById("calculateBtn").addEventListener("click", runSpendWise);