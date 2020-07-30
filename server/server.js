const express = require('express');
const bodyParser =require('body-parser');
const port =3000;
const cors = require('cors');
const jwt = require('jsonwebtoken')
const app = new express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/cookbookdb',
    {
        useNewUrlParser: true,  
        useCreateIndex: true,
        useUnifiedTopology: true
    },
    (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Connected to MongoDB.");
        }
    }
);

 const myRecipiesData = require('./src/model/MYrecipiesdata');
 const signupData = require('./src/model/signupdata');
 const shoppingData = require('./src/model/shoppingdata');

 app.use(cors());
 app.use(bodyParser.json());
 app.get('/',(req,res)=>{
     res.send('hello from server');
 });

 function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        res.status(401).send("Unauthorized request");
    }
    let token = req.headers.authorization.split(' ')[1];
    if (token === "null") {
        res.status(401).send("Unauthorized request");
    }
    try {
        let payload = jwt.verify(token, "secretKey");
        req.userId = payload.subject;
        next();
    } catch (err) {
        res.status(401).send("Unauthorized request");
    }
}

 app.post('/signup',(req,res)=>{
   // res.send('hello from signup');
   let userdata = req.body;
   let user = new signupData(userdata);
   user.save((err, signupUserDetails) => {
       if (err) {
           console.log(err);
       } else {
          let payload = { subject: user._id };
           let token = jwt.sign(payload, "secretKey"); 
           res.status(200).send({token});
          console.log(signupUserDetails);
            //res.send('hello from signup');
           //res.send(signupUserDetails);
       }
   });
});
app.post('/login',(req,res)=>{
    //.send('hello from login');
    let userData = req.body;
    signupData.findOne({username: userData.username}, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            if (!user) {
                res.status(401).send("Invalid Email");
            } else if (user.password !== userData.password) {
                res.status(401).send("Invalid Password");
            } else {
               let payload = { subject: user._id };
               let token = jwt.sign(payload, "secretKey");
               // res.send(user);
                res.status(200).send({token});
                console.log(user);
                //res.send('hello from login');
            }
        }
    });
   
});

app.get('/myRecipies',verifyToken,(req,res)=>{
    //res.send('hello from my recipies');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    myRecipiesData.find()
    .then(function(myrecipies){
        res.status(200).send(myrecipies);
    });
});
app.post('/myRecipies/add',verifyToken,(req,res)=>{
    //res.send('hello from my recipies/add');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    let recipiedata = req.body;
    let rec = new myRecipiesData(recipiedata);
    rec.save((err, recipieDetails) => {
        if (err) {
            console.log(err);
        } else {
           let payload = { subject: rec._id };
            let token = jwt.sign(payload, "secretKey"); 
            res.status(200).send({token});
           console.log(recipieDetails);
        }
    });
});
app.post('/myRecipies/edit/:id',verifyToken,(req,res)=>{
    let id = req.params.id;
    //res.send('hello from my recipies/add');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    let recipiedata = req.body;
    let rec = new myRecipiesData(recipiedata);
    myRecipiesData.findOneAndUpdate({_id: id})
            .then(function(recipie){
                res.status(200).send(recipie);
                console.log(recipie);
                console.log(id);
            });
});
app.delete('/myRecipies/delete/:id',verifyToken,(req,res)=>{
    let id = req.params.id;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    myRecipiesData.findByIdAndDelete(id, (err, recipieDetails) => {
        if (err) {
            console.log(err);
        } else {
            console.log(recipieDetails);
            res.status(200).send(recipieDetails);
        }
    });
});
app.get('/myRecipies/:id',verifyToken,(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    var id = req.params.id;
    myRecipiesData.findOne({_id: id})
            .then(function(recipie){
                res.status(200).send(recipie);
                console.log(recipie);
                console.log(id);
    });
});
app.get('/shoppingList',verifyToken,(req,res)=>{
    res.send('hello from shopping list');
});
app.post('/shoppingList',verifyToken,(req,res)=>{
    //res.send('hello from shopping list');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    let shoppinglist = req.body.text;
    let list = new shoppingData(shoppinglist);
    list.save((err, shoppinglistdetails) => {
        if (err) {
            console.log(err);
        } 
        else {
            // list.find(function(err, shoppinglistdetails) {
			// 	if (err){
            //         res.send(err);
            //     }
            // else
            // {
                let payload = { subject: list._id };
                let token = jwt.sign(payload, "secretKey"); 
                res.status(200).send({token});
                res.send(shoppinglistdetails);
               console.log(shoppinglistdetails);
            }
			});
});

app.get("/test", verifyToken, (req, res) => {
    res.status(200);
});
 app.listen(port,function(){
     console.log("server running on localhost:"+port);
 });