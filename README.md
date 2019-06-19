# Express REST API with JWT Authentication, using Typescript and TypeORM

This project is heavily inspied on André's [jwt-express-typeorm](https://github.com/andregardi/jwt-express-typeorm)

For a detailed step by step of the base project check [_"TypeScript Rest API with Express.js, JWT, Authorization Roles and TypeORM"_](https://medium.com/javascript-in-plain-english/creating-a-rest-api-with-jwt-authentication-and-role-based-authorization-using-typescript-fbfa3cab22a4)

## Getting Started

### Install

After you clone the repo, enter the directory and install node dependencies

```
npm run install
```

### Create .env file

Make sure to create an .env file on the root directory with the following variables

```
JWT_SECRET=
```

`PORT` variable is optional

### Create ormconfig.json file

Also create the [TypeormORM config file](https://github.com/typeorm/typeorm/blob/master/docs/using-ormconfig.md#using-ormconfigjson) using the next example

```
{
   "type": "",
   "host": "",
   "port": 0000,
   "username": "",
   "password": "",
   "database": "",
   "synchronize": false,
   "logging": true,
   "entities": [
      "src/entity/**/*.ts"
   ],
   "migrations": [
      "src/migration/**/*.ts"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}
```

### Serve

To run the server run the next command on the console

```
npm run serve
```

## Built With

- [TypeORM](https://typeorm.io/#/) - ORM for TypeScript and JavaScript (ES7, ES6, ES5)
- [JWT](https://github.com/expressjs/multer) - JSON Web Tokens industry standard for authentication

## Contributing

Feel free to fork this repo and share feedback

## License

This project is licensed under the MIT License
