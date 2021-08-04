const fs = require('fs');
const cors = require('cors');
const express = require("express");
const app = express();
require('dotenv').config();

app.listen(4000, () => console.log("Server Started at port " + 4000));

app.use(express.static('public'));
app.use(cors());

// when get request is made, alldata() is called
app.get('/uuid', uuid);
app.get('/uuid/add', incrementuuid);
app.get('/uuid/all', alluuid);
app.get('/uuid/reset', resetuuid);

function uuid(request, response) {
    var keys = JSON.parse(fs.readFileSync('keys.json'));

    if(keys.indexOf(request.query.key) >= 0) {
        var elements = JSON.parse(fs.readFileSync('main.json'));
        response.send({'key': true, 'data': elements[elements.length - 1]});

    } else {
        console.warn('Tried to access one with wrong key / without key'); // Fix when internet
        response.send({'key': false, 'data': false}); 

    };
};

function incrementuuid(request, response) {
    var keys = JSON.parse(fs.readFileSync('keys.json'));

    if(keys.indexOf(request.query.key) >= 0) {
        var data = JSON.parse(fs.readFileSync('main.json'));

        data.push({'num': data.length, 'time': 0});
        fs.writeFileSync('main.json', JSON.stringify(data));

        var elements = JSON.parse(fs.readFileSync('main.json'));
        response.send({'key': true, 'data': elements[elements.length - 1]});

    } else {
        console.warn('Tried to increment with wrong key / without key'); // Fix when internet
        response.send({'key': false, 'data': false}); 

    };
};

function alluuid(request, response) {
    var keys = JSON.parse(fs.readFileSync('keys.json'));

    if(keys.indexOf(request.query.key) >= 0) {
        var elements = JSON.parse(fs.readFileSync('main.json'));
        response.send({'key': true, 'data': elements});

    } else {
        console.warn('Tried to view all with wrong key / without key'); // Fix when internet
        response.send({'key': false, 'data': false}); 

    };
};

function resetuuid(request, response) {
    var keys = JSON.parse(fs.readFileSync('keys.json'));

    if(keys.indexOf(request.query.key) >= 0) { try {
        fs.writeFileSync('main.json', '[]');
        response.send({'key': true, 'reset': true, 'data': JSON.parse(fs.readFileSync('main.json'))});

    } catch (error) {
        console.error(error); // Fix when internet
        response.send({'key': true, 'reset': false, 'data': JSON.parse(fs.readFileSync('main.json'))});

    }} else {
        console.warn('Tried to reset with wrong key / without key'); // Fix when internet
        response.send({'key': false, 'reset': false, 'data': false}); 

    };

};