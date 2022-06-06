import { TimelineContainer, NewMonth, Day, BulletPoint, Album, AlbumHoverInfo, AlbumCover } from './styles';

export const Timeline = () => {
  // TODO remove this once hooked up to spotify
  const sampleData = require('../sample_saved_albums.json');
  const sampleItems = sampleData.items;

  const addedDateAt = index => new Date(sampleItems.at(index).added_at);

  // Needed so we can compare month/day/year without checking time as well (so 2 dates on the same day will count as equal)
  const compareDates = (date1, date2) => {
    const [day1, month1, year1] = [date1.getDate(), date1.getMonth(), date1.getFullYear()];
    const [day2, month2, year2] = [date2.getDate(), date2.getMonth(), date2.getFullYear()];

    if (year1 !== year2) {
      return year1 < year2 ? -1 : 1;
    }
    if (month1 !== month2) {
      return month1 < month2 ? -1 : 1;
    }
    if (day1 !== day2) {
      return day1 < day2 ? -1 : 1;
    }

    return 0;
  };

  const isLastDayOfMonth = date => {
    return date.getDate() === new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const renderTimeline = () => {
    const timelineDays = [];
    let currentAlbumIndex = 0;

    const latestAddDate = addedDateAt(0);
    const endOfLatestMonth = new Date(latestAddDate.getFullYear(), latestAddDate.getMonth() + 1, 0); // Start at the end of the latest month so that we get the month label

    const getAlbumsOnDate = currentDate => {
      const albumsOnDate = [];

      while (
        currentAlbumIndex < sampleItems.length &&
        compareDates(addedDateAt(currentAlbumIndex), currentDate) === 0
      ) {
        // TODO need to do null checking on fields that may/may not exist??
        const { id, external_urls, images, name, artists, release_date } = sampleItems[currentAlbumIndex].album;

        const releaseDate = new Date(release_date);
        releaseDate.setMinutes(releaseDate.getMinutes() + releaseDate.getTimezoneOffset()); // Account for time zone to ensure displayed date doesn't get offset by 1

        albumsOnDate.push(
          <Album key={id}>
            <a href={external_urls.spotify} target='_blank' rel='noreferrer'>
              <AlbumCover
                src={
                  images[1].url
                  /* TODO need to have this parse the correctly sized image */
                }
                title={name}
              />
            </a>
            <AlbumHoverInfo>
              <b>{name}</b>
              <span>{artists.map(artist => artist.name).join(', ')}</span>
              <span style={{ marginTop: 15 }}>Release Date: {releaseDate.toLocaleDateString()}</span>
              <span>Added on: {addedDateAt(currentAlbumIndex).toLocaleDateString()}</span>
            </AlbumHoverInfo>
          </Album>
        );

        currentAlbumIndex++;
      }

      return albumsOnDate;
    };

    // TODO may want to do infinite scrolling, getting like 50 albums at a time or something
    for (
      let currentDate = endOfLatestMonth;
      currentAlbumIndex < sampleItems.length; // TODO update this once hooked up to spotify
      currentDate.setDate(currentDate.getDate() - 1)
    ) {
      const albumsOnDate = getAlbumsOnDate(currentDate);

      // Print Month + Year if we are at the end of a month
      if (isLastDayOfMonth(currentDate)) {
        timelineDays.push(
          <NewMonth key={currentDate.toLocaleDateString()}>
            {currentDate.toLocaleString('default', { month: 'long' }) + ' ' + currentDate.getFullYear()}
          </NewMonth>
        );
      }

      // Add the day, whether there are albums or not
      timelineDays.push(
        <Day key={currentDate.getTime()}>
          {albumsOnDate.length > 0 && <BulletPoint />}
          {albumsOnDate}
        </Day>
      );
    }

    return timelineDays;
  };

  return <TimelineContainer>{renderTimeline()}</TimelineContainer>;
};
