var defaultByteSize = 16;
var defaultIterations = 10000;
var defaultKeyLength = 64;


import jwt from 'jsonwebtoken';


// Policy helper function
const generatePolicy = (principalId, effect, resource, role) => {
  const authResponse = {};
  authResponse.principalId = principalId;
  authResponse.context = {'role' : role};
  if (effect && resource) {
    const policyDocument = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    const statementOne = {};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  return authResponse;
};


// Reusable Authorizer function, set on `authorizer` field in serverless.yml
export const auth = (event, context, cb) => {

  if (event.authorizationToken) {
    // remove "bearer " from token
    const token = event.authorizationToken.substring(7);

    jwt.verify(token, process.env.SESSION_SECRET, (err, decoded) => {
      console.log(decoded);
      if (err) {
        
        cb('Unauthorized');
      } else {
        cb(null, generatePolicy(decoded.id, 'Allow', event.methodArn, decoded.role));
      }
    });
  } else {
    cb('Unauthorized');
  }
};