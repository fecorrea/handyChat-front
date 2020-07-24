//para levantar angular en heroku
var express = require('express');
var app = express();

app.use(express.static('./dist/handychat'));

app.get('/*', function (req, res) {
    res.sendFile('index.html', { root: 'dist/handychat/' }
    );
});

app.listen(process.env.PORT || 8080);

