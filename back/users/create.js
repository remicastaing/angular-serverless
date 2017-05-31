'use strict';


var defaultByteSize = 16;
var defaultIterations = 10000;
var defaultKeyLength = 64;

const uuid = require('uuid');
const Isemail = require('isemail');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const dynamodb = require('../common/dynamodb');
var fs = require("fs")

module.exports.create = (event, context, callback) => {

  const data = JSON.parse(event.body);

  var user = 
  {
      name: data.name,
      email: data.email,
      role: data.role || 'user',
      password : data.password,
    }

  ValidateEmail(user)
    .then(checkPreviousUser)
    .then(addSalt)
    .then(encryptPassword)
    .then( createNewUser)
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
          statusCode: 400,
          body: JSON.stringify({message : error.message}),
        };
        callback(null,response);
    })

};




    /**
   * ValidateEmail - check if the email is valid
   *
   * @param {String} valid
   * @return {Boolean}
   * @api public
   */
  

  function ValidateEmail(user) 
  {
    if (Isemail.validate(user.email)) {
      return Promise.resolve(user);
    } else {
      return Promise.reject(new Error('Invalid email address: '+user.email))
    }
  };

  function checkPreviousUser(user)
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
        if (data.Count>0) throw new Error('Email already exists');
        return Promise.resolve(user);
    })
  }
  
  function createNewUser(user) {

    const timestamp = new Date().getTime();

    user.id =  uuid.v1();
    user.createdAt = timestamp;
    user.updatedAt = timestamp;

    const param = {
      TableName: process.env.DYNAMODB_TABLE,
      Item: user,
      ReturnValues: 'ALL_OLD'
    };

    return dynamodb.put(param).promise().then(function(result) {
      console.log('user created');      
      return Promise.resolve(user);
    });
  }
    /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} password
   * @param {Function} callback
   * @return {Boolean}
   * @api public
   */
  function authenticate(password, callback) {
    if(!callback) {
      return this.password === this.encryptPassword(password);
    }

    this.encryptPassword(password, (err, pwdGen) => {
      if(err) {
        return callback(err);
      }

      if(this.password === pwdGen) {
        return callback(null, true);
      } else {
        return callback(null, false);
      }
    });
  };

  /**
   * Make salt
   *
   * @param {Number} [byteSize] - Optional salt byte size, default to 16
   * @return {String}
   * @api public
   */
  function addSalt(user) {
    user.salt = crypto.randomBytes(defaultByteSize);
    return Promise.resolve(user);
  };



  function encryptPassword(user) {
    user.encryptedPassword = crypto.pbkdf2Sync(user.password, user.salt, defaultIterations, defaultKeyLength).toString('base64');
    delete user.password;
    return Promise.resolve(user);
  }
