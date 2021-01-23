import express, {Request, Response} from 'express';
import {body} from 'express-validator';
import jwt from 'jsonwebtoken';

import {User} from '../models/user';
import {BadRequestError} from "../errors/bad-request-error";
import {validateRequest} from "../middlewares/validate-request";

const router = express.Router();

router.post('/api/users/signup', [
        body('email')
            .isEmail()
            .withMessage('e-mail must be valid'),
        body('password')
            .trim()
            .isStrongPassword({minLength: 8, minNumbers: 1, minSymbols: 1})
            .withMessage('password must be at least 8 chars long and contain at least one number and symbol')
    ],
    validateRequest,
    async (req: Request, res: Response) => {

        const {email, password} = req.body;
        const existingUser = await User.findOne({email});

        if(existingUser){
            throw new BadRequestError('Email in use');
        }

        const user = User.build({email, password});
        await user.save();

        // Generate jwt and store in the session

        const userJwt = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_KEY!
        );

        req.session = {
            jwt: userJwt
        };

        res.status(201).send(user);
    });

export {router as signUpRouter}