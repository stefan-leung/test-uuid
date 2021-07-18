const { mongo } = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const cors = require('cors');
const express = require("express");
const app = express();
require('dotenv').config();

const mongoPWD = process.env.mongo;
const uri = `mongodb+srv://anzen-uuid-mongo:${mongoPWD}@counting0.tex6f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

var database;

MongoClient.connect(uri, function (err, db) {
    if (err) throw err;
    console.log("Database connected!");

    const dbo = db.db('counter');

    let insertItems = { uuid: 0 };
    var deleteItems = { uuid: null };

    dbo.collection("counting").find({}).toArray(function (err, result) {
        if (err) throw err;

        console.log(result.length + ' a')
        
        if(result.length == null) { 
            database = 0;
            console.log('null case')
        } else { 
            database = result.length;
            console.log(database)
            insertItems.uuid = result.length;
        }

        console.log(JSON.stringify(result));
    });

    if(insertItems) {
        
        console.log(JSON.stringify(insertItems) + ' b');

        dbo.collection("counting").insertOne(insertItems, function (err, res) {
            if (err) throw err;

            if(res.acknowledged) {
                console.log("1 document inserted");
            } else {console.log("0 documents inserted")};
        });
    };

    if(deleteItems) {
        dbo.collection("counting").deleteMany(deleteItems, function (err, obj) {
            if (err) throw err;

            if (obj.deletedCount > 1 || obj.deletedCount < 1) {
                console.log(obj.deletedCount + " documents deleted");
            } else {
                console.log(obj.deletedCount + " document deleted");
            };
        });
    };

    dbo.collection("counting").find({}).toArray(function (err, result) {
        if (err) throw err;

        database = result;
        console.log('FINAL RESULT\n' + JSON.stringify(result));
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