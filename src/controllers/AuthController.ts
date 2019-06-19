require('dotenv').config();

import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { validate } from 'class-validator';

import { User } from '../entity/User';
const jwtSecret = process.env.JWT_SECRET;

class AuthController {
    //
    static login = async (req: Request, res: Response) => {
        //Check if email and password are set
        let { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).json('bad request');
        }

        let user: User;
        try {
            // Get user from database
            user = await User.findOneOrFail({ where: { email } });
        } catch (error) {
            res.status(401).json('unauthorized');
        }

        //Check if encrypted password match
        if (!user.checkIfUnencryptedPasswordIsValid(password)) {
            res.status(401).json('unauthorized');
            return;
        }

        //Sing JWT, valid for 1 hour
        const token = jwt.sign({ userId: user.id, email: user.email }, jwtSecret, {
            expiresIn: '1h',
        });

        //Send the jwt in the response
        res.send(token);
    };

    static changePassword = async (req: Request, res: Response) => {
        //Get ID from JWT
        const id = res.locals.jwtPayload.userId;

        //Get parameters from the body
        const { oldPassword, newPassword } = req.body;
        if (!(oldPassword && newPassword)) {
            res.status(400).json('bad request');
        }

        let user: User;
        try {
            // Get user from the database
            user = await User.findOneOrFail(id);
        } catch (id) {
            res.status(401).json('unauthorized');
        }

        //Check if old password matchs
        if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
            res.status(401).json('unauthorized');
            return;
        }

        //Validate de model (password lenght)
        user.password = newPassword;
        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).json(errors);
            return;
        }
        //Hash the new password and save
        user.hashPassword();
        User.save(user);

        res.status(201).json('user created');
    };
}

export default AuthController;
