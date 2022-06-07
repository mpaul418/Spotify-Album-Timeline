import React, { useState, useEffect } from 'react';
import { SpotifyApiContext, UserAlbums } from 'react-spotify-api';
import { SpotifyAuth, Scopes } from 'react-spotify-auth';
import { Timeline } from '../Timeline';
import 'react-spotify-auth/dist/index.css';
import Cookies from 'js-cookie';

export const App = () => {
  const [spotifyAuthToken, setSpotifyAuthToken] = useState();

  useEffect(() => {
    setSpotifyAuthToken(Cookies.get('spotifyAuthToken'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Cookies.get('spotifyAuthToken')]);

  return spotifyAuthToken ? (
    <SpotifyApiContext.Provider value={spotifyAuthToken}>
      {/* TODO style logout button */}
      <button
        onClick={() => {
          Cookies.remove('spotifyAuthToken');
          window.location = '/';
        }}
      >
        Logout
      </button>
      <UserAlbums options={{ limit: 50 }}>{userAlbumProps => <Timeline {...userAlbumProps} />}</UserAlbums>
    </SpotifyApiContext.Provider>
  ) : (
    // Display the login page
    <SpotifyAuth
      redirectUri='http://localhost:3000/callback'
      clientID='454b032f839c4ce7adccd951bcd5163f'
      scopes={[Scopes.userLibraryRead]}
    />
  );
};
