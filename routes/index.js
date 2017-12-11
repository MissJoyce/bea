var express = require('express');
var router = express.Router();
router.get("/",function(req,res,next){
    console.log("router test")
    res.render("index.ejs",{});
});

module.exports=router;