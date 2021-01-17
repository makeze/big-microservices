import express, {Request, Response} from 'express';
import {body, validationResult} from 'express-validator';
import {User} from '../models/user';
import {RequestValidationError} from "../errors/request-validation-error";
import {BadRequestError} from "../errors/bad-request-error";

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
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());
        }

        const {email, password} = req.body;
        const existingUser = await User.findOne({email});

        if(existingUser){
            throw new BadRequestError('Email in use');
        }

        const user = User.build({email, password});
        await user.save();

        res.status(201).send(user);
    });

export {router as signUpRouter}