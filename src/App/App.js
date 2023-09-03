import React, { useState, useEffect } from 'react';
import { SpotifyApiContext, UserAlbums } from 'react-spotify-api';
import { SpotifyAuth, Scopes } from 'react-spotify-auth';
import { Timeline } from '../Timeline';
import { HomePageContent, HomePageText, Footer, FooterImage, FooterButton, LogoutButton } from './styles';
import Cookies from 'js-cookie';
import 'react-spotify-auth/dist/index.css';
import githubLogo from '../images/github-mark-white.png';

export const App = () => {
  const [spotifyAuthToken, setSpotifyAuthToken] = useState();

  useEffect(() => {
    setSpotifyAuthToken(Cookies.get('spotifyAuthToken'));
    // Quick and dirty fix for access_token showing in URL - doesn't actually get rid of it, but redirects when it happens
    if (window.location.href.indexOf('access_token') > -1) {
      window.location = '/';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Cookies.get('spotifyAuthToken')]);

  const TimelineDisplay = () => (
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
  );

  const HomePage = () => (
    <div>
      <HomePageContent>
        <HomePageText>
          <p>
            <b>Album Timeline for Spotify</b>
          </p>
          <p style={{ marginTop: 0 }}>
            Login to see a timeline of all the albums you have saved to Spotify, including both the album's release date
            and the date that you added it.
          </p>
        </HomePageText>
        <SpotifyAuth
          redirectUri={window.location.href}
          clientID='454b032f839c4ce7adccd951bcd5163f'
          scopes={[Scopes.userLibraryRead]}
        />
      </HomePageContent>
      <Footer>
        <FooterButton
          href='https://github.com/mpaul418/Spotify-Album-Timeline'
          target='_blank'
          rel='noopener noreferrer' /*onClick={() => window.open('https://github.com/mpaul418/Spotify-Album-Timeline', '_blank')}*/
        >
          <FooterImage src={githubLogo} alt='' />
          GitHub
        </FooterButton>
      </Footer>
    </div>
  );

  return spotifyAuthToken ? <TimelineDisplay /> : <HomePage />;
};
