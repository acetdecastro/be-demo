## Description

- This project uses [Nest](https://github.com/nestjs/nest)'s framework starter repository.
- To help in testing, a Postman collection called `be-demo` was sent in the email along with the environment variables.
- REST url: `http://{{localhost}}/api`
- GraphQL url: `http://{{localhost}}/api/graphql`
- Regarding Axie's current price, please see Issue [#4](/../../issues/4).

## Project setup
Make sure to have a `.env` file in the root directory. The variables were sent in the email.

Start the project:
```bash
$ docker compose up --build
```

## Authentication
1. Sign Up: Use the `signUp` GraphQL mutation via `/api/graphql`.
```graphQL
mutation {
  signUp(createUserInput: {
    email: "test@mail.com"
    password: "Test123!"
  }) {
    _id
    email
    createdAt
    updatedAt
  }
}
```
2. Log In: Make a POST request to `/api/auth/login` with the request body. Once logged in, an Authentication cookie is added along with the JWT token. You can then send requests to protected endpoints/routes.
```json
{ "email": "", "password": "" }
```
3. Log Out: Make a POST request to `/api/auth/logout`.

## Axie
1. Fetch and Save Axies: Use the GraphQL `fetchAndSaveAxies` mutation:
```graphQL
mutation {
    fetchAndSaveAxies {
        upsertedCount
    }
}
```
2. Fetch All Axies: Use the GraphQL `getAllAxies` query to retrieve all stored Axies in the database.
```graphQL
query {
    getAllAxies {
        total
        results {
            _id
            axieId
            name
            stage
            class
        }
    }
}
```
3. Fetch Axies by Class: Use the GraphQL `getAxiesByClass` query to fetch Axies by their class.
```graphQL
query {
    getAxiesByClass(class: PLANT) {
        total
        results {
            _id
            axieId
            name
            stage
            class
        }
    }
}
```
4. Clear All Class Collections: Use the GraphQL `clearClassCollections` mutation to clear all class collections in the database.
```graphQL
mutation {
    clearClassCollections
}
```
## Blockchain
1. Use the GraphQL `getMarketplaceManager` query to call the `marketplaceManager` function in the Axie Infinity Smart Contract.
```graphQL
query {
    getMarketplaceManager
}
```
