import axios from 'axios';
import { Request, Response } from 'express'; // Import Request and Response types from express

export default async function exchangeAccessToken(req: Request, res: Response) {
  if (req.method!== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const { code } = req.body;
  if (!code) {
    return res.status(400).send('Authorization code is required');
  }

  const payload = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code,
    grant_type: 'authorization_code',
    redirect_uri: process.env.REDIRECT_URI,
  };

  const url = 'https://anilist.co/api/v2/oauth/token';

  try {
    const response = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'identity',
      },
    });

    if (response.data.access_token) {
      res.json({ accessToken: response.data.access_token });
    } else {
      throw new Error('Access token not found in the response');
    }
  } catch (error) {
    // Handling errors
    let errorMessage = 'Failed to exchange token';
    let errorDetails = 'An unknown error occurred';

    if (error instanceof Error) {
      errorMessage = error.message;
      if (axios.isAxiosError(error) && error.response) {
        errorDetails = error.response.data;
      }
    }

    res.status(500).json({
      error: errorMessage,
      details: errorDetails,
    });
  }
}
