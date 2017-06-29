# Blockstarter 4

## Structure of the repo

### backend

User-Endpoints:

* POST /users (Create a user)
* POST /users/authenticate (Login)
* GET /users/profile (Get the profile of the logged-in user)
* GET /users/profile/projects (Get all projects the logged-in user created)
* GET /users/profile/investments (Get all projects the logged-in user invested in)

Project-Endpoints:
* GET /projects (List all projects)
* POST /projects (Create a new project - must be logged-in)
* POST /projects/:id/invest (Invest in a project - must be logged-in)

### public

Angular frontend app.

## Getting Started

### Step 1: Start Application

Run `docker-compose up`

The frontend is available at `http://localhost:4200/`, the backend at `http://localhost:3000/`

On startup, two user get created:
* User 1: creator
* User 2: backer
* Password: blockstarter4

### Step 2: Login with given credentials

Navigate to Login. Type in the given credentials to enter.