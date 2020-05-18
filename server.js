const express = require("express");
const bodyParser = require("body-parser");
var mysql = require("mysql");
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var id = 1;


var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'USERS',
    multipleStatements: true
});
mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded');
    else
        console.log('DB connection failed' + JSON.stringify(err, undefined, 2));

});



//Insert mobile number in database
app.post('/test', (req, res) => {

    let data = req.body;
    var C= new Date();


    var sql = "insert into logintable(MOBILE_NUMBER,CREATED_DATETIME) values ?;";
    var values=[[req.body.mno, C]];
    mysqlConnection.query(sql, [values], (err, result) => {
        if (!err) {
            console.log('saved in db');

        }
        else
            console.log(err);
    })
});


 

app.listen(3000, () => console.log('Server running at port no:3000'));