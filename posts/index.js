const express = require('express');

const app = express();

const posts = {};

app.get('/posts', (req, res) => {

});

app.post('/posts', (req, res) => {

});

app.listen(4000, () => {
    console.log('listening on 4000');
});