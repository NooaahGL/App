import Track from './spotifyApi/Track.js';

const CLIENT_ID = "e7d0c5cdbc7945fe9513e04c03febf0e";
const CLIENT_SECRET = "21c872f8c6a7466b8309e76145f3d30c";

export const fetchAccessToken = async () => {
    console.log("Fetching access token...");
    const authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
    };

    try {
      const response = await fetch('https://accounts.spotify.com/api/token', authParameters);
      const data = await response.json();
      Track.setAccessToken(data.access_token);
      console.log('Access token set in Track class');
      //setAToken(data.access_token);
    } catch (error) {
      console.error('Error fetching access token:', error);
    }

    console.log("Access token fetch initiated.");
}