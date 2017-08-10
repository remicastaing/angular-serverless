'use strict';

import { User } from './user.model';
import { ErrorResponse, ValidResponse } from '../common/response';
import { _ } from 'lodash';
import jwt from 'jsonwebtoken';

export const confirm = (event, context, callback) => {

  const token = event.queryStringParameters.token;

    
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="description" content="">
        <meta name="author" content="">
        <link rel="icon" href="../../favicon.ico">

        <title>Narrow Jumbotron Template for Bootstrap</title>

        <!-- Bootstrap core CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">

        <!-- Custom styles for this template -->

      </head>

      <body>

        <div class="container">
          <div class="header clearfix">

            <h3 class="text-muted">Project name</h3>
          </div>

          <div class="jumbotron">
            <h1 class="display-3"><%= tittle %></h1>
            <p class="lead"><%= message %></p>
          </div>



          <footer class="footer">
            <p>&copy; Company 2017</p>
          </footer>

        </div> <!-- /container -->

        <!-- Bootstrap core JavaScript
        ================================================== -->
        <!-- Placed at the end of the document so the pages load faster -->
        <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->

      </body>
    </html>
    `

  var htmlTemplate = _.template(html);

  jwt.verify(token, process.env.VERIFY_MAIL, (err, decoded) => {
    
    console.log(decoded);
    var message;

    if (err) {
       message = {
         tittle: 'Oups!',
         message: "Quelque chose n'a pas bien marché."
       }
    } else {
      message = {
         tittle: 'Génial!',
         message: "L'étape de confirmation de votre adresse mail s'est bien passée."
       }
        console.log('id: ' + decoded.user.id);
      User.findUserById(decoded.user.id)
      .then((user) => {
        console.log(user);
        
      });
      
    }

    const response = {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: htmlTemplate(message),
    };
    callback(null, response)
  });








};


