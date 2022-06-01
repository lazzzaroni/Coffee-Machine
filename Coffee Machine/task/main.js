// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input');

const coffeeMachine = {
    "water": 400,
    "milk": 540,
    "beans": 120,
    "cups": 9,
    "money": 550
}

const coffee = {
    "espresso": {
        "water": 250,
        "milk": 0,
        "beans": 16,
        "cups": 1,
        "money": 4
    },
    "latte": {
        "water": 350,
        "milk": 75,
        "beans": 20,
        "cups": 1,
        "money": 7
    },
    "cappuccino": {
        "water": 200,
        "milk": 100,
        "beans": 12,
        "cups": 1,
        "money": 6
    }
}


function displayStats() {
    console.log(`The coffee machine has:
    ${coffeeMachine.water} ml of water
    ${coffeeMachine.milk} ml of milk
    ${coffeeMachine.beans} g of coffee beans
    ${coffeeMachine.cups} disposable cups
    $${coffeeMachine.money} of money`);
}

chooseOperation();

function chooseOperation() {
    const action = String(input('Write action (buy, fill, take, remaining, exit):\n'));
    switch (action) {
        case 'buy':
            buyCoffee();
            break;
        case 'fill':
            fillCoffeeMachine();
            break;
        case 'take':
            takeMoney();
            break;
        case 'remaining':
            displayStats();
            chooseOperation();
            break;
        case 'exit':
            break;
        default:
            console.log('Wrong input! Try again!');
            chooseOperation();
            break;
    }
}

function buyCoffee() {
    const action = String(input('What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, back - to main' +
        ' menu:\n'));
    const espresso = coffee.espresso;
    const latte = coffee.latte;
    const cappuccino = coffee.cappuccino;

    function makeCoffee(type) {
        let remainKey = Object.keys(coffeeMachine);
        let remainValue = Object.values(coffeeMachine);
        let chosenCoffee = Object.values(type);

        for (let i in remainKey) {
            if (remainValue[i] < chosenCoffee[i]) {
                console.log(`Sorry, not enough ${remainKey[i]}!`);
                return;
            } else {
                console.log("I have enough resources, making you a coffee!");
                coffeeMachine.water -= type.water;
                coffeeMachine.milk -= type.milk;
                coffeeMachine.beans -= type.beans;
                coffeeMachine.cups -= type.cups;
                coffeeMachine.money += type.money;
                return;
            }
        }


    }

    switch (action) {
        case '1':
            makeCoffee(espresso);
            chooseOperation();
            break;
        case '2':
            makeCoffee(latte);
            chooseOperation();
            break;
        case '3':
            makeCoffee(cappuccino);
            chooseOperation();
            break;
        case 'back':
            chooseOperation();
            break;
        default:
            console.log('Wrong input! Try again!');
            buyCoffee();
            break;

    }

}

function fillCoffeeMachine() {
    let water = Number(input("Write how many ml of water you want to add:\n"));
    let milk = Number(input("Write how many ml of milk you want to add:\n"));
    let beans = Number(input("Write how many grams of coffee beans you want to add:\n"));
    let cups = Number(input("Write how many disposable coffee cups you want to add:\n"));

    coffeeMachine.water += water;
    coffeeMachine.milk += milk;
    coffeeMachine.beans += beans;
    coffeeMachine.cups += cups;
    chooseOperation();
}

function takeMoney() {
    console.log(`I gave you $${coffeeMachine.money}`);

    coffeeMachine.money = 0;
    displayStats();
}