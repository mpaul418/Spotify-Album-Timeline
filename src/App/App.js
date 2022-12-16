import React, { useState, useEffect } from 'react';
import { SpotifyApiContext, UserAlbums } from 'react-spotify-api';
import { SpotifyAuth, Scopes } from 'react-spotify-auth';
import { Timeline } from '../Timeline';
import { HomePageContent, HomePageText, LogoutButton } from './styles';
import Cookies from 'js-cookie';
import 'react-spotify-auth/dist/index.css';

export const App = () => {
  const [spotifyAuthToken, setSpotifyAuthToken] = useState();

  useEffect(() => {
    setSpotifyAuthToken(Cookies.get('spotifyAuthToken'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Cookies.get('spotifyAuthToken')]);

  // TODO abstract this ternary to resolve to 2 distinct components (ex. TimelineDisplay and HomePage respectively)
  // TODO then, once that is done, can move the styling shared between logout button and timeline to their parent component (ex. padding/margin)
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
    <HomePageContent>
      <HomePageText>
        <p>
          <b>Spotify Album Timeline</b>
        </p>
        <p style={{ marginTop: 0 }}>
          Login to see a timeline of all the albums you have saved to Spotify, including both the album's release date
          and the date that you added it.
        </p>
      </HomePageText>
      <SpotifyAuth
        // TODO figure out how to not have access token in URL
        redirectUri={process.env.REDIRECT_URI}
        clientID='454b032f839c4ce7adccd951bcd5163f'
        scopes={[Scopes.userLibraryRead]}
      />
    </HomePageContent>
  );
};
