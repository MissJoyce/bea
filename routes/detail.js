var express = require("express");
var router = express.Router();

var mongoCt = require("mongodb").MongoClient;
router.get("/",function(req,res,next){
     var dbAdress = "mongodb://127.0.0.1:27017/breatShop";
     mongoCt.connect(dbAdress,function(err,db){
         if(err){
             console.log("error with detail");
         }else{
             var detail = db.collection("proDetail");
             detail.find({},{_id:0,code:0}).toArray((err,result)=>{
                //console.log("detail的数据",result);
                res.send(result[0]);
                db.close();
             })
         }
     });
     next();
 });

 router.get("/",function(req,res,next){
     
    var dbAdress = "mongodb://127.0.0.1:27017/breatShop";
    mongoCt.connect(dbAdress,function(err,db){
        if(err){
            console.log("error with lunbo");
        }else{
            var lunbo = db.collection("lunbo");
            lunbo.find({},{_id:0,code:0}).toArray((err,result)=>{
               console.log("lunbo的数据",result);
               res.send(result[0]);
               db.close();
            })
        }
    });
 });

 module.exports = router;