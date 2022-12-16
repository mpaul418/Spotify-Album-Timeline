import { styled } from '@stitches/react';

export const HomePageContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
});

export const HomePageText = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'Gotham, Arial, Helvetica, sans-serif',
  maxWidth: 350,
  minWidth: 130,
});

export const LogoutButton = styled('button', {
  padding: 5,
  margin: 10,
  marginLeft: 75,
  maxWidth: 150,
  width: '100%',
  border: '2px solid black',
  backgroundColor: '#20ca5c',
  fontSize: 18,
  fontFamily: 'Gotham, Arial, Helvetica, sans-serif',
  fontWeight: 550,
  borderRadius: 25,

  '&:hover': {
    backgroundColor: '#1DB954',
    cursor: 'pointer',
  },
});
