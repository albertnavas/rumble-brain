RumbleBrain is an open-source project imitating Kahoot

# Technologies

- Client in Svelte
- Backend in Node.js with API and WebSockets

# Initial Setup

## Environment variables

Copy the `/server/.env.sample` file to `/server/.env` and fill in the values.

## Install dependencies

`npm i`

## Setup the database

`npm run setup:db`

## Start the server

`npm run dev:server`

## Start the client

`npm run dev:client`

# Testing

## End to End

`npm run test:end-to-end`

# Client Deployment

With GitHub Pages, the client is deployed automatically when pushing to the `main` branch.

# Server Deployment

## Install dependencies

`npm i --production`

## Setup the database

`npm run setup:db`

## Start the server

`pm2 start npm --name "rumblebrain-server" -- run start:server`

## Reload the server

`npm i --production && pm2 reload rumblebrain-server`
