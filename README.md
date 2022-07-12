# Zhaul django/react/docker demo

This was initially built using [this heroku template](https://github.com/Alschn/django-react-docker-heroku-template)
to allow bringing it up as quickly as possible. For more information on the template
see the [template readme](./TEMPLATE-README.md).

# Running

This is meant to be run with docker. If you don't already have
docker you can get it [here](https://docs.docker.com/get-docker/).

These instructions are primarily copied from the [template readme](./TEMPLATE-README.md).

## 1) Add an env file with the database keys

Create `.env` file in projects root directory with variables (use your own values):

```
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=postgres
```

## 2) Start the program

While in **root directory**, build docker images and run them with docker-compose.
This might take up to few minutes.
Initially or after changes to npm or pip you should run a rebuild.

```shell script
docker-compose up --build
```

Application should be up and running: backend `127.0.0.1:8000`, frontend `127.0.0.1:3000`.

If images had been installed and **no changes have been made**, just run to start containers:

```shell script
docker-compose up
```

Bringing down containers with **optional** -v flag removes **all** attached volumes and invalidates caches.

```shell script
docker-compose down
```


## 3) Running backend tests

For the moment to run the tests you need to have the container for the backend already up.
This shouldn't be required, but the way that docker is set up you can't bring up the backend container and 
run a command other than run server currently. This is fixable, but on a brief google I was unable to find the 
fix.

To run it run in one window:

```shell script
docker compose up backend
```

In a second window run:

```shell script
docker exec -it backend ./manage.py test
```

You can also run the first command headless if you want to run only a single window. 

Currently, the tests are mixed in with the code. As a codebase gets larger this could cause time issues with 
discovery and may want to be moved out to its own location. However, I do think it makes it easier to discover 
tests and know which locations are potentially missing tests. 

Long term it would also be nice if these could be run on watch, but I haven't added the infrastructure for that yet. 
They don't currently take long enough to run that it's a blocker. 


## 4) Running Frontend tests

For the moment to run the tests you need to have the container for the frontend already up.
This shouldn't be required, but the way that docker is set up you can't bring up the frontend container and 
run a command other than the default currently. This is fixable, but on a brief google I was unable to find the 
fix.

```shell script
docker compose up frontend
```

In a second window run:

```shell script
docker exec -it frontend npm run test
```

# Using tmux

You can use tmux to help you run the app if desired. 

To install use 

```shell
brew install tmux
```

You can run [setupe-tmux](./setup-tmux.sh) to set up a tmux shell set with prefilled commands 
for running the program and tests. 
