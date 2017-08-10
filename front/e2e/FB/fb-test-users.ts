'use strict';

import * as request from 'request';

export class FBTestUsers {
  appID: string;
  secret: string;
  access_token: string;

  constructor(appID, secret, access_token = null) {
    this.appID = appID;
    this.secret = secret;
    this.access_token = access_token;

    return this;
  }

  getAccessToken(callback) {
    if (this.access_token) {
      callback(null, this.access_token);
    } else {
      this.fetchAccessToken(callback);
    }
  }

  fetchAccessToken(callback) {
    const that = this;
    const url = 'https://graph.facebook.com/oauth/access_token';
    const qs = {
      client_id: this.appID,
      client_secret: this.secret,
      grant_type: 'client_credentials'
    };
    request.get({ url, qs, json: true }, (error, response, { access_token }) => {
      that.access_token = access_token;
      callback(error, that.access_token);
    });
  }

  list(callback) {
    const that = this;
    this.getAccessToken((error, access_token) => {
      const url = `https://graph.facebook.com/${that.appID}/accounts/test-users`;
      const qs = {
        access_token
      };
      request.get({ url, qs, json: true }, (err, response, { data }) => {
        callback(err, data);
      });
    });
  }

  create(args, callback) {
    const that = this;
    args = args || {};
    args.installed = (args.installed !== null) ? args.installed : true;
    args.permissions = args.permissions || 'read_stream';

    this.getAccessToken((error, access_token) => {
      const url = `https://graph.facebook.com/${that.appID}/accounts/test-users`;
      const qs = {
        access_token,
        installed: args.installed,
        locale: 'fr_FR',
        permissions: args.permissions,
        method: 'post'
      };
      request.post({ url, qs, json: true }, (err, response, users) => {
        callback(err, users);
      });
    });
  }

  update(userID, { password, name }, callback) {
    this.getAccessToken((err, access_token) => {
      const url = `https://graph.facebook.com/${userID}`;
      const qs = {
        method: 'post',
        access_token,
        password,
        name
      };
      request.post({ url, qs, json: true }, (err, response, body) => {
        callback(err, body);
      });
    });
  }

  getUserInfo(user, callback) {
    const url = `https://graph.facebook.com/me`;
    const qs = {
      method: 'get',
      field: 'id,name,email,picture',
      access_token: user.access_token
    };
    request.get({ url, qs, json: true }, (err, response, body) => {
      callback(err, body);
    });
  }

  delete(userID, callback) {
    this.getAccessToken((error, access_token) => {
      const url = `https://graph.facebook.com/${userID}`;
      const qs = {
        method: 'delete',
        access_token
      };
      request.post({ url, qs, json: true }, (err, response, body) => {
        callback(err, body);
      });
    });
  }
}

