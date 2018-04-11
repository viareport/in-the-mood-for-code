const express = require('express');

const app = express();

app.use(express.static('public'));

app.get('/yo', function (req, res) {
    res.send('Hello World!')
});


app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
});