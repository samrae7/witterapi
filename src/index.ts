import "reflect-metadata";
import {createConnection, ConnectionOptions } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import {Routes} from "./routes";
import * as PostgressConnectionStringParser from 'pg-connection-string';

import * as fs from "fs";

console.log("XXX", process.env.DATABASE_URL);
const connectionOptions = PostgressConnectionStringParser.parse(process.env.DATABASE_URL);

const typeOrmOptions: ConnectionOptions = {
    type: "postgres",
    host: connectionOptions.host || "localhost",
    port: connectionOptions.port || 5432,
    username: connectionOptions.user,
    password: connectionOptions.password,
    database: connectionOptions.database,
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
};

createConnection(typeOrmOptions).then(async connection => {
    // create express app
    const app = express();
    app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });

    // setup express app here
    // ...

    // start express server
    app.listen(process.env.PORT || 3000);

    // insert new film
    // await connection.manager.save(connection.manager.create(Film, {
    //     name: "Where the Wind Blows"
    // }));

    console.log("Express server has started on port 3000. Open http://localhost:3000/films to see results");

}).catch(error => console.log(error));

const json = JSON.stringify(typeOrmOptions, null, 2);

fs.writeFile("./ormconfig.json", json, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("File has been created");
});
