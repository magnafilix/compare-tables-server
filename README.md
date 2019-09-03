# compare-tables-server
simple CR_D API for [client](https://github.com/magnafilix/compare-tables)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

```
Node.js - version 10+
Redis
```

### Installing

A step by step series of examples that tell you how to get a development env running

Clone the repository to your machine and change directory

```
git clone https://github.com/magnafilix/compare-tables-server.git
cd compare-tables-server
```

Intialize the project installing the dependencies

```
npm install
```

* [Install](https://redis.io/download) and start Redis server on your machine first, then start the project
```
npm start
```

Open the browser and hit this url: http://localhost:5000/planning/all  
Now you are seeing existing in the DB tables!  
Congrats!  
:relaxed:

## Built With

* [Node.js](https://nodejs.org/en/) - Back-end ecosystem
* [MongoDB](https://www.mongodb.com/) - The most popular NoSQL database for modern apps
* [Redis](https://redis.io/) - Open source (BSD licensed), in-memory data structure store, used as a database, cache and message broker.

## Authors

* **dp** - *Initial work* - [magnafilix](https://github.com/magnafilix)