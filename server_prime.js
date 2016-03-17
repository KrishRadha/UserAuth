/* AUTHOR : RADHA KRISHNA KAVULURU */
/* EDIT 1 : 15-02-2016             */
/* EDIT 2 :                        */



/* ---------------------------------------------------INSERT HEADING HERE------------------------------------------------------------------*/








/* ----------------------------------------------------------------------------------------------------------------------------------------*/

/*------------------------------------------------------CODE STARTS HERE---------------------------------------------------------------*/



var express=require('express');  // requiring expressjs
var mongojs=require('mongojs');  // requiring mongojs
var funcz = require('./cust_server.js');// requiring custom_js funcs
var db=mongojs('indianpanther',['tags','posts','users']);// database is indianpanther ,tables are in array
var bodyparser=require('body-parser');//body parser for parsin the body yo
var validator=require('validator');
//var multer=require('multer');
var sessions=require('client-sessions');
var bcrypt=require('bcryptjs');
var csrf=require('csurf');
// c surf is the sessions library we are using to store the users sessions on the local browser/ iTS WRITTERN by mozilla i guesss
//var sendgrid=require('sendgrid')('champrakri','Iamthegod1');
//var passport=require('passport');
//var mongoose=require('mongoose');
//mongoose.connect('mongodb://localhost/indianpanther');
var app=express();
app.use(express.static(__dirname+"/public"));  
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

/*--------------------------------------------------------APP WORKING PARAMS---------------------------------------------------------------------*/

//app.use(var trendtime=1;)






/*--------------------------------------------------------------------------------------------------------------------------------------------*/
//app.use(multer);

app.use(sessions(
    {
    cookieName:'session',
    secret:'123poloshsa90865746asdgy1f2y3gyuiasu',
    duration:30*60*1000,
    activeDuration:5*60*1000
    
    }

));
app.use(csrf());   

app.use(function (req, res, next) {
  var token = req.csrfToken();
  res.cookie('XSRF-TOKEN', token);
  res.locals.csrfToken = token;
  next();
});

app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


//app.use('view engine','jade');



/*-------------------------------------------------- MY MIDDLE WARE -----------------------------------------------*/

app.use(function(req,res,next)
        {
    
    if(req.session && req.session.user)
    {
        db.users.findOne({email:req.session.user.email},function(err,user){
        
            if(user)
            {
               req.user=user;
                delete req.user.password;
                req.session.user=req.user;
                res.locals.user=req.user;
            }
           
            
        next();
        });
    }
    else
    {
        next();
    }
    
});


function requireLogin(req,res,next)
{
    if(!req.user)
    {
        res.redirect('/login');
    }
    else
    {
        next();
    }
}

/*---------------------------------------------------------------------------------------------------------------*/

/*=-----------------------------------------------SCHEMA ---------------------------------------------*/




/* --------------------------------------------------------- API STARTS ------------------------------------------------------------*/

app.get('/',function(req,res){
    if(req.session && req.session.user){
res.redirect('/dashboard');

}
     else{

    res.render("index.html");
     }
    
});
/* -----------------------------------------------LOGIN GET API-----------------------------------------------------------------*/
app.get('/login',function(req,res){

    if(req.session && req.session.user){
res.redirect('/dashboard');

}
    else{
    res.render("login.html");
    }
    
});
/* -----------------------------------------------LOGIN POST API-----------------------------------------------------------------*/

app.post('/login',function(req,res){


   
  var user={};
    
    var error=[];
    var valid=1;

    /* ------------------------------------------------ VALIDATION ---------------------------------------------*/
    // email
     user.email=req.body['email'];
    if(!validator.isLength(user.email,{min:4,max:2000}))
    {
    
        error.push('EMAILSIZE');
        valid=0;
    }
     if(!validator.isEmail(user.email))
    {
         error.push('EMAIL');
        valid=0;
    }
    //user password
     user.password=req.body['password'];
    if(!validator.isLength(user.password,{min:4,max:200}))
    {
    
        error.push('PASSWORD');
        valid=0;
    }
    var passcheck='';
    if(valid==1){
        
    db.users.findOne({email:user.email},function(err,doc){
    
        if(!doc)
        {
            error.push('INVALID');
            res.json({error:error});
        }
        else
        {
    passcheck=doc['password'];
        if(bcrypt.compareSync(user.password,passcheck))
    {
        /* ------------------------------------------- SUCCESS -----------------------------------------------*/
        if(doc['verify']==0)
        {
             error.push('VERIFY');
            res.json({error:error});
        }
        else
        {
        req.session.user=doc;
        res.json({done:"GO"});
        }//session = set-cookie stores stff
        /* ------------------------------------------- SUCCESS -----------------------------------------------*/
    }
     else
    {
        error.push('INVALID');
        res.json({error:error});
    }
        }
    
    });
    
    
    
    }
    else
    {
        res.json({error:error});
    }
   
    
    

});

/* -----------------------------------------------REGISTER GET API-----------------------------------------------------------------*/

app.get('/register',function(req,res){
    
if(req.session&&req.session.user)
{
    res.redirect('/dashboard');
}
    else{
    res.render("register.html",{csrfToken:req.csrfToken()});
    }
    
});


/* -----------------------------------------------REGISTER API-----------------------------------------------------------------*/

