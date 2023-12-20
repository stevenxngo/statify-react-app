import axios from 'axios';

const request = axios.create({
	withCredentials: true,
});
const BASE_API = process.env.REACT_APP_API_BASE;

export const getTop = async (type, timeRange) => {
  console.log("getTop: ", type, timeRange);
  const queryURL = `${BASE_API}/top/${type}/${timeRange}`;
  console.log("getTop queryURL: ", queryURL);
  const response = await request.get(queryURL);
  console.log("getTop response: ", response.data);
  return response.data;
}