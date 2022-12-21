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

export const Footer = styled('div', {
  position: 'fixed',
  display: 'flex',
  justifyContent: 'center',
  bottom: 0,
  width: '100%',
  paddingBottom: 15,
});

export const FooterButton = styled('a', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'Gotham, Arial, Helvetica, sans-serif',
  padding: '0.25rem 0.5rem',
  cursor: 'pointer',
  transitionDuration: '300ms',
  backgroundColor: '#1A1A1A',
  color: '#FFFFFF',
  minHeight: 32,
  border: 'none',
  borderRadius: '0.2rem',
  textDecoration: 'none !important',

  '&:hover': {
    transitionDuration: '500ms',
    transform: 'translate(-1px, 2px)',
    boxShadow: '0 0.25rem 0.75rem 0 #777777',
  },
});

export const FooterImage = styled('img', {
  height: 26,
  width: 26,
  paddingRight: 5,
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
