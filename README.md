# Basic Banking System REST API (Part 2)
## Introduction

Basic Banking System REST API is a basic Express application that serves API to the clients with CRUD (Create, Read, Update, Delete) functionalities, each will return with a JSON response.

There are now five main endpoints to be served with an additional middleware authentication that is protecting the routes. These endpoints are:
- Users
- Bank_Accounts
- Profiles
- Transactions
- Account_Transaction

and the endpoints that are used for registrating and authenticating the users are:
- Auth
- Registration

Because of the potentiality of expansion and to handle future complexity, a Swagger documentation is made and can be accessed by heading to `/api/v1/docs`.

Every data created through the APIs then stored to each appropriate tables using Prisma ORM before to be managed by PostgreSQL RDBMS.
In addition, there are unit and integration tests (using Jest and Supertest) available when testing the application.

## API Functionalities
### Users
`Users` endpoint will manage the data of users. The API functionalities can be accessed using the following uri:
- `/users`
- `/users/{id}`
- `/users/create`
- `/users/update/{id}`
- `/users/delete/{id}`

### Bank_Accounts
`Bank_Accounts` endpoint will manage the data of user's bank accounts. The API functionalities can be accessed using the following uri:
- `/bank_accounts`
- `/bank_accounts/{id}`
- `/bank_accounts/create`
- `/bank_accounts/update/{id}`
- `/bank_accounts/delete/{id}`

### Profiles
`Profiles` endpoint will manage the data profiles of users. The API functionalities can be accessed using the following uri:
- `/profiles`
- `/profiles/{id}`
- `/profiles/create`
- `/profiles/update/{id}`
- `/profiles/delete/{id}`

### Transactions
`Transactions` endpoint will manage the data transactions of bank accounts. The API functionalities can be accessed using the following uri:
- `/transactions`
- `/transactions/{id}`
- `/transactions/create`
- `/transactions/update/{id}`
- `/transactions/delete/{id}`

### Account_Transactions
`Account_Transactions` endpoint will get the related data between transactions and bank accounts. The API functionalities can be accessed using the following uri:
- `/account_transactions`
- `/account_transactions/{id}`

### Auth
`Auth` endpoint will handle authentication of existing users who are wanting to login and logout. The API functionalities
can be accessed using the following uri:
- `/auth/login/`
- `/auth/logout/`

### Registration
`Registration` endpoint will handle the creation of a new user. The API functionality can be accessed by heading to `/registration` uri.

## Setup
In order to do demo, clone the project by typing this command into the terminal: 
```
git clone https://github.com/L4rryToru4n/BEJS-fgabatch2-AdelbertusLarry-ChallengeChapter05.git
```
or download the project then extract the .zip file.

## Usage Instructions
After downloading or cloning the repository, head to the main directory using a CLI to get the project started and initialize the project's database by running the command
```
npx prisma migrate dev --name init
```
Next, install all of the Node packages by running the command
```
npm install
```
Lastly, to get the project's server running enter the command
```
npm run start
```
All endpoints then can be accessed starting from `localhost:5000/api/v1/{name_of_the_main_endpoint}`.

