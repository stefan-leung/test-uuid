const MongoClient = require('mongodb').MongoClient;
const mongoPWD = process.env.mongo;
const uri = `mongodb+srv://anzen-uuid-mongo:${mongoPWD}@counting0.tex6f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const toDelete = ''

MongoClient.connect(uri, function (err, db) {
    if (err) throw err;
    var dbo = db.db("counter");

    dbo.collection(toDelete).drop(function (err, delOK) {
        if (err) throw err;
        if (delOK) console.log(`Collection ${toDelete} was deleted.`);
        
        db.close();
    });
});