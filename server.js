const express = require('express');
const bodyParser = require('body-parser');
const uuidv1 = require('uuid/v1');
const uuidv4 = require('uuid/v4');
const app = express();
const port = 3000;
var cookieParser = require('cookie-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

app.get('/test', (req, res) => {
    res.json({'id': uuidv1()})
});



app.post('/login', (req, res) => {
    if (req.body.userName === 'user' && req.body.password === '123') {
        console.log('Login successful!');

        // Generating Session ID and Token
        const SESSION_ID = uuidv1();
        const CSRF_TOKEN = uuidv4();

        res.setHeader('Set-Cookie', [`session-id=${SESSION_ID}`, `csrf-token=${CSRF_TOKEN}`]);
        res.sendFile('public/home.html', {root: __dirname})
    } else {
        res.sendFile('public/loginFailure.html', {root: __dirname})
    }
    
})

app.post('/carDetailsQuery', (req, res) => {
    if(req.cookies['csrf-token'] === req.body.csrf_field) {
        res.sendfile('/public/success.html', {root: __dirname})
    } else {
        res.sendfile('/public/failure.html', {root: __dirname})
    }
})

app.listen(port, () => console.log(`Server running on port: ${port}`));