# Northcoders News API

## Background

We will be building an API for the purpose of accessing application data programmatically. The intention here is to mimic the building of a real world backend service (such as reddit) which should provide this information to the front end architecture.

Your database will be PSQL, and you will interact with it using [node-postgres](https://node-postgres.com/).

# Instructions

1. Fork and clone this repository.

2. After cloning, you will need to create two .env files: `.env.test` and `.env.development`.

3. In each .env file, type in `PGDATABASE=<database_name_here>`, with the correct database name for each file. The database names can be found in `setup.sql`.

4. Make sure to put .env files to .gitignore.

5. Install dependencies by running `npm install` in your terminal.
