import { TimelineContainer, Day, BulletPoint, Album, AlbumHoverInfo, AlbumCover } from './styles';

export const Timeline = () => {
  // TODO remove this once hooked up to spotify
  const sampleData = require('../sample_saved_albums.json');
  const sampleItems = sampleData.items;

  const addDateAt = index => new Date(sampleItems.at(index).added_at);

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

  const renderTimeline = () => {
    const earliestAddDate = addDateAt(-1);
    const latestAddDate = addDateAt(0);

    const timelineDays = [];
    let currentAlbumIndex = sampleItems.length - 1;

    // TODO may want to start at index 0 instead of from the end
    // TODO additionally, may want to do infinite scrolling, getting like 50 albums at a time or something
    for (
      let currentDate = earliestAddDate;
      compareDates(currentDate, latestAddDate) <= 0;
      currentDate.setDate(currentDate.getDate() + 1)
    ) {
      // TODO print marker at start of each month
      const albumsOnDay = [];

      // TODO can this be moved to its own function?
      while (currentAlbumIndex >= 0 && compareDates(addDateAt(currentAlbumIndex), currentDate) === 0) {
        // TODO need to do null checking on fields that may/may not exist??
        const { id, external_urls, images, name, artists, release_date } = sampleItems[currentAlbumIndex].album;

        const releaseDate = new Date(release_date);
        releaseDate.setMinutes(releaseDate.getMinutes() + releaseDate.getTimezoneOffset());

        albumsOnDay.push(
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
              {/* TODO styling on the different info sections */}
              <span>{name}</span>
              <span>{artists[0].name /* TODO need to parse through all the artists */}</span>
              <span>Release Date: {releaseDate.toLocaleDateString()}</span>
              <span>Added on: {addDateAt(currentAlbumIndex).toLocaleDateString()}</span>
            </AlbumHoverInfo>
          </Album>
        );

        currentAlbumIndex--;
      }

      timelineDays.push(
        <Day key={currentDate.getTime()}>
          {albumsOnDay.length > 0 && <BulletPoint />}
          {albumsOnDay}
        </Day>
      );
    }

    return timelineDays;
  };

  return <TimelineContainer>{renderTimeline()}</TimelineContainer>;
};
