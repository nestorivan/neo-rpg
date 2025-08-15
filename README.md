# NEO RPG API👾

## Description

API backend for the NEO RPG game challenge.

## Run in docker container

Navigate to the project folder and run the following command:

```bash
docker build -t neo-rpg-api .
docker run -p 3000:3000 neo-rpg-api
```

## Run in local environment

Navigate to the project folder and run the following command:

```bash
$ npm install
```

### Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Run tests

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Technologies

This project is built using the following technologies:

- NestJS
- TypeScript
- Swagger
- Jest
- Docker
- Zod for validation schemas

## Compromises

There are some compromises made in this project because of time constraints:

- There is no database, all data is stored in memory
- There is no authentication
- Logging could be improved
- Error messages could be improved
