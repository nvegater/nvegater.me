import Auth0js from 'auth0-js';
/*

Gatsby (single page app, no backend) --> rjson webtoken directly using:
olaf 2.0 flow called: implicit, it gives us in the query string parameters:
-id_token
-access token
- and whatever else we request

if we were building a traditional web application (not a single page app)
we would use 'code' instead of 'token'
the 'code' would be an authorization string that then we would exchange for tokens
token (to make calls for API): Access token, we do use this to talk to an API
id_token (for the client to display stuff):  Just about an specific user. no protected resources.
JSON webtoken that has just info about who the user is.

*/
export const login = () => {

  // To know that we are in the browser
  if (typeof window !== "undefined"){
    const auth0 = new Auth0js.WebAuth({
      domain: process.env.AUTH0_DOMAIN?process.env.AUTH0_DOMAIN:'', //where to auth
      clientID: process.env.AUTH0_CLIENTID?process.env.AUTH0_CLIENTID:'', // a token: check that im Legit
      redirectUri: process.env.AUTH0_CALLBACK?process.env.AUTH0_CALLBACK:'', // where to send when shit goes down
      responseType: 'token id_token',
      scope: 'openid profile email',
    })
    auth0.authorize();
  }
}
