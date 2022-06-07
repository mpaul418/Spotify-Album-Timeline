import React from 'react';
import { TimelineContainer, NewMonth, Day, BulletPoint, Album, AlbumHoverInfo, AlbumCover } from './styles';
import useInfiniteScroll from 'react-infinite-scroll-hook';

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

export const Timeline = ({ data, loading, error, loadMoreData }) => {
  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage: data?.next,
    onLoadMore: loadMoreData,
    disabled: !!error,
    rootMargin: '0px 0px 750px 0px',
  });

  if (!data) {
    // TODO improve this
    return <p>Temp - loading...</p>;
  }

  const { items, next } = data;
  const timelineDays = [];
  let currentAlbumIndex = 0;

  const addedDateAt = index => new Date(items.at(index).added_at);

  const latestAddDate = addedDateAt(0);
  const endOfLatestMonth = new Date(latestAddDate.getFullYear(), latestAddDate.getMonth() + 1, 0); // Start at the end of the latest month so that we get the month label

  // Function to get all of the albums added on a given date
  const getAlbumsOnDate = currentDate => {
    const albumsOnDate = [];

    while (currentAlbumIndex < items.length && compareDates(addedDateAt(currentAlbumIndex), currentDate) === 0) {
      const { id, external_urls, images, name, artists, release_date } = items[currentAlbumIndex].album;

      const releaseDate = new Date(release_date);
      releaseDate.setMinutes(releaseDate.getMinutes() + releaseDate.getTimezoneOffset()); // Account for time zone to ensure displayed date doesn't get offset by 1

      albumsOnDate.push(
        <Album key={id}>
          <a href={external_urls.spotify} target='_blank' rel='noreferrer'>
            <AlbumCover
              src={
                images[1].url // Spotify's 300x300px image of the album; images[0] is 640x640 and images[2] is 64x64
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

  // Assemble the timeline one day at a time, adding month dividers in between months
  for (
    let currentDate = endOfLatestMonth;
    currentAlbumIndex < items.length;
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

  return (
    <TimelineContainer>
      {timelineDays}
      {error && <p>There was an error :(</p>} {/* TODO Needs styling */}
      {(loading || next) && <p ref={sentryRef}>Loading...</p>}{' '}
      {/* TODO Infinite loader needs styling and also logic changes: what to do if there is an error? if all data is loaded (no data.next)? */}
    </TimelineContainer>
  );
};