app.post('/register',function(req,res){
   console.log(req.body);  

  
    var time = funcz.getDateTime();
    
    var user={};
    
    var error=[];
    var valid=1;

    /* ------------------------------------------------ VALIDATION ---------------------------------------------*/
    // username
    user.name=req.body['name'];
    
    if(!validator.isLength(user.name,{min:4,max:200}))
    {
    
       error.push('NAME');
        valid=0;
    }
    //user email
     user.email=req.body['email'];
    if(!validator.isLength(user.email,{min:4,max:2000}))
    {
    
        error.push('EMAILSIZE');
        valid=0;
    }
     if(!validator.isEmail(user.email))
    {
         error.push('EMAIL');
        valid=0;
    }
    //user password
     user.password=req.body['password'];
    if(!validator.isLength(user.password,{min:4,max:200}))
    {
    
        error.push('PASSWORD');
        valid=0;
    }
    
    
    //bdate
     user.bdate=req.body['bdate'];
    if(!validator.isInt(user.bdate,{min:1,max:31}))
    {
       error.push('BDATE');
        valid=0;
    }
    //user bmonth
     user.bmonth=req.body['bmonth'];
    if(!validator.isInt(user.bmonth,{min:1,max:12}))
    {
    
        error.push('BMONTH');
        valid=0;
    }
    //user byear
     user.byear=req.body['byear'];
    if(!validator.isInt(user.byear,{min:1900,max:2016}))
    {
    
        error.push('BYEAR');
        valid=0;
    }
    // user.country=req.body['country'];
    // user language
     user.languages=req.body['language'];
    if(typeof(user.languages)=='undefined')
       {
           
       error.push('LANGUAGETYPE');
    valid=0;
       }
    else{
    for(var i=0;i<user.languages.length;i++)
    {
        //validate
        if(!validator.equals(user.languages[i],"ENGLISH")&&!validator.equals(user.languages[i],"TELUGU")&&!validator.equals(user.languages[i],"HINDI")&&!validator.equals(user.languages[i],"TAMIL"))
        {
            error.push('LANGUAGE');
            valid=0;
        }
    }
}
     user.addedat=time;
     user.verify=0; //
     user.authority=0;
    user.vercode=funcz.RandStr(15);
    
    
    
// ------- INSERT -----------------------------------------------------------------------------------------------------------------------
    if(valid==1)
    {
        var hash=bcrypt.hashSync(user.password,bcrypt.genSaltSync(10));
        user.password=hash;
        db.users.insert(user,function(err,doc){
    
    console.log(user);
            if(err)
            {
                error.push('DATAB');
                 res.json({error:error});
            }
    
            else{
 
           var url=req.headers.host+'/verify?email='+user.email+'&vercode='+user.vercode;
                
                // SEND VERIFICATION EMAIL
                
                /* --------------- SEND GRID SAMPLE * ----------------*
                sendgrid.send(
        {
            to:'rkavulru@gmail.com',
            from:'test@mail.indianpanther.com',
            subject:'Indian Panther Admin test',
            text:'Verify your account on Indian Panther by visiting the following link:'+url
        },function(err,json){
        
        if(err){
            error.push('MAILPROB');
            return res.json({error:error});
        }
            else{
                 var succ ={done:"GO"};
            res.json(succ);
            }
        }
        ); /* --------------- SEND GRID SAMPLE * ----------------*/
                var succ ={done:"GO"};
            res.json(succ);
               
                // Maild Done
                
                
            
            }
    
    
    
    });

    }
    else
    {
        res.json({error:error});
    }
    

        // INSERT END-------------------------------------------------------------------------------------------------------------------
    
    
});



/* -------------------------------------------------------REGISTER DONE---------------------------------------------------------------*/

app.get('/dashboard',requireLogin,function(req,res){

    res.render('dashboard.html');
    
    
    
});




/*------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------LOGOUT------------------------------------------------------*/


app.get('/logout',function(req,res){

   req.session.reset();
                res.redirect('/');
    
    
});


/*-----------------------------------------------VERIFY EMAIL-------------------------------------------------------*/

app.get('/verify',function(req,res){

    var verpar = req.query;
    console.log(verpar);
    if(verpar.email&&verpar.vercode)
    {
        db.users.findOne({email:verpar.email},function(err,user){
        
            if(user)
            {
                if(req.verify==1)
                {
                    res.redirect('/');
                }
                else
                {
               if(user.vercode==verpar.vercode)
               {
                     db.users.findAndModify(
        {query:{_id:mongojs.ObjectId(user._id)},
         update:{$set:{verify:1 }},
        new: true},
        function(err,doc){
         
         if(err)
         {
             res.render("verify.html",{error:'WE ARE FACING TECHNICAL PROBLEMS'+err.code});
         }
             else
             {
                 res.render("verify.html",{error:'VERIFIED. Vistit http://indianpanther.com/login to discover the world'});
             }
         
         }
    );
               }
                    else
                    {
                        res.render("verify.html",{error:"DO NOT TRY TO HACK DUH NOT THE SAME CODE"});
                    }
                }
            }
            else
            {
                // no user
                res.render("verify.html",{error:"DO NOT TRY TO HACK DUH, NOT CORRECT MAIL ID"});
            }
            
           
            
       
        });
    }
    else
    {
        // no reqs
        res.render("verify.html",{error:"DO NOT TRY TO HACK DUH, NO POST DUDE"});
    }
   
});

/*-----------------------------------------------VERIFY EMAIL ENDS-------------------------------------------------------*/



/*-----------------------------------------------APP WORKING STARTS-------------------------------------------------------*/









/*------------------------------------------------SERVER STUFF ENDS----------------------------------------------*/
app.listen(3000);
console.log("Server running on port 3000");
/* ----------------------------------------------------------------------------------------------------------------------------------------*/
