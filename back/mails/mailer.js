'use strict';

import { ErrorResponse, ValidResponse } from '../common/response';
import * as path from 'path';
const fs = require('fs');
import nodemailer  from 'nodemailer';
import AWS from 'aws-sdk';
import * as juice from 'juice';
import { templates } from './templates/';
import { css } from './ink.css.js';
import { _ } from 'lodash';

if (!AWS.config.region) {
  AWS.config.update({
    region: 'eu-west-1'
  });
}

// create Nodemailer SES transporter
let transporter = nodemailer.createTransport({
    SES: new AWS.SES({
        apiVersion: '2010-12-01'
    })
});

export const sendmail = (mail, data) => {

    var htmlTemplate = _.template(templates[mail]);

    const html = juice.inlineContent(htmlTemplate(data), css);

    console.log('Sending Mail Verification');

    transporter.sendMail({
        from: process.env.FROM_ADDRESS,
        to: data.email,
        subject: data.subject,
        html: html,
        text: 'I hope this message gets sent!',
        ses: { // optional extra arguments for SendRawEmail
        }
    }, (err, info) => {
        //console.log(err);
        //console.log(info);
    });
};






