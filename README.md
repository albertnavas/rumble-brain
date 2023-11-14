# Initial Setup

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

## Start the server

`pm2 start npm --name "gooquiz-server" -- start`

## Reload the server

`npm i --production && pm2 reload gooquiz-server`
