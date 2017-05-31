'use strict';

module.exports.get = (event, context, callback) => {

  const things = [
  {"_id":"5897922c7fd8547ed6f75a04","name":"Angular-CLI","info":"The Angular CLI helps you building the front end.", "img":"assets/ng-cli.jpg","__v":0},
  {"_id":"5897922c7fd8547ed6f75a05","name":"Serverless","info":"The Serverless Framework allows you to deploy auto-scaling microservices for your backend.", "img":"assets/serverless.jpg","__v":0},
  {"_id":"5897922c7fd8547ed6f75a08","name":"Angular","info":"Build your front-end with the TypeScript-based open-source web application platform", "img":"assets/angular.jpg","__v":0},
  {"_id":"5897922c7fd8547ed6f75a06","name":"Lambda","info":"AWS Lambda lets you run code without provisioning or managing servers.", "img":"assets/lambda.jpg","__v":0},
  {"_id":"5897922c7fd8547ed6f75a07","name":"DynamoDB","info":"Amazon DynamoDB is a fully managed NoSQL database service.", "img":"assets/dynamodb.jpg","__v":0},

  //{"_id":"5897922c7fd8547ed6f75a09","name":"Deployment Ready","info":"Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators", "img":"assets/Angular-CLI.jpg","__v":0}
  ];

  const response = {
    statusCode: 200,
    body: JSON.stringify(things)
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
