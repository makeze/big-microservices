import express from 'express';
import {json} from 'body-parser';

const app = express();
app.use(json());

app.get('/api/users/currentuser', (req, res) => {
    console.log("currentuser");
    res.send("currentuser");
});

app.post('/api/users/signup', (req, res) => {
    res.status(200).send("signup");
});

app.post('/api/users/signin', (req, res) => {
    res.status(200).send("signin");
});

app.post('/api/users/signout', (req, res) => {
   res.status(200).send("signout");
});

app.listen(3000, () => {
    console.log("Listening on 3000, or?");
})