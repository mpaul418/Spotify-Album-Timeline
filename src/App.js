import { styled } from '@stitches/react';

function App() {
  // TODO remove this once hooked up to spotify
  const sampleData = require('./sample_saved_albums.json');
  const sampleItems = sampleData.items;

  const Timeline = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  })

  const renderTimeline = () => {
    const earliestAddDate = new Date(sampleItems.at(-1).added_at);
    const latestAddDate = new Date(sampleItems[0].added_at);
    earliestAddDate.setHours(0, 0, 0, 0);
    latestAddDate.setHours(0, 0, 0, 0);

    const timelineDays = [];

    for (let currentDate = earliestAddDate; currentDate.getTime() <= latestAddDate.getTime(); currentDate.setDate(currentDate.getDate() + 1)) {
      // TODO instead of <p>, return ~2-5 px line to represent the day (will need bullet point on it if album exists on that date)
      timelineDays.push(<p key={currentDate.getTime()}>{currentDate.toString()}</p>);
      // TODO need to be looping through the data json at the same time, chekcing if any albums match current date
    }

    return timelineDays;
  }

  // const AlbumList = styled('div', {
  //   display: 'flex',
  //   flexDirection: 'column',
  // })

  // const Album = styled('div', {
  //   display: 'flex',
  //   flexDirection: 'row',
  //   border: '1px solid black',
  //   padding: '10px',
  //   margin: '10px 0',
  // })

  // const AlbumInfo = styled('div', {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'flex-start',
  //   paddingTop: 16,
  // })

  // const AlbumCover = styled('img', {
  //   width: 150,
  //   height: 150,
  //   paddingRight: 24,
  // })

  // // TODO need to do lots of null checking on fields that may/may not exist??
  // // TODO add more styling/etc
  // const renderItems = () => {
  //   return sampleData.items.map(item => {
  //     const { added_at, album } = item;
  //     const addedDate = added_at.split('T')[0];
  //     return (<Album key={album.id}>
  //       <a href={album.external_urls.spotify} target="_blank" rel="noreferrer">
  //         <AlbumCover src={album.images[1].url /* TODO need to have this parse the correctly sized image */} />
  //       </a>
  //       <AlbumInfo>
  //         <span>{album.name}</span>
  //         <span>{album.artists[0].name /* TODO need to parse through all the artists */}</span>
  //         <span>Released on: {album.release_date}</span>
  //         <span>Added on: {addedDate}</span>
  //       </AlbumInfo>

  //     </Album>)
  //   })
  // }

  return (
    <Timeline>
      {renderTimeline()}
      {/* <AlbumList>
        {renderItems()}
      </AlbumList> */}
    </Timeline>
  );
}

export default App;
