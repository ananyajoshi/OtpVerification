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

    
    let sql = `INSERT INTO login_table(MOBILE_NUMBER,LOGIN_DATETIME) VALUES ?`;

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

app.post("/loginResponse",(req,res)=>{

    //to be filled by http request , should be made changes if required
  //all the req.body.<field> should be same in http request that will be sent so keep that in mind
      let serv_resp_l= req.body.serv_resp;
      let id  = req.body.id_no;  
  
  
      //here id is required to fetch the correct record
  
      let sql = `UPDATE login_table SET LOGIN_RESPONSE = ?
      WHERE id = ?`;
      
      let values = [serv_resp_l,id];
      con.query(sql,values,(err,result)=>{
          if(err) throw err;
          console.log(result);
          res.status(200).send("MSG91 response put into database");
      });
  });


app.post("/loginVerify",(req,res)=>{

  //to be filled by http request , should be made changes if required
//all the req.body.<field> should be same in http request that will be sent so keep that in mind
    let mod_date = new Date();
    let serv_resp_v= req.body.serv_resp;
    let id  = req.body.id_no;  
    let sts = req.body.sts;

    //here id is required to fetch the correct record

    let sql = `UPDATE login_table SET VERIFY_STATUS= ? , VERIFIED_DATETIME = ?,VERIFY_RESPONSE = ?
    WHERE id = ?`;
    
    let values = [sts,mod_date,serv_resp_v,id];
    con.query(sql,values,(err,result)=>{
        if(err) throw err;
        console.log(result);
        console.log('login Success  : '+id);
    });
});

app.post("/web/chk",(req,res)=>{

   
      
      let usrNm  = req.body.usrNm;  
      let pwd =  req.body.pwd;
  
      
      let sql = `select PASSWORD FROM admin_table WHERE USER_NAME = ?`;
      
      let values = [usrNm];
      con.query(sql,values,(err,result)=>{
          if(err) throw err;
          console.log("checked password for "+usrNm);

          if(result[0]!=undefined){
              if(result[0].PASSWORD==pwd){
                  res.status(200).send({verification : 'Verified'});
                }else{
                    res.status(200).send({verification : 'Not Verified'});
                }
            }else{
                res.status(200).send({verification : 'User not valid'});
            }

        });     
  });

  app.post("/web/addAdmin",(req,res)=>{
    let usrNm  = req.body.usrNm;  
    let pwd = req.body.pwd;


    let sql = `insert into admin_table values(?,?)`;
    
    let values = [usrNm];
    con.query(sql,values,(err,result)=>{
        if(err) throw err;
        console.log("new admin " + usrNm + " added");
        console.log(result);
        
    });
});


app.get("/web/no_all_rqst",(req,res)=>{
    
    let sql = `select count(*) from requests_table  `;
    
    con.query(sql,values,(err,result)=>{
        if(err) throw err;
        console.log("No. of All is" + result[0].count );
        res.status(200).send({no_all_rqst : result[0].count });
        
    });
});


app.get("/web/no_pend_rqst",(req,res)=>{
    
    let sql = `select count(*) from requests_table where VERIFY_STATUS = 0 `;
    
    con.query(sql,values,(err,result)=>{
        if(err) throw err;
        console.log("no. of pending Requests is" + result[0].count );
        res.status(200).send({no_pend_rqst : result[0].count });
        
    });
});

app.get("/web/aprv_rqst",(req,res)=>{
    
    let sql = `select * from requests_table where VERIFY_STATUS = 1 `;
    
    con.query(sql,values,(err,result)=>{
        if(err) throw err;
        console.log(JSON.stringify(result));
        res.status(200).JSON(result);
        
    });
});

app.get("/web/rjt_rqst",(req,res)=>{
    
    let sql = `select * from requests_table where VERIFY_STATUS = 2 `;
    
    con.query(sql,values,(err,result)=>{
        if(err) throw err;
        console.log(JSON.stringify(result));
        res.status(200).JSON(result);
        
    });
});

