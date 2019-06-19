import { Router, Request, Response } from 'express';
import auth from './auth';
import user from './user';
import { checkJwt } from '../middlewares/checkJwt';

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
    res.json('hello world');
});

routes.use('/auth', auth);
routes.use('/user', user);

export default routes;
