import axios from "axios";
import qs from "qs";

const request = axios.create({
  withCredentials: true,
});

const clientId = process.env.REACT_APP_CLIENT_ID;
const redirectUri = process.env.REACT_APP_REDIRECT_URI;
const scope = "user-top-read user-read-recently-played";
const spotifyAccountURL = "https://accounts.spotify.com";

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

const buildAuthorizationUrl = (codeChallenge, state) => {
  const params = {
    response_type: "code",
    client_id: clientId,
    scope,
    code_challenge_method: "S256",
    codeChallenge,
    redirect_uri: redirectUri,
    state,
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

  const authUrl = buildAuthorizationUrl(codeChallenge, state);
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
  // console.log("Code:", code);
  // console.log("State:", state);
  // console.log("Error:", error);
  if (error) {
    window.history.replaceState({}, document.title, "/");
    window.localStorage.removeItem("state");
    console.log(error);
    throw new Error(error);
  } else if (!code || !state) {
    return;
  }
  if (state !== window.localStorage.getItem("state")) {
    window.localStorage.removeItem("state");
    window.history.replaceState({}, document.title, "/");
    throw new Error("State mismatch");
  }
  window.localStorage.removeItem("state");
  // window.history.replaceState({}, document.title, "/");
  // await retrieveToken(code);
};

export const retrieveToken = async () => {
  const code = getURLParams().code;
  const codeVerifier = localStorage.getItem("code_verifier");

  console.log("Code verifier:", codeVerifier);
  console.log("Client ID:", clientId);
  console.log("Redirect URI:", redirectUri);
  console.log("Code:", code);

  const requestData = qs.stringify({
    client_id: clientId,
    grant_type: "authorization_code",
    code: code,
    redirect_uri: redirectUri,
    code_verifier: codeVerifier,
  });
  console.log("Request data:", requestData);

  try {
    console.log("Making request to /api/token");
    const response = await request.post(
      `${spotifyAccountURL}/api/token`,
      requestData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("Token response:", response.data);
  } catch (error) {
    console.error("Error fetching token:", error);
  }
};

export const logout = async () => {
  localStorage.clear();
  window.location.href = redirectUri;
};

export const loggedIn = () => {
  return localStorage.getItem("access_token") === "true";
};
