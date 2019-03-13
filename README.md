# Back-End
Back-End repo for github-user-breakdown-2

## Overview

Back-end for github-user-breakdown-2 app which accepts a github username and returns a breakdown of that user's activity using the data provided by GitHub for that username.

### Dependencies 

`axios` `bcryptjs` `cors` `dotenv` `express` `helmet` `jsonwebtoken` `knex` `pg` `sqlite3`

### Dev-Dependencies 

`cross-env` `jest` `nodemon` `supertest` 

## Data

Database configured with knex. Knex migrations and seeds located within `data` directory.

### Production

Production deployed to https://github-user-breakdown-app.herokuapp.com/

Production uses Heroku Postgress database add-on. Heroku Config Vars include `DATABASE_URL`, `DB_ENV` and `JWT_SECRET`.

Connect migrations to production with command line: `npx heroku run knex migrate:latest -a github-user-breakdown-app`

### Testing & Development

Testing and development uses sqlite3 database. Environments and variables set with local .env file. Testing completed with `jest` and `supertest`.


Connect migrations to development with command line: `knex migrate:latest`.

Connect seed to development with command line: `knex seed:run`


Connect migrations to testing with command line: `npx knex migrate:latest --env=testing`.

Connect seed to development with command line: `npx knex seed:run --env=testing`

## Api

All server routers located within `api` directory. 

## Endpoints and Routers

### Register 

Endpoint: `/api/register`

`POST /`: Takes in new app user's email and password from request. Password is hashed. New app users with hashed password is saved to database. Returns app user's email and hashed password.

### Login

Endpoint: `/api/login`

`POST /`: Takes in registered app user's email and password from request. Password is compared to hashed password saved in database and JWT token created. Returns object containing app user's id, email, and JWT token.

### App

Endpoint: `/api/app`

`GET /`: App access requires authentication. Verifies JWT token sent through authorization header. Returns decoded token and authorizes app user.

Endpoint: `/api/app/appUser`

`GET /:id`: Takes in paramater ID. Returns the corresponding app user's email and ID.

`DELETE /:id`: Takes in paramater ID. Deletes the specified app user from database. Returns the count of number of users deleted.

`PUT /:id`: Takes in paramater ID and requested changes to be made to user. Updates the specified app user within the database. Returns the udpated app user's email and ID.

Endpoint: `/api/app/githubUser`

`GET /summary`: Takes in a username request. Connects to Python script written by data science engineers which accesses github api to retrieve information of specified user. Returns json object with user's list of repos and names, list languages and count, most popular repo, username, repo count, and avatar. 

`GET /detailed`: Takes in a username request. Connects to Python script written by data science engineers which accesses github api to retrieve information of specified user. Returns json object with each day of week with number of commits per day and each hour of day with number of commits per hour. 