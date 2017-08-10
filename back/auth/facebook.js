'use strict';

import OAuth from 'oauth';;
import https from 'https';
import { User } from '../users/user.model';
import { ErrorResponse, ValidResponse } from '../common/response';

var oauth2 = new OAuth.OAuth2(
	process.env.FACEBOOK_ID,
	process.env.FACEBOOK_SECRET,
	"https://graph.facebook.com/",
	null,
	"v2.8/oauth/access_token");



export const auth = (event, context, callback) => {
	/*
	 * return error if query string has an error parameter. e.g. if user
	 * declines to grant access.
	 * error=access_denied&error_code=200&error_description=Permissions+error&error_reason=user_denied
	 */
	if (event.queryStringParameters && event.queryStringParameters.error) {
		callback(null, getFailureResponse(event.queryStringParameters));
	}

	// redirect to facebook if "code" is not provided in the query string
	else if (!event.queryStringParameters || !event.queryStringParameters.code || !event.queryStringParameters.redirect_uri) {

		const response = {
			statusCode: 200,
			body: JSON.stringify({ client_id: process.env.FACEBOOK_ID }),
		};
		callback(null, response);

	}

	// process request from facebook that has "code"
	else {
		const options = {
			"redirect_uri": event.queryStringParameters.redirect_uri
		};
		oauth2.getOAuthAccessToken(
			event.queryStringParameters.code,
			options,
			function (error, access_token, refresh_token, results) {

				if (error) {
					console.log(error);
					callback(null, getFailureResponse(error));
				}

				var url = "https://graph.facebook.com/me?fields=id,name,email,picture&access_token=" + access_token;

				https.get(url, function (res) {
					console.log("got response: " + res.statusCode);

					var body = '';

					res.on('data', function (chunk) {
						body += chunk;
					});

					res.on('end', function () {
						var json = JSON.parse(body);

						const userData = {
							name: json.name,
							email: json.email,
							picture: json.picture.data
						}

						User.createFBUser(userData)
							.then(function (user) {
								//user.sendEmailVerification(verifyCallback);
								callback(null, ValidResponse({ token: user.token(18000) }));
							})
							.catch(function (error) {
								callback(null, ErrorResponse({ message: error.message }));
							})
					});
				}).on('error', function (error) {
					console.log(error);
					callback(null, getFailureResponse(error));
				});
			}
		);
	}
};

function getSuccessResponse(userId, url) {
	// you could set a session cookie here (e.g. JWT token) and return it to the
	// users browser...
	var response = {
		statusCode: 302,
		headers: {
			'Location': url,
		}
	};
	return response;
}

function getFailureResponse(error) {
	// this pretty raw... were just going to return a crude error... you could
	// do something pretty here
	var response = {
		statusCode: 400,
		body: JSON.stringify(error),
	};
	return response;
}
