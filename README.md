# Nothing Burger

This is a template Node.js Web application application which has the following things configured and working
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

You will also need the PostgreSQL command-line client `psql`  which comes with the PostgreSQL
download, or e.g. Homebrew package on Mac. The client [can also be run from the Docker container]
(https://hub.docker.com/_/postgres/) but looks a bit more complicated than.

### Create Google Login client ID and secret key

To use Google login for your application, you will have to create a project in
[Google Cloud Console](https://console.cloud.google.com) (log in with your gmail address).

Just give the project any name you want, then choose Credentials -> Create credentials -> Oauth Client ID
Choose this type of the application: "Web application", and give it a name again.

Now the important part, enter this to Authorized JavaScript origins:

`http://localhost:8080`

And this to Authorized redirect URIs:

`http://localhost:8080/auth/google/callback`

You can later add the real URI of your application to the above configuration options here 
when it's running on a "real" server accessible from anywhere.

After these steps, you get a _client ID_ and _client secret_. Configure these two in the 
 `.env` file:

``` 
GOOGLE_CLIENT_ID=<The client ID you got>
GOOGLE_CLIENT_SECRET=<The client secret you got>
```

You'll also have to enable Google+ API for the project. Navigate to Google+ API in the menu or
Go to this address:
`https://console.developers.google.com/apis/api/plus.googleapis.com/overview?project=<YOUR PROJECT NAME>`

And click the enable Google+ API -button.

### Add a user to the database

In order to log in to your system, it has to know about you. Add a desired user by logging into PostgreSQL:

```
psql -d nothing-burger -h localhost -U nb -p 5432
```

And inserting the desired user:

```
INSERT INTO user_account (login, name) VALUES ('some.real.google.account@gmail.com', 'John Doe')
```

### Run the server

Run commands:

```
yarn install
yarn watch
```

and wait until you see database initialization messages, webpack build
output and: `server listening on port 8080`. After those you can go to the following address in your
browser:

`http://localhost:8080/`

And the login screen should appear. You should log in with the user you inserted into the database.


