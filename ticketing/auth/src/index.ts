import express from 'express';
import 'express-async-errors';
import {json} from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from "cookie-session";

import {currentUserRouter} from "./routes/currentuser";
import {signInRouter} from "./routes/signin";
import {signOutRouter} from "./routes/signout";
import {signUpRouter} from "./routes/signup";
import {errorHandler} from "./middlewares/error-handler";
import {NotFoundError} from "./errors/not-found-error";


const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
       signed: false,
       secure: true
    })
);

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.get('*', async (req, res) => {
   throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
    if(!process.env.JWT_KEY) {
        throw new Error('JWT KEY is not defined');
    }

    try{
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
    } catch (err) {
        console.error(err);
    }

    app.listen(3000, () => {
        console.log("Maksudik.dev. Listening on 3000");
    });
}

start();