var dataLayer = require('./dataLayer');
var inquirer = require('inquirer');
var colors = require('colors');


var dl = new dataLayer(start);

colors.setTheme({
    banner: ['white', 'bgBlue']
});

var continueAdd = true;
var currentCustomer = '';
var currentOrder = {
    orderItems: []
};

//Function starts once the connection is made
function start() {
    console.log('============================='.banner);
    console.log('==  Its Bamazon Bitches!!  =='.banner);
    console.log('============================='.banner);
    console.log('');
    console.log('Enter your customer name to get started'.green);
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is your name?",
                name: "username"
            },
            {
                type: "confirm",
                message: "Are you sure:",
                name: "confirm",
                default: true
            }
        ])
        .then(function (resp) {
            currentCustomer = resp.username;
            mainMenu()
        });


}

function mainMenu() {
    console.log('========================================'.banner);
    console.log('==  Its Bamazon Bitches!! - Main Menu =='.banner);
    console.log('========================================'.banner);
    console.log('');
    console.log('Welcome ' + currentCustomer);
    console.log('');
    console.log('What would you like to do today?'.blue);
    inquirer
        .prompt([
            {
                type: "list",
                message: "Select from the options below... ",
                choices: ["Browse Products", "View my Cart", new inquirer.Separator(), "Quit"],
                name: "mainChoice"
            }
        ])
        .then(function (resp) {
            switch (resp.mainChoice) {
                case "View my Cart":
                    viewCartMenu();
                    break;
                case "Browse Products":
                    viewBrowseMenu();
                    break;
                case "Quit":
                    quit();
                    break;
                default:
                    quit();
            }
        });

}

function viewCartMenu() {
    console.log('');
    console.log('========================================='.banner);
    console.log('==  Its Bamazon Bitches!! - Your Cart  =='.banner);
    console.log('========================================='.banner);
    console.log('');
    console.log('Your current shopping cart?');

    inquirer
        .prompt([
            {
                type: "list",
                message: "Select from the options below... ",
                choices: ["Submit Order", "Empty Cart", "Main Menu"],
                name: "mainChoice"
            }
        ])
        .then(function (resp) {
            switch (resp.mainChoice) {
                case "View my Cart":
                    viewCartMenu();
                    break;
                case "Empty Cart":
                    viewBrowseMenu();
                    break;
                case "Main Menu":
                    mainMenu();
                    break;
                default:
                    mainMenu();
            }
        });
}

function viewBrowseMenu() {
    console.log('==============================================='.banner);
    console.log('==  Its Bamazon Bitches!! - Browse Products  =='.banner);
    console.log('==============================================='.banner);
    console.log('');
    console.log('How would you like to browse products?'.blue);
    inquirer
        .prompt([
            {
                type: "list",
                message: "Select from the options below... ",
                choices: ["View All", "Add Item to Order", "Browse by Department", new inquirer.Separator(), "Main Menu"],
                name: "mainChoice"
            }
        ])
        .then(function (resp) {
            switch (resp.mainChoice) {
                case "View All":
                    viewCartMenu();
                    break;
                case "Add Item to Order":
                    viewBrowseByDeptMenu();
                    break;
                case "Browse by Department":
                    viewBrowseByDeptMenu();
                    break;

                case "Main Menu":
                    mainMenu();
                    break;
                default:
                    quit();
            }
        });

}

function viewBrowseByDeptMenu() {
    console.log('======================================================'.banner);
    console.log('==  Its Bamazon Bitches!! - Browse Departments      =='.banner);
    console.log('======================================================'.banner);
    console.log('');
    console.log('Which department would you like to surf?'.blue);
    inquirer
        .prompt([
            {
                type: "list",
                message: "Select from the options below... ",
                choices: ["Appliances", "Plumbing", "Electrical", new inquirer.Separator(), "New Order", "Main Menu"],
                name: "mainChoice"
            }
        ])
        .then(function (resp) {
            switch (resp.mainChoice) {
                case "Appliances":
                    dl.getProductsByDepartment(resp.mainChoice);
                    viewBrowseByDeptMenu();
                    break;
                case "Plumbing":
                    dl.getProductsByDepartment(resp.mainChoice);
                    viewBrowseByDeptMenu();
                    break;
                case "Electrical":
                    dl.getProductsByDepartment(resp.mainChoice);
                    viewBrowseByDeptMenu();
                    break;
                case "Main Menu":

                    mainMenu();
                    break;
                case "New Order":

                    startNewOrderMenu();
                    break;
                default:
                    mainMenu();
            }
        });
};

function startNewOrderMenu() {
//FIll out the order header information
    console.log('======================================================'.banner);
    console.log('==  Its Bamazon Bitches!! - New Orders              =='.banner);
    console.log('======================================================'.banner);
    console.log('');
    console.log('Lets get your items ordered...?'.blue);
    inquirer
        .prompt([
            {
                type: "confirm",
                message: "Would you like to start/continue an order?:",
                name: "confirm",
                default: true
            },
        ])
        .then(function (resp) {
            if (resp.confirm) {
                continueAdd = true;
                addItems();
            } else {
                mainMenu();
            }
        });
    //Get Order item information
}

function quit() {
    dl.close();
}

function addItems() {

    console.log('');
    console.log('Add your item below...'.red);
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter the product ID for the item?",
                name: "prodID"
            },
            {
                type: "input",
                message: "Qty?",
                name: "qty"
            },
            {
                type: "confirm",
                message: "Would you like to enter another?:",
                name: "confirm",
                default: true
            }
        ])
        .then(function (resp) {
            var orderItem = {
                prodID: resp.prodID,
                qty: resp.qty
            }
            currentOrder.orderDate = Date.now();
            currentOrder.customerName = currentCustomer;
            currentOrder.orderItems.push(orderItem);

            if (resp.confirm) {
                continueAdd = true;
                addItems();
            } else {
                continueAdd = false;
                mainMenu();
                dl.addNewOrder(currentOrder);
                console.log(JSON.stringify(currentOrder));
            }
        });
};