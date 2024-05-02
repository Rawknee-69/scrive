import axios from 'axios';

// Assuming you have a way to securely store your credentials, e.g., environment variables or a configuration file
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI;

export default async function handler(req, res) {
  // Check if the request method is POST
  if (req.method!== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  // Extract the authorization code from the request body
  const { code } = req.body;
  if (!code) {
    return res.status(400).send('Authorization code is required');
  }

  // Prepare the payload for the token exchange request
  const payload = {
    client_id: clientId,
    client_secret: clientSecret,
    code,
    grant_type: 'authorization_code',
    redirect_uri: redirectUri,
  };

  // URL for the token exchange endpoint
  const url = 'https://anilist.co/api/v2/oauth/token';

  try {
    // Make the POST request to exchange the authorization code for an access token
    const response = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'identity',
      },
    });

    // Check if the response contains an access token
    if (response.data.access_token) {
      res.json({ accessToken: response.data.access_token });
    } else {
      throw new Error('Access token not found in the response');
    }
  } catch (error) {
    // Handle errors, including sending a 500 status code and the error details
    res.status(500).json({
      error: 'Failed to exchange token',
      details: error.response?.data || error.message,
    });
  }
}
