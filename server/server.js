var express = require("express");
var app = express();
var mongojs = require("mongojs");
var db = mongojs("userList", ["userList"]);
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.get("/userList", function(req, res) {
    console.log("I received a GET request!");

    db.userList.find(function(err, docs) {
        console.log(docs);
        res.json(docs);
    });
});

app.get("/userList/:id", function(req, res) {
    var id = req.params.id;
    console.log("get user from " + id);
    db.userList.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
        res.json(doc);
    });
});

app.post("/userList", function(req, res) {
    console.log(req.body);
    db.userList.insert(req.body, function(err, doc) {
        res.json(doc);
    });
});

app.delete("/userList/:id", function(req, res) {
    var id = req.params.id;
    console.log(id);
    db.userList.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
        res.json(doc);
    });
});

app.put("/userList/:id", function(req, res) {
    var id = req.params.id;
    console.log(req.body.name);
    db.userList.findAndModify({query: {_id : mongojs.ObjectId(id)},
                               update: {$set: {name: req.body.name, email: req.body.email, password: req.body.password}},
                               new : true}, function(err, doc) {
                                    res.json(doc);
                            });
});

app.get("/hello", function(req, res) {
    res.send("Hello world. This is my first js app.")
});

app.listen(3001);
console.log("Server running on port 3001!");