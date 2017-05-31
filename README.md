# Serverless fullstack example

This example shows how to build an angular app backed by a serverless API.

This example demonstrates how to run a service locally, using the
[serverless-offline](https://github.com/dherault/serverless-offline) plugin. It
provides a REST API to provide authentication and manage account  stored in a DynamoDB.

A local DynamoDB instance is provided by the
[serverless-dynamodb-local](https://github.com/99xt/serverless-dynamodb-local)
plugin.



## Setup

In the `back` folder, run:

```bash
npm install
serverless dynamodb install
```

## Run service offline

Both front end and back end have to started separately.

In the `back` folder, run:

```bash
serverless offline
```
In the `front` folder, run:

```bash
npm start
```
Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.