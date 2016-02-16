/* AUTHOR : RADHA KRISHNA KAVULURU */
/* EDIT 1 : 15-02-2016             */
/* EDIT 2 :                        */



/* ---------------------------------------------------INSERT HEADING HERE------------------------------------------------------------------*/








/* ----------------------------------------------------------------------------------------------------------------------------------------*/

/*------------------------------------------------------CODE STARTS HERE---------------------------------------------------------------*/



var express=require('express');  // requiring expressjs
var mongojs=require('mongojs');  // requiring mongojs
var funcz = require('./cust_server.js');// requiring custom_js funcs
var db=mongojs('indianpanther',['tags','posts']);// database is indianpanther ,tables are in array
var bodyparser=require('body-parser');//body parser for parsin the body yo
var app=express();
app.use(express.static(__dirname+"/public"));  
app.use(bodyparser.json());
app.set('views','./views');



/* --------------------------------------------------------- API STARTS ------------------------------------------------------------*/

app.get('/',function(req,res){

    res.render("index.html")
    
});




/*------------------------------------------------------------------------------------------------------------------*/



/*------------------------------------------------SERVER STUFF ENDS----------------------------------------------*/
app.listen(3000);
console.log("Server running on port 3000");
/* ----------------------------------------------------------------------------------------------------------------------------------------*/
