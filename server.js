var express=require('express');
var mongojs=require('mongojs');
var funcz = require('./cust_server.js');
var db=mongojs('indianpanther',['tags','posts']);
var bodyparser=require('body-parser');
var app=express();
app.use(express.static(__dirname+"/public"));  
app.use(bodyparser.json());

/*------------------------------------------------------------------------------------------------------------------*/

/* ---------------------------------------------- SERVER STUFF STARTS-----------------------------------------------*/


/*-----------------------------------------------GET ALL TAGS---------------------------------------------------*/
app.get('/tags',function(req,res){

    console.log("get tags request fired");
    db.tags.find(function(err,docs){
    
      res.json(docs);  
    
    });
   
    
});

/*------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------OPEN TAGGED LATEST POSTS----------------------------------------------------*/



app.get('/tags/:id',function(req,res){

    console.log("Open latest tagged posts with id fired");
    var id=req.params.id;
    var tagstr='';
    db.tags.findOne({_id:mongojs.ObjectId(id)},function(err,doc){
    console.log(doc);
        tagstr=doc['name'];
        
});
    var value2 = funcz.getDateTime();
    var value1=time-10000;
    db.posts.find({tag:id,Post_Time:{ $gt: value1, $lt: value2 } },function(err,docs){
    
        docs.push(tagstr);
       // console.log(docs['tagname']);
      res.json(docs);  
    
    });
   
    
});



/*------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------OPEN POST BY ID---------------------------------------------------*/


app.get('/posts/:id',function(req,res){
     var id=req.params.id;
/*
     db.posts.findOne({_id:mongojs.ObjectId(id)},function(err,doc){
   
         res.json(doc);
        
        
});
*/
    
    db.posts.findAndModify(
        {query:{_id:mongojs.ObjectId(id)},
         update:{$inc: {views:1}},
         new: true},function(err,doc){
         
         res.json(doc);
         
         }
    );
    

});





// 
/*------------------------------------------------------------------------------------------------------------------*/

/*-----------------------------------------------INSERTING A POST---------------------------------------------*/


app.post('/posts',function(req,res){
var time = funcz.getDateTime();
    
 req.body['Admin_accepted']=0;
     req.body['Post_Time']=time;
    req.body['Views']=0;
db.posts.insert(req.body,function(err,doc){
    
    console.log(req.body);
    
    
 
   
    
    
    res.json(doc)
    });


});





/*------------------------------------------------------------------------------------------------------------------*/



/*------------------------------------------------SERVER STUFF ENDS----------------------------------------------*/
app.listen(3000);
console.log("Server running on port 3000");