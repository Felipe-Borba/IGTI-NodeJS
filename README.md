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
