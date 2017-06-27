# Blockstarter 4 Frontend

## Structure of the repo

### app

Nodejs backend app. Main functionality: Authentication via JWT.

### public

Angular frontend app.

## Getting Started

### Step 1: Start mongodb

Run `mongod`.

### Step 2: Run node app

Navigate to app folder.
Run `npm install`.
Run `nodemon`.
Node app will run at `http://localhost:3000/`.

### Step 3: Initially register user via Postman

Endpoint:
`http://localhost:3000/users/register`

Headers:
`Content-Type: application/json`

Body:
`{
 	"name": "Johnny Blockstarter",
 	"email": "blockstarter@rich.com",
 	"username": "jblock",
 	"password": "blockstarter4"
 }`

### Step 4: Run Angular app

Navigate to public folder.
Run `npm install`.
Run `ng serve --open`.
Angular app will run at `http://localhost:4200/`.

### Step 5: Login with given credentials

Navigate to Login. Type in the given credentials to enter.

## Next steps

tpd...