import { styled } from '@stitches/react';

export const Timeline = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
})

export const Day = styled('div', {
    display: 'flex',
    alignItems: 'center',
    height: 25,
    borderLeft: '3px solid black',
    marginLeft: 10,

    variants: {
        hasAlbums: {
            true: {
                height: 110,
            }
        }
    }
})

export const BulletPoint = styled('div', {
    height: 15,
    width: 15,
    backgroundColor: 'black',
    borderRadius: '50%',
    position: 'relative',
    // top: 42.5, // 1/2 of <Day> height, - 1/2 of <BulletPoint> height
    left: -9, // 0 - 1/2 of <Day> left border - 1/2 of <BulletPoint> width
})

export const AlbumCover = styled('img', {
    width: 100,
    height: 100,
    paddingLeft: 12,
})

