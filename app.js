const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/view',(req,res)=>{
    let sql = 'select * from login_table '
        con.query(sql,(err,result,fields)=>{
            if(err) throw err;
               res.json(result);
        });
});

app.get('/',(req,res)=>{
     res.send("this is database for keeping track of logins");
});

app.post("/loginTried",(req,res)=>{

    //to be filled by http request should be made changes if required
    //all the req.body.<field> should be same as in http request that will be sent , so keep that in mind
    

    let MobileNo  = req.body.m_no;
    let create_dt  = new Date();

    
    let sql = `INSERT INTO login_table(MOBILE_NUMBER,CREATED_DATETIME ) VALUES ?`;

    let values = [[MobileNo,create_dt]];
    con.query(sql,[values],(err,result)=>{
        if(err) throw err;
        console.log(result);
        console.log('new login tried by '+ MobileNo); 
    //id is generated in database itself so we have to send it to the client which then will be sent to us if login success
        console.log('new login id is '+ result.insertId); 
        res.status(200).json({'id': result.insertId});  //check is it correct way to append id part to our response to be accessed in front end

    });

});


app.post("/loginSuccess",(req,res)=>{

  //to be filled by http request , should be made changes if required
//all the req.body.<field> should be same in http request that will be sent so keep that in mind
    let mod_date = new Date();
    let ser_resp= req.body.serv_resp;
    let id  = req.body.id_no;  


    //here id is required to fetch the correct record


    let sql = `UPDATE login_table SET MODIFIED_DATETIME = ?,RESPONSE = ?,STATUS = true
    WHERE id = ?`;
    let values = [mod_date,ser_resp,id];
    con.query(sql,values,(err,result)=>{
        if(err) throw err;
        console.log(result);
        console.log('login Success  : '+id);
        res.status(200);
    });
});



app.listen('3000',()=>{      //Express Server starts to listen for calls
    console.log('Express server running @ port : 3000');
});



var con = mysql.createConnection({   //mysql connection creation
    host : "localhost",
    user:"root",             //put your own parameter
    password : "123456789"  //put your own parameter
    ,database : 'smtbill'
});

con.connect((err,res)=>{   
    if(err) throw err;
    console.log("Connection Established  \n" );

    

    
});




//Now on its for previous creation of database not working now,
/*
/*start of all Get methods */


/*

app.get('/crtdb',(req,res)=>
{
    let sql = 'CREATE DATABASE smtbill';          //Query to create a database with specified name
     con.query(sql,(err,result)=>{
        if(err) throw err;
        res.send('Database Created \n' );

        con.push["database"]='smtbill';
        
        console.log(result);
    });

});

*/

/*
app.get('/createtbl',(req,res)=>{

    let sql = 'USE smtbill';          //to ensure database is always choosen to specific one.
    
    let sql1 = `create table login_table (        
        ID INT AUTO_INCREMENT,
        MOBILE_NUMBER VARCHAR(12) NOT NULL,    
        CREATED_DATE DATE,
        CREATED_TIME TIME,
        MODIFIED_DATE DATE,
        MODIFIED_TIME TIME,
        STATUS BOOLEAN DEFAULT false,
        RESPONSE VARCHAR(MAX);
        PRIMARY KEY(ID)
        )`;                             //query to create the specified table.

    con.query(sql,(err,result)=>{
        if(err) throw err;
        //con.push["database"]='smtbill';    // ==>  this is done here so that database can be added to 
        console.log(result);                //   con JSON object after creation of database
    });

    
    con.query(sql1,(err,result)=>{
        if(err) throw err;
        res.send('login Table created ');
        console.log(result);
    });
    
});

*/

/*   //not yet functioning  


app.get('/dltbl',(req,res)=>{     //declaration of get to drop the table
    let sql1 = 'USE smtbill';  
    con.query(sql1);         
    let sql = 'DROP TABLE login_table';
    con.query(sql,(err,result)=>{
        if(err) throw err;
            res.send('login Table deleted ');
            console.log(result);
        });
    });
*/
/*

//GOTTA AUTOMATE THIS INSTEAD OF FILLING BY HAND MAYBE BY USING REQUEST
app.get('/add',(req,res)=>
{
    let sql = `INSERT INTO login_table(MOBILE_NUMBER,CREATED_DATE,CREATED_TIME ,
        MODIFIED_DATE,MODIFIED_TIME ,RESPONSE,STATUS ) VALUES ?`

//-------------------------------------------------------------------------------------------

    let values = [
        []                      //<EACH FIELD except ID SHOULD BE FILED in order to fill the database
    ]


//--------------------------------------------------------------------------------------------
    let query = con.query(sql,[values],(err,result)=>
    {
        if(err) throw err;
        console.log(result);
        res.send('added   '+JSON.stringify(values));
    })
})
*/

/*
let MobileNo  = '9359385998' ;
let create_dt  =  '2008-11-11' ;
let create_time =  '09:30:00'  ;

*/