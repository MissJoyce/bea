var express = require("express");

module.exports=()=>{
    var router = express.Router();
    router.get("/",function(req,res){
        res.render("register.ejs",{});    
    })
    return router;
}
