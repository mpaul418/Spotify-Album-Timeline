import { TimelineContainer, Day, BulletPoint, AlbumCover } from './styles';

export const Timeline = () => {
  // TODO remove this once hooked up to spotify
  const sampleData = require('../sample_saved_albums.json');
  const sampleItems = sampleData.items;

  const dateAtIndex = index => new Date(sampleItems.at(index).added_at.split('T')[0]);

  const renderTimeline = () => {
    const earliestAddDate = dateAtIndex(-1);
    const latestAddDate = dateAtIndex(0);

    const timelineDays = [];
    let currentAlbumIndex = sampleItems.length - 1;

    // TODO may want to start at index 0 instead of from the end
    for (
      let currentDate = earliestAddDate;
      currentDate.getTime() <= latestAddDate.getTime();
      currentDate.setDate(currentDate.getDate() + 1)
    ) {
      // TODO need bullet point on it if album exists on that date
      const albumsOnDay = [];
      while (currentAlbumIndex >= 0 && dateAtIndex(currentAlbumIndex) <= currentDate) {
        // TODO need to do null checking on fields that may/may not exist??
        const { id, external_urls, images, name } = sampleItems[currentAlbumIndex].album;
        albumsOnDay.push(
          <a href={external_urls.spotify} target='_blank' rel='noreferrer' key={id} style={{ height: 100 }}>
            <AlbumCover
              src={
                images[1].url
                /* TODO need to have this parse the correctly sized image */
              }
              title={name}
            />
            {/* TODO remove title from image once hover stuff is working? */}
          </a>
        );
        //  <AlbumInfo>
        //    <span>{album.name}</span>
        //    <span>{album.artists[0].name /* TODO need to parse through all the artists */}</span>
        //    <span>Released on: {album.release_date}</span>
        //    <span>Added on: {addedDate}</span>
        //  </AlbumInfo>

        currentAlbumIndex--;
      }

      const hasAlbums = albumsOnDay.length > 0;

      timelineDays.push(
        <Day key={currentDate.getTime()} hasAlbums={hasAlbums}>
          {hasAlbums && <BulletPoint />}
          {albumsOnDay}
        </Day>
      );
    }

    return timelineDays;
  };

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

  return <TimelineContainer>{renderTimeline()}</TimelineContainer>;
};
