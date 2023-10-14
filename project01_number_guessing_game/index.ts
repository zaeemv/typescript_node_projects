import inquirer from 'inquirer'
import chalk from 'chalk'

let attemptsTaken: number = 1;

let numberToGuess = Math.floor(Math.random() * 10) + 1;

let input = await inquirer.prompt([{
    name: "guess",
    message: "Enter your guess (1 to 10): "
}])

while (input.guess != numberToGuess) {
    if (input.guess < numberToGuess) {
        console.log("Your guess is LOWER than the number")
    } else if (input.guess > numberToGuess) {
        console.log("Your guess is HIGHER than the number")
    }
    attemptsTaken++
    input = await inquirer.prompt([{
        name: "guess",
        message: "Enter your guess again (1 to 10): "
    }])
}

console.log(chalk.blue(`You won in ${attemptsTaken} attempts! The correct number was ${numberToGuess}!`))


