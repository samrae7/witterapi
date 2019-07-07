# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command

Using `psql` CLI to query the database:

1. `psql witter_api`
2. `SELECT * FROM public.user;`

Run tests

`npm test`

## Dev notes

Running against my local db:
`DATABASE_URL=samuelrae:@localhost/witter_api npm start`
