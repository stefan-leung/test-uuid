const { mongo } = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const cors = require('cors');
const express = require("express");
const app = express();
require('dotenv').config();

const mongoPWD = process.env.mongo;
const uri = `mongodb+srv://anzen-uuid-mongo:${mongoPWD}@counting0.tex6f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

MongoClient.connect(uri, function (err, db) {
    if (err) throw err;
    console.log("Database connected!");

    var dbo = db.db('counter');
    var myItems = { uuid: 0 }

    dbo.collection("counting").insertOne(myItems, function (err, res) {
        if (err) throw err;

        if(res.acknowledged) {
            console.log("1 document inserted");
        } else {console.log("0 documents inserted")};
    });

    dbo.collection("counting").deleteMany(myItems, function (err, obj) {
        if (err) throw err;
        if (obj.deletedCount > 1 || obj.deletedCount < 1) {
            console.log(obj.deletedCount + " documents deleted");
        } else {
            console.log(obj.deletedCount + " document deleted");
        }

    });

    dbo.collection("counting").find({}).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
});

app.listen(4000, () => console.log("Server Started at port " + 4000));

app.use(express.static('public'));
app.use(cors());

// when get request is made, alldata() is called
app.get('/uuid', alldata);

function alldata(request, response) {
    var data = fs.readFileSync('test.json');
    var elements = JSON.parse(data);
    response.send(elements);
}

app.get('/uuid/:element/', searchElement);

function searchElement(request, response) {
    var word = request.params.element;
    word = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

    if (elements[word]) {
        var reply = elements[word];
    } else {
        var reply = {
            status: "Not Found"
        }
    }

    response.send(reply);
}