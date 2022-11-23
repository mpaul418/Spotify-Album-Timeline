import React, { useState, useEffect } from 'react';
import { SpotifyApiContext, UserAlbums } from 'react-spotify-api';
import { SpotifyAuth, Scopes } from 'react-spotify-auth';
import { Timeline } from '../Timeline';
import { LogoutButton } from './styles';
import Cookies from 'js-cookie';
import 'react-spotify-auth/dist/index.css';

export const App = () => {
  // TODO add env detection to determine redirect url (ex. if env === 'dev', localhost, otherwise, server location)
  const [spotifyAuthToken, setSpotifyAuthToken] = useState();

  useEffect(() => {
    setSpotifyAuthToken(Cookies.get('spotifyAuthToken'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Cookies.get('spotifyAuthToken')]);

  return spotifyAuthToken ? (
    <SpotifyApiContext.Provider value={spotifyAuthToken}>
      <LogoutButton
        onClick={() => {
          Cookies.remove('spotifyAuthToken');
          window.location = '/';
        }}
      >
        Logout
      </LogoutButton>
      <UserAlbums options={{ limit: 50 }}>{userAlbumProps => <Timeline {...userAlbumProps} />}</UserAlbums>
    </SpotifyApiContext.Provider>
  ) : (
    // Display the login page
    // TODO add more content to this page
    <SpotifyAuth
      redirectUri='http://localhost:3000/' // TODO fix this url to not be localhost once deploying
      clientID='454b032f839c4ce7adccd951bcd5163f'
      scopes={[Scopes.userLibraryRead]}
    />
  );
};
