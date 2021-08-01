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
app.get('/uuid/reset/:element/', resetuuid)


function uuid(request, response) {
    var data = JSON.parse(fs.readFileSync('main.json'));
    data.push({'num': data.length, 'time': 0});
    fs.writeFileSync('main.json', JSON.stringify(data));

    var elements = JSON.parse(fs.readFileSync('main.json'));
    response.send(elements[elements.length - 1]);
}

const keys = ['hi', 'hey']

function resetuuid(request, response) {
    if(keys.indexOf(request.params.element) >= 0) { try {
        fs.writeFileSync('main.json', '[]');
        response.send({'key': true, 'reset': true, 'data': JSON.parse(fs.readFileSync('main.json'))});
    } catch (error) {
        console.error(error) // Fix when internet
        response.send({'key': true, 'reset': false, 'data': JSON.parse(fs.readFileSync('main.json'))});
    }} else {
        console.warn('Tried to reset with wrong or no key'); // Fix when internet
        response.send({'key': false, 'reset': false, 'data': false}); 
    };

};