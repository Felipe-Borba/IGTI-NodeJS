# IGTI-NodeJS

 In this repository is supposed to have all code of IGTI nodejs bootcamp, as well all exercises made by me. Each of them separated by branch.

## Lesson 1.4

* To crete this project in new folder

```bash
$mkdir module-0_lesson
$cd ./module-0_lesson
$npm init
```

* To debug it's simple, just put a debug mark in the code entry point "named main in package.json", click in run and debug button and choose Node.JS option while the file is in focus.
* To configure an input param in the debug window simply create a launch.json file and select node.js option while project file is in focus. This able to debug independent the window focused.

## Lesson 1.6.1

* Show different kind of module, how to export and the differences.

## Lesson 1.6.2

* Show different ways to write a file and how use async functions.

## Lesson 1.6.3

* How to write and read a json file.

## Lesson 1.6.4

* Talk a little about 'readline' library.

## Lesson 1.6.5

* Introduction of 'events' module.

## Lesson 1.6.6

* HTTP native module.
* How to use nodemon.

```bash
$npm install --save-dev nodemon
```

in my case I prefer install nodemon locally as dev dependency. So in order to run nodemon, add in package.json:

```json
"scripts": {
    ...
    "start": "nodemon ./1-6-6"
  },
```

and run with:

```bash
$npm start
```

## Lesson 2.1

* Install express

```bash
$npm i express
```

* How to debug:
  
  Stop the server if It's running locally and simply use the start button in debug tab, don't forget to check the launch.json file (if exists).

## Lesson 2.2.1 ~ 2.2.4

* different ways to configure route and send params.

## Lesson 2.3

* How to use the router functionality of express framework.

## Lesson 2.4

* Error handling.

## Lesson 2.5

* How to log using Winston lib.

```bash
$npm i winston
```

## Lesson 2.6

* Serving static files.

## Lesson 3.1

* Project explanation

## Lesson 3.2

* Create a project folder and setup.
* Add nodemon custom config file to ignore changes in json files

## Lesson 3.3

* Create post route
* How to write in json file formatted

## Lesson 3.4

* Create get route
* Define global variable
* Delete operator

## Lesson 3.5

* Create get by id route

## Lesson 3.6

* Create delete route

## Lesson 3.7

* Create put and patch route

## Lesson 3.8

* error handling

## Lesson 3.9

* saving custom log using winston

## Lesson 3.10

* verify some input data fields

## Lesson DBJ 3.11

* How to use a library called Cors to manage CORS

To enable all routes

```javascript
import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
...
```

To enable a single route

```javascript
router.get(`/`, cors(), (req, res) => {
    ...
});
```

## Lesson DBJ 3.12

* Api documentation tool: [Swagger](https://swagger.io/tools/swagger-editor/)

To install

```bash
$npm i swagger-ui-express
```

## Lesson DBJ 4.1

* explanation how to organize your project

## Lesson DBJ 4.2.1

* Refactor post route to Controller

## Lesson DBJ 4.2.2

* finalize refactor router to controller

## Lesson DBJ 4.3.1

* Start refactor to services

## Lesson DBJ 4.3.2

* Finish refactor to services

## Lesson DBJ 4.4.1

* Start repository

## Lesson 4.4.2

* Finishing project organization:
  * Router: Handle requisitions to the controllers
  * Controller: Validate input data, call the service and send response back
  * Service: Have all business rules and call repository when have to deal with database
  * Repository: Deal with CRUD stuff in database

## Lesson 5.1

* GraphQL overall explanation

## Lesson 5.2.1

* Installation of graphQl and initial setup

## Lesson 5.2.2

* Resolvers and quick explanation how to use GraphiQL

## Lesson 5.2.3

* Mutations

## Lesson 5.2.4

* refactor graphql

## Lesson 5.2.5

* finalize refactor
