import { styled } from '@stitches/react';

export const TimelineContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '50px',
});

export const NewMonth = styled('b', {
  borderLeft: '3px solid black',
  borderTop: '2px solid black',
  marginLeft: 10,
  padding: '5px 15px',
  width: 'fit-content',
  fontSize: 18,
  fontFamily: 'Gotham, Arial, Helvetica, sans-serif',
});

export const Day = styled('div', {
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  padding: '5px 0',
  minHeight: 10, // actual min height is 20px, top/bottom padding adds 5px each
  borderLeft: '3px solid black',
  marginLeft: 10,
});

export const BulletPoint = styled('div', {
  height: 15,
  width: 15,
  backgroundColor: 'black',
  borderRadius: '50%',
  position: 'relative',
  left: -9, // 0 - 1/2 of <Day> left border - 1/2 of <BulletPoint> width
  marginRight: -15,
});

export const Album = styled('div', {
  position: 'relative',

  '&:hover > div': {
    visibility: 'visible',
    opacity: 1,
  },
});

export const AlbumHoverInfo = styled('div', {
  visibility: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  border: '1px solid black',
  borderRadius: '8px',
  backgroundColor: 'white',
  padding: 6,
  marginLeft: 6,
  width: 250,
  minHeight: 100,
  position: 'absolute',
  zIndex: 1,
  opacity: 0,
  transition: 'opacity .3s ease',
  fontFamily: 'Gotham Light, Arial, Helvetica, sans-serif',
});

export const AlbumCover = styled('img', {
  width: 100,
  height: 100,
  paddingLeft: 15,
});
