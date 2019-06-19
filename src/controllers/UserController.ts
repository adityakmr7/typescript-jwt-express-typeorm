import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { User } from '../entity/User';

class UserController {
    //
    static listAll = async (req: Request, res: Response) => {
        //Get users from database
        const users = await User.find({
            select: ['id', 'email'], //We dont want to send the passwords on response
        });

        //Send the users object
        res.json(users);
    };

    static getOneById = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id: number = req.params.id;

        try {
            //Get the user from database
            const user = await User.findOneOrFail(id, {
                select: ['id', 'email'], //We dont want to send the password on response
            });
        } catch (error) {
            res.status(404).json('User not found');
        }
    };

    static newUser = async (req: Request, res: Response) => {
        //Get parameters from the body
        let { email, password, role } = req.body;
        let user = new User();
        user.email = email;
        user.password = password;
        // user.role = role;

        //Validade if the parameters are ok
        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).json(errors);
            return;
        }

        //Hash the password, to securely store on DB
        user.hashPassword();

        try {
            //Try to save. If fails, the username is already in use
            await User.save(user);
        } catch (e) {
            res.status(409).json('username already in use');
            return;
        }

        //If all ok, send 201 response
        res.status(201).json('User created');
    };

    static editUser = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        //Get values from the body
        const { username, role } = req.body;

        let user;
        //Try to find user on database
        try {
            user = await User.findOneOrFail(id);
        } catch (error) {
            //If not found, send a 404 response
            res.status(404).json('User not found');
            return;
        }

        //Validate the new values on model
        user.username = username;
        user.role = role;
        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).json(errors);
            return;
        }

        //Try to safe, if fails, that means username already in use
        try {
            await User.save(user);
        } catch (e) {
            res.status(409).json('username already in use');
            return;
        }
        //After all send a 204 (no content, but accepted) response
        res.status(204).json('User updated');
    };

    static deleteUser = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        let user: User;
        try {
            user = await User.findOneOrFail(id);
        } catch (error) {
            res.status(404).json('User not found');
            return;
        }
        User.delete(id);

        //After all send a 204 (no content, but accepted) response
        res.status(204).json('User deleted');
    };
}

export default UserController;
