/*
Step-by-step guide to OAuth setup:
https://marketplace.zoom.us/docs/guides/auth/oauth/#oauth-with-zoom
*/

/*
To make an Zoom API call, include the following in the request headers:
"Authorization": "Bearer <ACCESS_TOKEN>"

Note that in many API routes the {userId} parameter can be replaced with "me," to avoid having to look up the userId.
More info: https://marketplace.zoom.us/docs/guides/auth/oauth/#the-me-context
*/

import fetch from 'node-fetch';

const redirect_uri = 'http://localhost:8080';

const oAuth = {
  // Step #2 of the OAuth process: Our server redirects the user to Zoom for login.
  // After the user logs in, Zoom will give them an authorization code.
  requestUserAuthorization: function requestUserAuthorization(req, res, next) {
    // This URL can be found in the Zoom App Marketplace at:
    // Manage > Created Apps > Features for Teachers > Activation
    const url = 'https://zoom.us/oauth/authorize?response_type=code&client_id=150y1dfvSZa9MV9NgIQKwA&redirect_uri=http%3A%2F%2Flocalhost%3A8080';

    //  It's also possible to put it together manually based on this table from the Zoom docs:
    // https://marketplace.zoom.us/docs/guides/auth/oauth#step-1-request-user-authorization

    return res.redirect(url);
  },

  // Step #4 of the OAuth process: Our server asks Zoom for an access token.
  // In order to identify the user we send Zoom the authorization that the client got back from Zoom after the user logged in.
  // https://marketplace.zoom.us/docs/guides/auth/oauth#step-2-request-access-token
  requestAccessToken: function requestAccessToken(req, res, next) {
    // appAuthorizationString will always be the same for every request.
    const appAuthorizationString = 'Basic MTUweTFkZnZTWmE5TVY5TmdJUUt3QToyaFdKWnJsazJacElURGoxTkdDWHVQcnBMczdpNlFFUg==';
    // usersAuthorizationCode will be different for every request.
    // The current string is a placeholder so I can test that the function works.
    const usersAuthorizationCode = '4L79g4rp6s_bfY7EMlDQZOqhwVuzG1N7w'

    const params = new URLSearchParams();
    params.append('code', usersAuthorizationCode);
    params.append('grant_type', 'authorization_code');
    params.append('redirect_uri', redirect_uri);

    fetch('https://zoom.us/oauth/token', {
      method: 'post',
      headers: {
        'Authorization': appAuthorizationString,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params,
    })
      .then(token => token.json())
      .then(token => {
        res.locals.accessToken = token;

        /* Access Token format:
        {
          "access_token": [STRING],
          "token_type": "bearer",
          "refresh_token": [STRING]
          "expires_in": [NUMBER],
          "scope": [STRING OF KEY-VALUE PAIRS SEPARATED BY COLONS] (ex "meeting:read user:read")
        } */

        return next();
      })
      .catch((err) => { return next(err) });
  }
};

module.exports = oAuth;