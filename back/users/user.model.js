'use strict';

import _ from 'lodash';


var defaultByteSize = 16;
var defaultIterations = 10000;
var defaultKeyLength = 64;

import uuid from 'uuid';
import Isemail from 'isemail';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import dynamodb from '../common/dynamodb';


export var User = class {
    constructor(id = null, name, email, password, role = 'user', salt = null) {

        if (!Isemail.validate(email)) {
            throw new Error('Invalid email address: ' + email);
        }

        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;

        if (salt) {
            this.salt = salt;
            this.password = password;
        } else {
            this.salt = crypto.randomBytes(defaultByteSize);
            this.password = encryptPassword(password, this.salt);
        }

        this.checkPreviousUser = this.checkPreviousUser.bind(this);
        this.save = this.save.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
    }

    create() {
        return this.checkPreviousUser()
            .then(this.save);
    }

    checkPreviousUser() {
        const searchPrevious = {
            TableName: process.env.DYNAMODB_TABLE,
            IndexName: 'email', // optional (if querying an index)
            KeyConditionExpression: 'email = :value', // a string representing a constraint on the attribute
            ExpressionAttributeValues: { // a map of substitutions for all attribute values
                ':value': this.email
            },
            Limit: 1
        };
        return dynamodb.query(searchPrevious).promise().then((data) => {
            if (data.Count > 0) throw new Error('Email already exists');
            return Promise.resolve(this);
        })
    }


    save() {
        const timestamp = new Date().getTime();

        this.id = uuid.v1();
        this.createdAt = timestamp;
        this.updatedAt = timestamp;

        const param = {
            TableName: process.env.DYNAMODB_TABLE,
            Item: this,
            ReturnValues: 'ALL_OLD'
        };

        return dynamodb.put(param).promise().then((result) => {
            return Promise.resolve(this);
        });
    }

    static findUserById(id) {

        const params = {
            TableName: process.env.DYNAMODB_TABLE,
            Key: {
                id: id
            },
        };

        return dynamodb.get(params).promise().then((result) => {
            return Promise.resolve(new User(result.Item.id, result.Item.name, result.Item.email, result.Item.password, result.Item.role, result.Item.salt));
        }, (error) => {
            throw new Error('Couldn\'t fetch the user');
        })
    }

    static findUserByEmail(email) {

        if (!Isemail.validate(email)) {

            return Promise.reject(new Error('Invalid email address: ' + email))
        }
        const searchUser = {
            TableName: process.env.DYNAMODB_TABLE,
            IndexName: 'email', // optional (if querying an index)
            KeyConditionExpression: 'email = :value', // a string representing a constraint on the attribute
            ExpressionAttributeValues: { // a map of substitutions for all attribute values
                ':value': email
            },
            Limit: 1
        };
        return dynamodb.query(searchUser).promise().then((result) => {
            if (result.Count === 0) throw new Error("User doesn't exist");
            return Promise.resolve(new User(result.Items[0].id, result.Items[0].name, result.Items[0].email, result.Items[0].password, result.Items[0].role, result.Items[0].salt));
        });
    }

    checkPassword(password) {
        if (this.password === crypto.pbkdf2Sync(password, this.salt, defaultIterations, defaultKeyLength).toString('base64')) {
            return Promise.resolve(this);
        } else {
            return Promise.reject(new Error('Something went wrong, please try again.'));
        }

    }

    forFrontEnd() {
        return _.pick(this, ['id', 'name', 'email', 'role'])
    }

    token(expiresIn) {
        return jwt.sign({ id: this.id, role: this.role }, process.env.SESSION_SECRET, {
            expiresIn: expiresIn
        });
    }

    updatePassword(newPassword) {

        const params = {
            TableName: process.env.DYNAMODB_TABLE,
            Key: {
                id: this.id,
            },
            ExpressionAttributeValues: {
                ':password': encryptPassword(newPassword, this.salt),
                ':updatedAt': new Date().getTime(),
            },
            UpdateExpression: 'SET password = :password, updatedAt = :updatedAt',
            ReturnValues: 'ALL_NEW',
        };

        // update the todo in the database
        dynamodb.update(params, (error, result) => {
            // handle potential errors
            if (error) {
                return Promise.reject(new Error('Couldn\'t update password.'));
            }
            return Promise.resolve(result);
        });
    }

}

function encryptPassword(password, salt) {
    return crypto.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength).toString('base64')
} 




