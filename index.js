#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// const currency:any = {
//     USD: 1, // base currency
//     EUR: 0.91,
//     INR: 73.65,
//     PKR: 280,
//     GBP: 0.73,
//     AUD: 1.29
// };
const currency = {
    PKR: 280,
    USD: (1 / 280).toFixed(3),
    EUR: (0.91 / 280).toFixed(3),
    INR: (73.65 / 280).toFixed(3),
    GBP: (0.73 / 280).toFixed(3),
    AUD: (1.29 / 280).toFixed(3)
};
console.log(chalk.bold.bgBlueBright('\n \t Currency Converter'));
let userReply = await inquirer.prompt([
    {
        name: "from",
        message: "Enter From Currency: ",
        type: "list",
        choices: ['USD', 'PKR', 'EUR', 'INR', 'GBP', 'AUD']
    },
    {
        name: "to",
        message: "Enter To Currency: ",
        type: "list",
        choices: ['USD', 'PKR', 'EUR', 'INR', 'GBP', 'AUD'],
    }
]);
// console.log(userReply);
if (userReply.from === userReply.to) {
    console.log(chalk.red.bold("Error: Please select different currencies for conversion."));
}
else {
    let userReplyAmount = await inquirer.prompt({
        name: "userAmount",
        message: "Enter your Amount: ",
        type: "number",
    });
    // Fetching the conversion rate of the selected currencies
    let fromAmount = currency[userReply.from];
    let toAmount = currency[userReply.to];
    let amount = userReplyAmount.userAmount;
    console.log("From Currency Rate: " + fromAmount);
    console.log("To Currency Rate: " + toAmount);
    console.log("Amount: " + amount);
    let baseAmount = amount / fromAmount; //converted amount in base currency (From)
    let finalAmount = baseAmount * toAmount; //final converted amount
    if (!isFinite(finalAmount)) {
        console.log(chalk.red.bold("Error: Please Insert Valid Number! "));
    }
    else if (userReplyAmount.userAmount <= 0) {
        console.log(chalk.red.bold("Error: Please enter a valid positive number for the amount."));
    }
    else {
        console.log(chalk.bgGrey.bold(' \t Final Converted Value: '));
        console.log(chalk.green.bold(`${amount} ${userReply.from} is equal to ${Math.floor(finalAmount)} ${userReply.to}`));
    }
}
