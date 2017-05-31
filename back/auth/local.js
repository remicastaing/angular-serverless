'use strict';


var defaultByteSize = 16;
var defaultIterations = 10000;
var defaultKeyLength = 64;

const jwt = require('jsonwebtoken');
const Isemail = require('isemail');
const crypto = require('crypto');
const dynamodb = require('../common/dynamodb');

module.exports.local = (event, context, callback) => {

  const data = JSON.parse(event.body);

    var user = 
   {
      email: data.email,
      password : data.password,
    }

    ValidateEmail(user)
    .then(findUser)
    .then(checkPassword)
    .then(function(user) {
      var token = jwt.sign({ id: user.id, role: user.role }, process.env.SESSION_SECRET, {
        expiresIn: 60 * 60 * 5
      });
      const response = {
        statusCode: 200,
        body: JSON.stringify({ token: token }),
      };
      callback(null, response);
    })
    .catch(function(error){
        const response = {
          statusCode: 401,
          body: JSON.stringify({message : error.message}),
        };
        callback(null,response);
    })


};

  function ValidateEmail(user) 
  {
    if (Isemail.validate(user.email)) {
      return Promise.resolve(user);
    } else {
      return Promise.reject(new Error('Invalid email address: '+user.email))
    }
  };

  function findUser(user)
  {
    const searchPrevious = {
      TableName: process.env.DYNAMODB_TABLE,
      IndexName: 'email', // optional (if querying an index)
      KeyConditionExpression: 'email = :value', // a string representing a constraint on the attribute
      ExpressionAttributeValues: { // a map of substitutions for all attribute values
        ':value': user.email
      },
      Limit: 1
    };
    return dynamodb.query(searchPrevious).promise().then((data)=>{
        if (data.Count===0) throw new Error("User doesn't exist");
         console.log(data.Items[0]);
        user.encryptedPassword = data.Items[0].encryptedPassword;
        user.salt = data.Items[0].salt;
       	user.id = data.Items[0].id;
       	user.role = data.Items[0].role;
        return Promise.resolve(user);
    });
  }

  function checkPassword(user){
    if (user.encryptedPassword === crypto.pbkdf2Sync(user.password, user.salt, defaultIterations, defaultKeyLength).toString('base64')) {
      return Promise.resolve(user);
    } else {
      return Promise.reject(new Error('Something went wrong, please try again.'));
    }
  }