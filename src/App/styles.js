import { styled } from '@stitches/react';

export const LogoutButton = styled('button', {
  padding: 5,
  margin: 10,
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
