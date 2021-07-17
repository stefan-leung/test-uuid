var fs = require('fs');
const cors = require('cors');
const express = require("express");
const app = express();
   
    
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
       
    if(elements[word]) {
        var reply = elements[word];         
    } else {
        var reply = {
            status: "Not Found"
        }
    }
       
    response.send(reply);
}