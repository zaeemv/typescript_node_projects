#! /usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
const todoList = [];
let input = await inquirer.prompt([{
    name: "action",
    type: "string",
    message: chalk.yellow("What would you like to do? (Enter one of the following: add, list, delete or 'q' to exit)")
}]);
while (input.action != 'q') {
    switch (input.action) {
        case 'add':
            input = await inquirer.prompt([{
                name: "item",
                type: "string",
                message: chalk.bgGreen("Enter the item you want to add to the todo list: ")
            }]);
            todoList.push(input.item);
            console.log(chalk.green(`${input.item} added to the list!`));
            console.log(" ");
            break;
        case 'list':
            for (let index in todoList) {
                console.log(chalk.blue(`${index}: ${todoList[index]}`));
            }
            console.log(" ");
            break;
        case 'delete':
            if (todoList.length == 0) {
                console.log(chalk.bgYellowBright("There are no items in the todo list to delete!"));
                break;
            }
            input = await inquirer.prompt([{
                name: "indexToDelete",
                type: "number",
                message: chalk.bgRedBright("Enter the index of the item you want to delete: ")
            }]);
            let deletedItem = todoList[input.indexToDelete];
            todoList.splice(input.indexToDelete, 1);
            console.log(chalk.red("Item " + chalk.yellow(deletedItem) + " at index " + input.indexToDelete + " removed!"));
            console.log(" ");
            break;
        default:
            break;
    }
    input = await inquirer.prompt([{
        name: "action",
        type: "string",
        message: chalk.yellowBright("What would you like to do? (Enter one of the following: add, list, delete or 'q' to exit)")
    }]);
}
