import { styled } from '@stitches/react';

function App() {
  // TODO remove this once hooked up to spotify
  const sampleData = require('./sample_saved_albums.json');

  const Timeline = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  })

  const Album = styled('div', {
    // width: 600,
    // height: 600,
    // TODO 
  })

  const AlbumCover = styled('img', {
    width: 150,
    height: 150,
    // TODO 
  })

  // TODO need to do lots of null checking on fields that may/may not exist??
  // TODO add more styling/etc
  const renderItems = () => {
    return sampleData.items.map(item => {
      const { added_at: addedDate, album } = item;
      return (<Album key={album.id}>
        <p>{album.name}</p>
        <p>{album.artists[0].name /* TODO need to parse through all the artists */}</p>
        <p>Released on: {album.release_date}</p>
        <p>Added on: {addedDate}</p>
        <a href={album.external_urls.spotify} target="_blank" rel="noreferrer">
          <AlbumCover src={album.images[1].url /* TODO need to have this parse the correct image */} />
        </a>
      </Album>)
    })
  }

  return (
    <Timeline>
      {renderItems()}
    </Timeline >
  );
}

export default App;
