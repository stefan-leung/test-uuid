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

const body = document.getElementsByTagName('body')[0];
let navigation = document.createElement('div');
var mdDiv

navigation.id = 'nav';

mdjson.forEach(markdown => {
    mdDiv = document.createElement('div');
    mdDiv.innerHTML = markdown[0];

    navigation.appendChild(mdDiv);
});

body.appendChild(navigation);