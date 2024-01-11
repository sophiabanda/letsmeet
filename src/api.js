import nProgress from "nprogress";
import mockData from "./mock-data";

/**
 *
 * @param {*} events:
 * The following function should be in the “api.js” file.
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 */
export const getAccessToken = async () => {
  const accessToken = localStorage.getItem("access_token");
  const tokenCheck = accessToken && (await checkToken(accessToken));
  //retrieves accessToken if it exists, and then calls the checkToken func async to verify the token

  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get("code");
    //searches url for a 'code' parameter (likely indicating a callback from the OAuth provider)
    if (!code) {
      const response = await fetch(
        "https://fr0w8sk6bg.execute-api.us-east-1.amazonaws.com/dev/api/get-auth-url"
      );
      //if there is no code found, makes fetch req to get the auth url
      const result = await response.json(); //parse response body as json
      const { authUrl } = result;
      //destructuring result to extract the property authUrl. Same as: const authUrl = result.authUrl
      return (window.location.href = authUrl); //redirects the browser to the authUrl
    }
    return code && getToken(code);
  }
  return accessToken;
};

const checkToken = async (accessToken) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  );
  const result = await response.json();
  return result;
};
/**
 *
 * This function will fetch the list of all events
 */
export const getEvents = async () => {
  if (window.location.href.startsWith("http://localhost")) {
    return mockData;
  }
  if (!navigator.onLine) {
    const events = localStorage.getItem("lastEvents");
    nProgress.done();
    return events ? JSON.parse(events) : [];
  }
  const token = await getAccessToken();

  if (token) {
    removeQuery();
    const url =
      "https://fr0w8sk6bg.execute-api.us-east-1.amazonaws.com/dev/api/get-events" +
      "/" +
      token;
    const response = await fetch(url);
    const result = await response.json();
    if (result) {
      nProgress.done();
      localStorage.setItem("lastEvents", JSON.stringify(result.events));
      return result.events;
    } else return null;
  }
};

const removeQuery = () => {
  let newUrl;
  if (window.history.pushState && window.location.pathname) {
    newUrl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    window.history.pushState("", "", newUrl);
  } else {
    newUrl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newUrl);
  }
};

const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  const response = await fetch(
    "https://fr0w8sk6bg.execute-api.us-east-1.amazonaws.com/dev/api/token" +
      "/" +
      encodeCode
  );
  const { access_token } = await response.json();
  access_token && localStorage.setItem("access_token", access_token);
  return access_token;
};

export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};
