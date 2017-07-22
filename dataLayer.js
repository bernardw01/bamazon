/**
 * Created by bernardwilliams on 7/22/17.
 */

var mysql = require('mysql');

var connection = mysql.createConnection(({
    host: 'te2sow.cciiqdjd26sf.us-east-1.rds.amazonaws.com',
    port:'3306',
    user: 'maria',
    password: '12Password34',
    database: 'danielStark'
}))

connection.connect( function(err) {
    if(err) throw err;
    console.log("connected as  " + connection.threadId);

    connection.query("SELECT * FROM music", function(err, res){
        if (err) throw err;
        console.log(res);
    });

    connection.end(function(err) {
        // The connection is terminated now
    });

});