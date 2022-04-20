import { styled } from '@stitches/react';

function App() {
  // TODO remove this once hooked up to spotify
  const sampleData = require('./sample_saved_albums.json');

  const Timeline = styled('div', {
    display: 'flex',
    justifyContent: 'center',
  })

  const AlbumList = styled('div', {
    display: 'flex',
    flexDirection: 'column',
  })

  const Album = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    border: '1px solid black',
    padding: '10px',
    margin: '10px 0',
  })

  const AlbumInfo = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingTop: 16,
  })

  const AlbumCover = styled('img', {
    width: 150,
    height: 150,
    paddingRight: 24,
  })

  // TODO need to do lots of null checking on fields that may/may not exist??
  // TODO add more styling/etc
  const renderItems = () => {
    return sampleData.items.map(item => {
      const { added_at, album } = item;
      const addedDate = added_at.split('T')[0];
      return (<Album key={album.id}>
        <a href={album.external_urls.spotify} target="_blank" rel="noreferrer">
          <AlbumCover src={album.images[1].url /* TODO need to have this parse the correctly sized image */} />
        </a>
        <AlbumInfo>
          <span>{album.name}</span>
          <span>{album.artists[0].name /* TODO need to parse through all the artists */}</span>
          <span>Released on: {album.release_date}</span>
          <span>Added on: {addedDate}</span>
        </AlbumInfo>

      </Album>)
    })
  }

  return (
    <Timeline>
      <AlbumList>
        {renderItems()}
      </AlbumList>
    </Timeline>
  );
}

export default App;
