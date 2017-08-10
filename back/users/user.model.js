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
import { sendmail } from '../mails/mailer';


export var User = class {

    constructor(userData) {
        if (!Isemail.validate(userData.email)) {
            throw new Error('Invalid email address: ' + email);
        }

        this.name = userData.name;
        this.email = userData.email;
        this.id = userData.id || null;
        this.role = userData.role || 'user';
        this.local = userData.local || false;
        this.FB = userData.FB || false;
        this.checked = userData.checked || false;

        if (userData.password) {
            if (userData.salt) {
                this.salt = userData.salt;
                this.password = userData.password;
            } else {
                this.salt = crypto.randomBytes(defaultByteSize);
                this.password = encryptPassword(userData.password, this.salt);
            }
        }

        this.checkPreviousUser = this.checkPreviousUser.bind(this);
        this.sendEmailVerification = this.sendEmailVerification.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
    }

    static createLocalUser(userData) {
        userData.local = true;
        var user = new User(userData);
        return user.checkPreviousUser('local')
            .then(User.create);
    }

    static createFBUser(userData) {
        userData.FB = true;
        var user = new User(userData);
        user.mailChecked();
        return User.create(user);
    }

    mailChecked() {
        this.checked = true;
    }

    checkPreviousUser(filter = (x) => x) {
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
            const previousUser = _.filter(data.Items, 'local');
            if (previousUser.length > 0) throw new Error('Email already exists');
            return Promise.resolve(this);
        })
    }

    sendEmailVerification(verifyCallback) {

        var payload = {
            user: {
                id: this.id,
                name: this.name,
                email: this.email
            }
        };

        var token = jwt.sign(payload, process.env.VERIFY_MAIL);
        var callbackUrl = verifyCallback + '?token=' + token;

        const data = {
            name: this.name,
            email: this.email,
            subject: 'Bienvenue à Famli Quest!',
            callbackUrl: callbackUrl

        }
        sendmail('confirm', data);
        return Promise.resolve(this);
    }


    static create(user) {
        const timestamp = new Date().getTime();

        user.id = uuid.v1();
        user.createdAt = timestamp;
        user.updatedAt = timestamp;

        const param = {
            TableName: process.env.DYNAMODB_TABLE,
            Item: user,
            ReturnValues: 'ALL_OLD'
        };

        return dynamodb.put(param).promise().then((result) => {
            return Promise.resolve(user);
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
            const userdata = result.Item;
            return Promise.resolve(new User(userdata));
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
            const res = _.map(result.Items, userData => new User(userData));
            return Promise.resolve(res);
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
        return _.pick(this, ['id', 'name', 'email', 'role', 'checked', 'local', 'FB'])
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






