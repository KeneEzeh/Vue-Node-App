# Vue-Node-App
A simple application built using Vue.js for frontend and Node for backend.

## NOTE: TypeScript
I used TypeScript for both the backend and frontend so you need knowledge of TypeScript to test this out.

## Installation

Before you begin, ensure you have these installed and set up on your machine.

> Node.js >= v18.x

> yarn: Ensure you have "yarn" installed globally on your system

Clone the repo:

```bash
git clone https://github.com/KeneEzeh/Vue-Node-App.git

# To access the backend
cd backend

# To access the frontend
cd tweetai-frontend
```

NOTE: The repo contains two directories. The "backend" dir which is the backend directory and the "tweetai-frontend" which is the frontend directory

Install dependencies:

```bash
yarn
# Ensure to use yarn for the installations on both directories to avoid installation errors
```


### Project Environment Variables

Copy the sample environment file in the "backend" directory and modify it with your environment variables:

```bash
cp .env.sample .env.local
```

# open .env and modify the environment variables

## Usage

Running locally:

```bash
# For the backend
yarn dev

# For the tweetai-frontend
yarn serve
```

Running in production:

```bash
# For the backend
yarn start

# For the tweetai-frontend
yarn build
```

### API Endpoints

Explore the API endpoints locally using  the Swagger documentation link [here](https://keneezeh.github.io/Vue-Node-App/swagger-docs/).

### Database - MySql
Sequelize - Configure the sequelize connection to the database by providing the details in the "backend/.env.sample" file.

#### Note: Create a ".env" file in the backend directory, copy the variables in the ".env.sample" into it and provide the necessary variables for the mySql database.


