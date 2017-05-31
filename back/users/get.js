'use strict';

const dynamodb = require('../common/dynamodb');

module.exports.get = (event, context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    //IndexName: 'id', // optional (if querying an index)
    KeyConditionExpression: 'id = :value', // a string representing a constraint on the attribute
    ExpressionAttributeValues: { // a map of substitutions for all attribute values
      ':value': event.pathParameters.id
    }
  };

  // fetch todo from the database
  dynamodb.query(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t fetch the todo item.'));
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result),
    };
    callback(null, response);
  });
};

module.exports.me = (event, context, callback) => {
  
  const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: { // a map of attribute name to AttributeValue for all primary key attributes
          id: event.requestContext.authorizer.principalId
      },
      AttributesToGet: [ // optional (list of specific attribute names to return)
          'id',
          'name',
          'email',
          'role'
      ],
  };

  // fetch todo from the database
  dynamodb.get(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t fetch the todo item.'));
      return;
    }

    // create a response
    console.log(result);
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
    callback(null, response);
  });
};
