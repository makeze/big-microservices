import express from 'express';
import {json} from 'body-parser';

import {currentUserRouter} from "./currentuser";
import {signInRouter} from "./signin";
import {signOutRouter} from "./signout";
import {signUpRouter} from "./signup";
import {errorHandler} from "./middlewares/error-handler";

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.use(errorHandler);

app.listen(3000, () => {
    console.log("Listening on 3000");
})