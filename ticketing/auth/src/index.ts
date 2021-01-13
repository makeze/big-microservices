import express from 'express';
import 'express-async-errors';
import {json} from 'body-parser';

import {currentUserRouter} from "./currentuser";
import {signInRouter} from "./signin";
import {signOutRouter} from "./signout";
import {signUpRouter} from "./signup";
import {errorHandler} from "./middlewares/error-handler";
import {NotFoundError} from "./errors/not-found-error";

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.get('*', async (req, res) => {
   throw new NotFoundError();
});

app.use(errorHandler);

app.listen(3000, () => {
    console.log("Listening on 3000");
})