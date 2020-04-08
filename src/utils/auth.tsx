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

// To speed things up, we’ll keep the profile stored unless the user logs out.
// This prevents a flicker while the HTTP round-trip completes.
let profile:boolean = false;

const auth0:WebAuth | undefined = isBrowser? new Auth0js.WebAuth({
  domain: process.env.AUTH0_DOMAIN?process.env.AUTH0_DOMAIN:'', //where to auth
  clientID: process.env.AUTH0_CLIENTID?process.env.AUTH0_CLIENTID:'', // a token: check that im Legit
  redirectUri: process.env.AUTH0_CALLBACK?process.env.AUTH0_CALLBACK:'', // where to send when shit goes down
  responseType: 'token id_token',
  scope: 'openid profile email',
}) : undefined;

interface Tokens {
  idToken: string | undefined;
  accessToken: string | undefined;
  expiresAt: number | undefined;
}

let tokens:Tokens = {
  idToken: undefined,
  accessToken: undefined,
  expiresAt: undefined
}

export const login = () => {
  if (auth0!==undefined) {
    auth0.authorize();
  } else {
    console.log("Problem while logging in. auth0 was probably used during build proccess. This is not possible in Gatsby")
  }
}

export const logout = () => {
  localStorage.setItem('isLoggedIn','false');
  profile = false;

  const { protocol, host } = window.location;
  const returnTo = `${protocol}//${host}`;

  if (auth0!==undefined) {
    auth0.logout({ returnTo });
  } else {
    console.log("Problem in logout. Auth is undefined")
  }
}

const setSession = (callback:any) => (err:any,auth0Result:any) => {
  // This is to store id and access Token in memory. This is more secure than persisting tokens
  if (!isBrowser) {
    console.log("Not Browser")
    return;
  }
  if (err){
    console.error(err);
    callback();
  }

  // ParseHash extracted Access and Id Token from query string params (from the hashfragment in the url)
  if(auth0Result && auth0Result.accessToken && auth0Result.idToken){
    let expiresAt = auth0Result.expiresIn * 1000 + new Date().getTime();

    tokens.idToken = auth0Result.idToken;
    tokens.accessToken = auth0Result.accessToken;
    tokens.expiresAt = expiresAt;

    profile = auth0Result.idTokenPayload;
    localStorage.setItem('isLoggedIn', 'true');
    callback();
  }
};

export const silentAuth = (callback:any) => {
  if (!isBrowser) {
    console.log("Not Browser")
    return;
  }
  if (!isAuthenticated()) return callback();
  auth0?.checkSession({}, setSession(callback));
};

export const isAuthenticated = () => {
  if (!isBrowser) {
    console.log("Not Browser")
    return;
  }

  return localStorage.getItem('isLoggedIn') === 'true';
};

export const handleAuthentication = (callback = () => {}) => {
  if (!isBrowser) {
    console.log("Not Browser")
    return;
  }
  auth0?.parseHash(setSession(callback));
};

export const getAccessToken = () => {
  if (!isBrowser) {
    return '';
  }

  return tokens.accessToken;
};

export const getUserInfo = () => {
  if (profile) {
    return profile;
  }
};

