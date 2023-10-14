import inquirer from 'inquirer'
import chalk from 'chalk'

let input = await inquirer.prompt([{
    name: "operand1",
    type: "number",
    message: "Enter First Operand: "
},
{
    name: "operator",
    type: "string",
    message: "Enter Operation (Options: + - * /): "
},
{
    name: "operand2",
    type: "number",
    message: "Enter Second Operand: "
}
])

const add = (num1: number, num2: number): number => num1 + num2
const sub = (num1: number, num2: number): number => num1 - num2
const mul = (num1: number, num2: number): number => num1 * num2
const div = (num1: number, num2: number): number => num1 / num2

function operation(num1: number, num2: number, operation: string): number {

    switch (operation) {
        case "+":
            return add(num1, num2);
            break;
        case "-":
            return sub(num1, num2);
            break;
        case "*":
            return mul(num1, num2);
            break;
        case "/":
            return div(num1, num2);
            break;
        default:
            console.log('Invalid Operator!')
            return -1;
            break;
    }
}

console.log(chalk.yellowBright(`${input.operand1} ${input.operator} ${input.operand2} = ${operation(input.operand1, input.operand2, input.operator)}`))

