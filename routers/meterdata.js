const express = require('express')
const bcrypt = require("bcrypt");
const router = express.Router()
const User = require("../models/userModel");
const MongoClient = require('mongodb').MongoClient


const url = 'mongodb+srv://cycbackend:3dTrKsbFlFApKaCC@meterreading-0zydj.gcp.mongodb.net/mreader?retryWrites=true&w=majority'


router.get('/meter_readings', (req,res,next) => {
    MongoClient.connect(url,{ useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mreader");
        dbo.collection("SBPDCL_MeterReading").find().limit(50).toArray(function(err, result) {
            if (err) throw err;
            console.log(result.length);
            res.send(result)
            db.close();
        })
    });
})


router.get('/summary', (req,res,next) => {
    MongoClient.connect(url,{ useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mreader");
        dbo.collection("SBPDCL_ReadingSummary").find().limit(50).toArray(function(err, result) {
            if (err) throw err;
            console.log(result.length);
            res.send(result)
            db.close();
        })
    });
})

router.get('/users', (req,res,next) => {
    MongoClient.connect(url,{ useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mreader");
        dbo.collection("User").find().limit(50).toArray(function(err, result) {
            if (err) throw err;
            console.log(result.length);
            res.send(result)
            db.close();
        })
    });
})


router.get('/discom_data', (req,res,next) => {
    MongoClient.connect(url,{ useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mreader");
        dbo.collection("User").find().limit(50).toArray(function(err, result) {
            if (err) throw err;
            console.log(result.length);
            res.send(result)
            db.close();
        })
    });
})


router.post("/signup", async (req, res) => {
    

    const oldUser = await User.findOne({ email });
    
    if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
    }

    var newUser = new User({
        email: req.body.email,
        password: encryptedPassword,
    });

    newUser.save()
    console.log(req.body.email);

});


router.post('/login', (req, res) => {

    User.findOne({ email : req.body.email }, function(err, user) {
        if (user === null) {
            return res.status(400).send({
                message : "User not found.",
                
            });
        }
        else {
            return res.status(400).send({
                message : "User found.",
                email: user.email,
                password: user.password
            });
        }
    });
});



module.exports = router


// List of All Collections
// MongoClient.connect(url).then((client) => {
//     const connect = client.db("mreader")
//     connect.listCollections().toArray(function(err, names) {   
//         if(!err) {
//             console.log(names)
//         }
//     });
//  }).catch((err) => {
  
//     // Printing the error message
//     console.log(err.Message);
//  })