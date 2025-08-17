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
- Zod for schema validations

## Future improvements

This project was built with a focus on core functionality first. There are several enhancements that can be added in the future to make it more robust and production-ready:


- Add a database for persistent data storage
- Implement authentication and authorization
- Enhance logging for better observability
