const express = require("express");
const bodyParser = require("body-parser");
var mysql = require("mysql");
var app = express();
app.use(bodyParser.json());



var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'temp',
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
    var sql = "insert into data values(?);";
    mysqlConnection.query(sql, [data.mobileno], (err, rows, fields) => {
        if (!err) {
            console.log('saved in db');
            res.send('ok');
        }
        else
            console.log(err);
    })
});

app.listen(3000, () => console.log('Server running at port no:3000'));