var converter = new showdown.Converter();
let mdjson = [];

$.ajax({
    async: false,
    type: 'GET',
    url: 'https://raw.githubusercontent.com/stefan-leung/test-uuid/main/docs/markdown.json',
    success: function(dataOut) {
        data = JSON.parse(dataOut);
        data.forEach(filename =>
            $.ajax({
                async: false,
                type: 'GET',
                url: `https://raw.githubusercontent.com/stefan-leung/test-uuid/main/docs/md/${filename}`,
                success: function(data) {
                    mdjson.push([filename, data]);
                }
            })
        );
    }
});


console.log(mdjson); 

let body = document.getElementsByTagName('body')[0];
let navigation = document.createElement('div');
let content = document.createElement('div');
var mdDiv

navigation.id = 'nav';
navigation.classList.add('closebtn');
navigation.setAttribute('href', 'javascript:void(0)');
navigation.setAttribute('onClick', 'closeNav()');

mdjson.forEach(markdown => {
    mdDiv = document.createElement('a');
    mdDiv.innerHTML = markdown[0];
    mdDiv.style.cursor = 'pointer';
    mdDiv.setAttribute('onClick', `openMd("${markdown[0]}")`)

    navigation.appendChild(mdDiv);
});

let openmenu = document.createElement('span');
openmenu.innerText = 'Open Menu';
openmenu.style.fontSize = '30px';
openmenu.style.cursor = 'pointer';
openmenu.setAttribute('onClick', 'openNav()');

body.appendChild(navigation);
body.appendChild(openmenu);
body.appendChild(content)

function openMd(name) {
    mdjson.forEach(markdown => {
        if(markdown[0] == name) {
            content.innerText = markdown[1];
        };
    });
};

function openNav() {
    document.getElementById("nav").style.width = "250px";
};

function closeNav() {
    document.getElementById("nav").style.width = "0";
};