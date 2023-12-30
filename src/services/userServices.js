import axios from "axios";

const request = axios.create({
  withCredentials: true,
});
const BASE_API = process.env.REACT_APP_API_BASE;

export const isLoggedIn = async () => {
  try {
    const response = await request.get(`${BASE_API}/user`);
    return response.data;
  } catch (err) {
    console.error("Error fetching logged in status:", err);
  }
};

export const saveAccountData = async () => {
  try {
    const queryURL = `${BASE_API}/user/me`;
    await request.post(queryURL);
    // return response.data;
  } catch (err) {
    console.error("Error fetching account data from:", err);
  }
};

export const getTop = async (type, timeRange) => {
  try {
    const queryURL = `${BASE_API}/user/top/${type}/${timeRange}`;
    const response = await request.get(queryURL);
    console.log("Top response: ", response.data);
    return response.data;
  } catch (err) {
    console.error(`Error fetching top ${type} for ${timeRange}:`, err);
  }
};
