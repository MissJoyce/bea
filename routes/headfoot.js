var express = require('express');
var router = express.Router();

var url = require("url");
var querystring = require("querystring");


var mongoCt = require("mongodb").MongoClient;

router.get("/",function(req,res,next){
    //链接数据库
    var dbAdress = "mongodb://127.0.0.1:27017/breatShop";
    mongoCt.connect(dbAdress,function(err,db){
        if(err){
            console.log("database error head");
        }else{
            //导航
            var head = db.collection("headfoot");
            head.find({},{_id:0,code:0}).toArray((err,result)=>{
               // console.log("3333",result[0]);
                res.send(result[0]); //将数据返回给前端
                db.close(); //关闭连接
            });
        }
      
    });
    next();
});

var https = require("https");

//百度搜索框
router.get("/",function(req,res,next){
    var keyword=decodeURIComponent(req.query.requstion)
    //console.log("...:",req.query.requstion);
   //var keyword = req.body.requstion;
    var options={
        hostname:"sp0.baidu.com", //主机名
        port:443,
        path:"/5a1Fazu8AA54nxGko9WTAnF6hhy/su?cb?wd="+keyword+"&json=1&p=3&sid=1455_24885_21105_17001_20241_25177_20927&req=2&sc=eb&csor=0&_=1512805508477",
        method:"GET"
    }
    //console.log(options);
    let reqHttp = https.request(options,function(resHttp){
        console.log("状态码:",resHttp.statusCode);
        console.log("响应头:",resHttp.headers);
        console.log("请求的内容:",keyword);
        var strData="";
        resHttp.setEncoding('utf-8');
        resHttp.on('data',function(chunk){
            //console.log("900090",chunk);
            strData+=chunk;
        });

        resHttp.on("end",function(){
           // console.log(res);
           // console.log("9090",typeof strData);
           var get = url.parse(req.url,true).query;
           //var post = querystring.parse(strData);
           console.log("1212",strData);
            //res.send(post);
        });
    });
    reqHttp.on("error",function(err){
        console.log("reqHttp-error");
    });
    reqHttp.end();
});



module.exports=router;