app.get("/web/all_rqst",(req,res)=>{
    
    let sql = `select * from requests_table `;
    
    con.query(sql,values,(err,result)=>{
        if(err) throw err;
        console.log(JSON.stringify(result));
        res.status(200).JSON(result);
        
    });
});

app.get("/web/pnd_rqst",(req,res)=>{
    
    let sql = `select * from requests_table where VERIFY_STATUS = 0 `;
    
    con.query(sql,values,(err,result)=>{
        if(err) throw err;
        console.log(JSON.stringify(result));
        res.status(200).JSON(result);
        
    });
});

app.post("/web/get_request",(req,res)=>{

    let id = req.body.id;
    
    let sql = `select * from requests_table where id = ? `;
    let values = [id]
    
    con.query(sql,values,(err,result)=>{
        if(err) throw err;
        console.log(JSON.stringify(result[0]));
        res.status(200).JSON(result[0]);
        
    });
});


app.post("/web/update_request",(req,res)=>{

    let id = req.body.id;
    let sts = req.body.sts;
    let dt = new Date();
    
    let sql = `update requests_table set VERIFY_STATUS = ? REQUEST_VERIFY_DATETIME = ? where id = ? `;
    let values = [sts,dt,id]
    
    con.query(sql,values,(err,result)=>{
        if(err) throw err;
        console.log("Updated status of  Request @" + id );
        res.status(200).send("ok");
        
    });
});

app.get("/web/bills_in_mnth",(req,res)=>{

    let dt = new Date();
    
    let sql = `select count(*) from  requests_table where month(REQUEST_VERIFY_DATETIME) = month(?)  and year(REQUEST_VERIFY_DATETIME) = year(?)`;
    let values = [dt,dt]
    
    con.query(sql,values,(err,result)=>{
        if(err) throw err;
        console.log("No. of  Request in Current Month is " + result[0].count);
        res.status(200).send({no_of_bills : result[0].count});
    });
});

app.get("/web/amount_in_mnth",(req,res)=>{

    let dt = new Date();
    
    let sql = `select sum(REQUESTED_AMOUNT) from  requests_table where month(REQUEST_VERIFY_DATETIME) = month(?)  and year(REQUEST_VERIFY_DATETIME) = year(?)`;
    let values = [dt,dt]
    
    con.query(sql,values,(err,result)=>{
        if(err) throw err;
        console.log("Amount reimbursed in Current Month is " + result[0].sum(REQUESTED_AMOUNT));
        res.status(200).send({no_of_bills : result[0].sum(REQUESTED_AMOUNT)});
    });
});

app.post("/web/crt_rqst",(req,res)=>{

    let name =req.body.name;
    let ph_no =req.body.phone;
    let amnt =req.body.bill_amount;
    let bill_date = req.body.bill_date;
    let bill_company = req.body.bill_company;
    let img =  req.body.bill_image;


    let dt = new Date();
    
    let sql = `insert into requests_table (APPLICANT_NAME,APPLICANT_MOBILE_NUMBER, BILL_DATE,
        BILL_COMPANY_NAME,REQUESTED_AMOUNT,IMAGE_in_base64,CREATED_DATETIME ) 
        VALUES(?,?,?,?,?,?,?)`;
    let values = [name,ph_no,bill_date,bill_company,amnt,img,dt]
    
    con.query(sql,values,(err,result)=>{
        if(err) throw err;
        res.status(200).send({'id':result.insertId});
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

    /*
     //queries to be run on connection
    var sqle = `
    create table  login_table (        
        ID INT AUTO_INCREMENT,
        MOBILE_NUMBER VARCHAR(12) NOT NULL,    
        CREATED_DATETIME DATETIME,
        MODIFIED_DATETIME DATETIME,
        STATUS BOOLEAN DEFAULT false,
        RESPONSE VARCHAR(21844),
        PRIMARY KEY(ID)
        )
    `;
    con.query(sqle,(err,result)=>
    {
        if(err) throw err;
        console.log(result);
    })
    */


    
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