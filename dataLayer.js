/**
 * Created by bernardwilliams on 7/22/17.
 */

var mysql = require('mysql');


var DataLayer = function (callback) {

    this.connection = mysql.createConnection(({
        host: 'te2sow.cciiqdjd26sf.us-east-1.rds.amazonaws.com',
        port: '3306',
        user: 'maria',
        password: '12Password34',
        database: 'bamazon'
    }))

    this.connection.connect(function (err) {
        if (err) throw err;
        //console.log("connected as  " + this.connection.threadId);

        /*this.connection.end(function(err) {
         // The connection is terminated now
         });*/
        callback();
    });

    /**
     * This function returns an array of orders and their associated items
     *
     */
    this.getOrders = function () {
        this.connection.query("SELECT * FROM products", function(err, res){
            if (err) throw err;
            console.log(res);
        });
    }

    /**
     * This function submits an order
     *
     */
    this.addNewOrder = function (order) {

    }

    /**
     * This function returns an array of items matching the requested department name
     *
     */
    this.getProductsByDepartment = function (department) {

    }

    /**
     * This function inserts an item into the database
     *
     */
    this.addNewProduct = function (product) {

    }

    this.close = function () {
        this.connection.end(function (){
            console.log('---------- Connection closed --------');
        });
    }
}

module.exports = DataLayer;