'use strict';

const crypto = require('crypto');
const dynamodb = require('../common/dynamodb');
var defaultByteSize = 16;
var defaultIterations = 10000;
var defaultKeyLength = 64;

module.exports.password = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  var user = 
  {
    id: event.pathParameters.id,
    oldPassword : data.oldPassword,
    newPassword : data.newPassword
  }

  findUser(user)
  .then(checkPassword)
  .then(encryptPassword)
  .then(updatePassword)
  .then(function(user) {
    const response = {
      statusCode: 200,
      body: JSON.stringify({message : 'Your password has been succesfully updated.'}),
      };
      callback(null, response);
    })
  .catch(function(error){
    const response = {
      statusCode: 403,
      body: JSON.stringify({message : error.message}),
    };
    callback(null,response);
  })



};


function findUser(user)
{
  const param = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: user.id,
    },
    Limit: 1
  };

  return dynamodb.get(param).promise().then((data)=>{
    if (!data.Item) throw new Error("User doesn't exist");
    user.encryptedPassword = data.Item.encryptedPassword;
    user.salt = data.Item.salt;
    return Promise.resolve(user);
  });
}

function checkPassword(user){
  console.log(user.salt);
  if (user.encryptedPassword === crypto.pbkdf2Sync(user.oldPassword, user.salt, defaultIterations, defaultKeyLength).toString('base64')) {
    return Promise.resolve(user);
  } else {
    return Promise.reject(new Error('Your old passwold is incorrect, please try again.'));
  }
}

function encryptPassword(user) {

  user.encryptedPassword = crypto.pbkdf2Sync(user.newPassword, user.salt, defaultIterations, defaultKeyLength).toString('base64');
  delete user.password;
  return Promise.resolve(user);
}

function updatePassword(user){

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: user.id,
    },
    ExpressionAttributeValues: {
      ':encryptedPassword': user.encryptedPassword,
      ':updatedAt': new Date().getTime(),
    },
    UpdateExpression: 'SET encryptedPassword = :encryptedPassword, updatedAt = :updatedAt',
    ReturnValues: 'ALL_NEW',
  };

  // update the todo in the database
  dynamodb.update(params, (error, result) => {
    // handle potential errors
    if (error) {
      return new Error('Couldn\'t update password.');
    }
    return Promise.resolve(result);
  });
}