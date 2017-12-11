var express = require('express');
var router = express.Router();

var mongoCt = require("mongodb").MongoClient;

router.get("/",function(req,res,next){
    //链接数据库
    var dbAdress = "mongodb://127.0.0.1:27017/breatShop";
    mongoCt.connect(dbAdress,function(err,db){
        if(err){
            console.log("database error list");
        }else{
            //导航
            var plist = db.collection("plist");
            plist.find({},{_id:0,code:0}).toArray((err,result)=>{
                //console.log("3333",result[0]);
                res.send(result[0]); //将数据返回给前端
                db.close(); //关闭连接
                //next();
            });
        }
    });
});



module.exports=router;