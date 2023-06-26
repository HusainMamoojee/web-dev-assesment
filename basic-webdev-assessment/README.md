# stratuSolve Developer Assessment
> prepared by Johan Marx
## Welcome
Hi there potential future stratuSolve developer. This assessment is meant to be a short test to gauge your software development and problem solving skills. 
A big part of being a software developer is to be able to get a feel for a program and quickly understand the flow of data. Therefore you are given a simple but partially finished app, which we expect you to complete.

---
## Scenario
You are a freelance developer that received a partially completed TODO list app built by another (imperfect and time constraint) developer. The reading of data from the backend to frontend seems to be working but the creating, updating and deleting of data was not done. The client is complaining that changes does not persist after page reload. Your assignment is to complete this app for said client.

### Tech Stack
The technology stack looks something like this:

*Front End*
- HTML
- CSS
- Bootstrap 5
- Vanilla JavaScript
- Fetch API

*Back End*
- PHP 8
- RESTful API

---
## Task
Broadly speaking, you should enable data persistance. You should write the PHP and JavaScript code for creating, updating and deleting of TODO items. You need to use the provided JSON file, `api/todo.json`, as a simple file-based database for the back-end.

### Files
You are expected to update the following files:

- `api/todo.php`
- `api/todo.controller.php`
- `app.js`

### Evaluation
The changes you make will be evaluated by one of our senior developers who will look at the following code criteria:

- Functionality
- Robustness
- Style
- Principles
- Performance

### Getting started
You will need some way to run an **Apache** web server and **PHP 8.0+** on your local machine for development. Note that if you have never worked with PHP that this might take some time to get right.

Suggested ways:

*LAMP / MAMP Stack*

Using a stand alone application to provide you with the full Linux/Mac/Windows + Apache + MySql + PHP stack.

- Linux https://bitnami.com/stack/lamp/installer
- MacOS / Windows https://www.mamp.info/

*Docker + Docker Compose*

Using the included `docker-compose.yml` file with Docker and Docker Compose can be the easiest way to get your development environment with PHP and Apache set up.

- Docker https://docs.docker.com/get-docker/
- Docker Compose https://docs.docker.com/compose/install/

### Sharing your solution
After you are done and happy with the app, you should share your **public** GitHub repo containing the solution with your stratuSolve contact. Be sure to actively use your repo while developing to have a representative commit history.

---
## In closing
Software is never complete, so striving for a "perfect" solution is a fool's errant in many situations. However we always try to do the best we can with the time alloted to us. So have fun, try your best and don't obsess. GLHF
