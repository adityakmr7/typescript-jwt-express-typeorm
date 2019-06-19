import 'reflect-metadata';
require('dotenv').config();

import { createConnection } from 'typeorm';
import * as express from 'express';
import { Response, Request } from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';

import routes from './routes';

const port = process.env.PORT || 3000;
const app: express.Application = express();

//Connects to the Database -> then starts the express
createConnection()
    .then(async connection => {
        //
        // Implement middlewares
        app.use(cors());
        app.use(helmet());
        app.use(bodyParser.json());

        // Sets all routes
        app.use('/', routes);

        // Start server
        app.listen(port, () => {
            console.log(`Server started on port http://localhost:${port}`);
        });
    })
    .catch(error => console.log(error));
