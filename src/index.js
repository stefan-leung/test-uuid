const { mongo } = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const cors = require('cors');
const express = require("express");
const app = express();
require('dotenv').config();

const mongoPWD = process.env.mongo;
const uri = `mongodb+srv://anzen-uuid-mongo:${mongoPWD}@counting0.tex6f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

async funtion dbQuery() {
    const db = await MongoClient.connect(url);
    const dbo = db.db("mydb");
    return await dbo.collection("counting").find({}).toArray();
};


var database, returnable;
var insertItems = { uuid: 0 };
var deleteItems = [
    { uuid: 0 },
    { uuid: 1 },
    { uuid: 2 },
    { uuid: 3 },
    { uuid: 4 },
    { uuid: 5 },
    { uuid: 6 },
    { uuid: 7 },
    { uuid: 8 },
    { uuid: 9 },
    { uuid: 10 },
    { uuid: 11 },
    { uuid: 12 }
];

deleteItems = [{ uuid: null }];

app.listen(4000, () => console.log("Server Started at port " + 4000));

app.use(express.static('public'));
app.use(cors());

// when get request is made, alldata() is calledcc
app.get('/uuid', alldata);

function alldata(request, response) {
    MongoClient.connect(uri, function (err, db) {
        if (err) throw err;
        console.log("Database connected once!");
        const dbo = db.db('counter');
    
        /*dbo.collection("counting").find({}).toArray(function (err, result) {
            if (err) throw err;
    
            console.log(result.length + ' a')
            
            if(result.length == null) { 
                database = 0;
                console.log('null case')
            } else { 
                database = result.length;
                insertItems.uuid = database;
                fs.writeFileSync('test.json', JSON.stringify(insertItems));
    
                console.log(database);
                console.log(JSON.stringify(insertItems) + ' b');
            }
    
            console.log(JSON.stringify(result));
        });*/

        insertItems = dbQuery().length;

        if(insertItems) {
            dbo.collection("counting").insertOne(insertItems, function (err, res) {
                if (err) throw err;
    
                if(res.acknowledged) {
                    console.log("1 document inserted");
                } else {console.log("0 documents inserted")};
            });
        };
    
        if(deleteItems) {
            deleteItems.forEach(item => {
                dbo.collection("counting").deleteMany(item, function (err, obj) {
                    if (err) throw err;
        
                    if (obj.deletedCount > 1 || obj.deletedCount < 1) {
                        console.log(obj.deletedCount + " documents deleted");
                    } else {
                        console.log(obj.deletedCount + " document deleted");
                    };
                });
            });
        };
    
        dbo.collection("counting").find({}).toArray(function (err, result) {
            if (err) throw err;
    
            database = result;
            console.log('FINAL RESULT\n' + JSON.stringify(result));
            db.close();
        });
    });
    async function a () {
        var data = fs.readFileSync('test.json');
        var elements = JSON.parse(data);
        response.send(elements);
    };
    a();
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