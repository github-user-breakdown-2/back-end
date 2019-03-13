# Back-End
Back-End repo for github-user-breakdown-2

## Overview

Back-end for github-user-breakdown-2 app which accepts a github username and returns a breakdown of that user's activity using the data provided by GitHub for that username.

### Deployment
Back-end deployed to https://github-user-breakdown-app.herokuapp.com/

### Dependencies 

`axios` `bcryptjs` `cors` `dotenv` `express` `helmet` `jsonwebtoken` `knex` `pg` `sqlite3`

### Dev-Dependencies 

`cross-env` `jest` `nodemon` `supertest` 

## Data

Database configured with knex and sqlite3. Knex migrations and seeds located within `data` directory.

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

`GET /`: Takes in a github's username. Accesses the github api. Returns an array of all github users matching the username parameters.
