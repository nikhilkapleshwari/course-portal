const express = require('express');
const app = express();
const userRoute = express.Router();
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

let User = require('../model/User');

// Add Student
userRoute.route('/login').post((req, res, next) => {
  console.log("login request:"+JSON.stringify(req.body));
  console.log('username:'+req.body.username);
  User.find({username:req.body.username,password:req.body.password},(error,data)=>{
    if(error)
      console.log('error:'+error);
    else{
      console.log('res received:'+data[0]);
      if(data[0]!=undefined){
        console.log('login success:');
        res.json(true);  
      }
      else{
        console.log('login failed');
        res.json(false);
      }
      
    }
  });
  // MongoClient.connect(url, function(err, db) {
  //   if (err) throw err;
  //   var dbo = db.db("student-portal");
  //   var query = { username: "admin" };
  //   dbo.collection("admin").find(query).toArray(function(err, result) {
  //     if (err) throw err;
  //     console.log(result);
  //     db.close();
  //   });
  // });
});

module.exports = userRoute;