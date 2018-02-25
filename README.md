# Nothing Burger

This is a template application which has the following things configured and working
out of the box:

* Database (PostgreSQL) migrations which will be checked, and run if necessary every time 
the server starts
* Google authentication and access control to resources which should not be public
* Basic React build with webpack
* Client-side routing without hashes (two example routes are provided)

## Installing prerequisites and running the server

### Install Node

[You can get Node.js here](https://nodejs.org/en/). 

### Install yarn

Yarn is a replacement for Node Package Manager (npm). This project probably works
with `npm` as well, but hasn't been tested.
[Insructions on how to install Yarn for different platforms](https://yarnpkg.com/en/docs/install)

### Install and PostgreSQL

[You can download it from here](https://www.postgresql.org/). I won't cover the 
installation procedure here, but if you happen to run [Docker](https://www.docker.com/)
on your computer, I'll guide you through a simpler way to get the DB running:

* Create a `.env` file in the project root, and add the following contents to it:

```
PGHOST=localhost
PGPORT=5432
PGDATABASE=nothing-burger
PGUSER=nb
PGPASSWORD=nb
```

We use [dotenv](https://github.com/motdotla/dotenv) for configuration, and the above
creates the DB configuration for us. Now we'll have to fetch and start the PostgreSQL
Docker image:

```docker run --name nothing-burger -p 5432:5432 -e POSTGRES_DB=nothing-burger -e POSTGRES_USER=nb -e POSTGRES_PASSWORD=nb -d postgres:10.2```

(on Linux you have to prefix the command with sudo)

If the command is successful, you should have a Docker container running the database. You can check that 
it's running with:

```docker ps```

### Run the server

Run command `yarn watch` and wait until you see database initialization messages, webpack build
output and: `server listening on port 8080`. After those you can go to the following address in your 
browser:

`http://localhost:8080/`

And the login screen should appear.

