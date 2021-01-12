import express, {Request, Response} from 'express';
import {body, validationResult} from 'express-validator';

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
    (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            //return res.status(400).send(errors.array());
            throw new Error('Invalid email or password');
        }

        throw new Error('Error database');

        const {email, password} = req.body;
        console.log('Creating a user '+email);
        res.status(200).send("signup");
    });

export {router as signUpRouter}