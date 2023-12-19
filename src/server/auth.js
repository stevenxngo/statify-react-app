import axios from "axios";

const request = axios.create({
  withCredentials: true,
});

const clientId = process.env.REACT_APP_CLIENT_ID;
const redirectUri = process.env.REACT_APP_REDIRECT_URI;
const scope = "user-top-read user-read-recently-played";
const spotifyAccountURL = "https://accounts.spotify.com";

const headers = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

const generateRandomString = (length) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

const sha256 = async (plain) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
};

const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

const buildAuthUrl = (codeChallenge, state) => {
  const params = {
    response_type: "code",
    client_id: clientId,
    scope: scope,
    redirect_uri: redirectUri,
    state: state,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
  };

  const authUrl = new URL(`${spotifyAccountURL}/authorize`);
  authUrl.search = new URLSearchParams(params).toString();
  return authUrl.toString();
};

export const login = async () => {
  const codeVerifier = generateRandomString(64);
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);
  window.localStorage.setItem("code_verifier", codeVerifier);

  const state = generateRandomString(16);
  window.localStorage.setItem("state", state);

  const authUrl = buildAuthUrl(codeChallenge, state);
  window.location.href = authUrl.toString();
};

function getURLParams() {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    code: urlParams.get("code"),
    state: urlParams.get("state"),
    error: urlParams.get("error"),
  };
}

export const retrieveCode = async () => {
  const { code, state, error } = getURLParams();
  if (!code || !state) {
    return;
  }
  else if (error) {
    window.history.replaceState({}, document.title, "/");
    window.localStorage.removeItem("state");
    console.log("Error retrieving code:");
    console.log(error);
    // throw new Error(error);
    // TODO: Handle redirect error
    return;
  }

  if (state !== window.localStorage.getItem("state")) {
    window.localStorage.removeItem("state");
    window.history.replaceState({}, document.title, "/");
    throw new Error("State mismatch");
  }
  window.localStorage.removeItem("state");
  await requestToken(code);
  window.history.replaceState({}, document.title, "/");
};

const saveTokenData = (data) => {
  const { access_token, refresh_token, expires_in } = data;
  const expirationTime = new Date().getTime() + expires_in * 1000;
  localStorage.setItem("access_token", access_token);
  localStorage.setItem("refresh_token", refresh_token);
  localStorage.setItem("expiration_time", expirationTime);
}

export const requestToken = async () => {
  const code = getURLParams().code;
  const codeVerifier = localStorage.getItem("code_verifier");

  const params = {
    client_id: clientId,
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
    code_verifier: codeVerifier,
  };

  try {
    const response = await request.post(
      `${spotifyAccountURL}/api/token`,
      params,
      headers
    );

    console.log("Token response:", response.data);
    saveTokenData(response.data);
  } catch (error) {
    console.error("Error fetching token:", error);
  }
};

export const logout = async () => {
  localStorage.clear();
  window.location.href = redirectUri;
};

export const loggedIn = () => {
  return !!localStorage.getItem("access_token");
};

// const checkExpiration = async () => {
//   const expirationTime = localStorage.getItem("expiration_time");
//   if (expirationTime && new Date().getTime() > expirationTime) {
//     await requestRefreshToken();
//   }
// }
