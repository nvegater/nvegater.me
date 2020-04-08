import Auth0js, {WebAuth} from 'auth0-js';
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
const isBrowser = typeof window !== "undefined";

const auth0:WebAuth | undefined = isBrowser? new Auth0js.WebAuth({
  domain: process.env.AUTH0_DOMAIN?process.env.AUTH0_DOMAIN:'', //where to auth
  clientID: process.env.AUTH0_CLIENTID?process.env.AUTH0_CLIENTID:'', // a token: check that im Legit
  redirectUri: process.env.AUTH0_CALLBACK?process.env.AUTH0_CALLBACK:'', // where to send when shit goes down
  responseType: 'token id_token',
  scope: 'openid profile email',
}) : undefined;

export const login = () => {
  if (auth0!==undefined) {
    auth0.authorize();
  } else {
    console.log("Problem while logging in. auth0 was probably used during build proccess. This is not possible in Gatsby")
  }
}

export const handleAuthentication = ()=> {
  if (auth0!==undefined) {
    auth0.parseHash((err,auth0Result)=>{
      if (err){
        console.log(err);
        throw new Error("Auth0 Error");
      }
      // ParseHash extracted Access and Id Token from query string params (from the hashfragment in the url)
      if(auth0Result && auth0Result.accessToken && auth0Result.idToken){

      }

    });
  } else {
    console.log("Problem while logging in. auth0 was probably used during build proccess. This is not possible in Gatsby")
  }
}
