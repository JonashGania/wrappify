import axios from "axios";

export const fetchAcessToken = async (code: string, codeVerifier: string) => {
  const clientId = `${import.meta.env.VITE_CLIENT_ID}`;
  const redirectUri =
    import.meta.env.MODE === "development"
      ? `${import.meta.env.VITE_REDIRECT_URI_DEV}`
      : `${import.meta.env.VITE_REDIRECT_URI_PROD}`;

  const tokenUrl = `${import.meta.env.VITE_TOKEN_URL}`;

  try {
    const response = await axios.post(
      tokenUrl,
      new URLSearchParams({
        client_id: clientId,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, refresh_token, expires_in } = response.data;
    const expiration_time = Date.now() + expires_in * 1000;

    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    localStorage.setItem("token_expiration", expiration_time.toString());

    return response.data;
  } catch (error) {
    console.error("Error fetching access token:", error);
  }
};

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  const clientId = `${import.meta.env.VITE_CLIENT_ID}`;
  const tokenUrl = `${import.meta.env.VITE_TOKEN_URL}`;

  if (!refreshToken) {
    console.error("No refresh token available");
    return;
  }

  try {
    const response = await axios.post(tokenUrl, null, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: clientId,
      }).toString(),
    });

    const { access_token, expires_in } = response.data;
    const expiration_time = Date.now() + expires_in * 1000;

    localStorage.setItem("access_token", access_token);
    localStorage.setItem("token_expiration", expiration_time.toString());

    return response.data;
  } catch (error) {
    console.error("Error fetching access token:", error);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("token_expiration");
  }
};

export const getUserProfile = async (accessToken: string) => {
  try {
    const response = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching user profile", error);
  }
};

export const getUserTopTracks = async (
  timeRange: string,
  limit: number,
  accessToken: string
) => {
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching user top tracks", error);
  }
};

export const getUserTopArtists = async (
  timeRange: string,
  limit: number,
  accessToken: string
) => {
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.items;
  } catch (error) {
    console.error("Error fetching user top artists", error);
  }
};

export const getUserPlaylists = async (accessToken: string) => {
  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/playlists",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.items;
  } catch (error) {
    console.error("Error fetching user playlists", error);
  }
};

export const getPlaylistMetadata = async (
  playlistId: string,
  accessToken: string
) => {
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching playlist songs", error);
  }
};

export const getUserPlaylistSongs = async (
  offset: number,
  limit: number,
  playlistId: string,
  accessToken: string
) => {
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=${limit}&offset=${offset}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching playlist songs", error);
  }
};
