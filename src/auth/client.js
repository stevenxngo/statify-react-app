import axios from "axios";

const request = axios.create({
  withCredentials: true,
});

const BASE_API = process.env.REACT_APP_API_BASE;
const clientId = process.env.REACT_APP_CLIENT_ID;
const redirectUri = process.env.REACT_APP_REDIRECT_URI;
const scope = process.env.REACT_APP_SCOPE;

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

  const authUrl = new URL("https://accounts.spotify.com/authorize");
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

const handleRedirectError = (error) => {
  window.history.replaceState({}, document.title, "/statify-react-app");
  window.localStorage.removeItem("state");
  console.log(error);
};

export const retrieveCode = async () => {
  const { code, state, error } = getURLParams();

  console.log("code: ", code);
  console.log("state: ", state);
  console.log("error: ", error);

  if (error) {
    console.log("Error authorizing with Spotify:", error);
    handleRedirectError(error);
    return;
  }

  if (code && state) {
    if (state !== window.localStorage.getItem("state")) {
      console.log(
        `State mismatch: ${state} !== ${window.localStorage.getItem("state")}`
      );
      handleRedirectError("State mismatch");
      return;
    }
    window.localStorage.removeItem("state");
    await reqAccessToken(code);
    window.history.replaceState({}, document.title, "/");
    window.location.reload(true);
    return true;
  }
};

export const reqAccessToken = async () => {
  const params = {
    client_id: clientId,
    grant_type: "authorization_code",
    code: getURLParams().code,
    redirect_uri: redirectUri,
    code_verifier: localStorage.getItem("code_verifier"),
  };

  try {
    // const response = await request.post(`${BASE_API}/auth/token`, params);
    await request.post(`${BASE_API}/auth/token`, params);
    window.localStorage.removeItem("code_verifier");
    
  } catch (err) {
    // TODO: Handle token error
    console.error("Error fetching token:", err);
  }
};

export const logout = async () => {
  try {
    await request.post(`${BASE_API}/auth/logout`);
    localStorage.clear();
    console.log("Logged out successfully");
    window.location.href = redirectUri;
  } catch (err) {
    // TODO: Handle logout error
    console.log("Error logging out:", err);
  }
};
