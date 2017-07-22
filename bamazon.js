var dataLayer = require('./dataLayer');
var inquirer = require('inquirer');

var dl = new dataLayer(start);

function start() {
    console.log('we made it');
    dl.getOrders();
    dl.close();
}