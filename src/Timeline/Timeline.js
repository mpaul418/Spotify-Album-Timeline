import React from 'react';
import {
  TimelineContainer,
  NewMonth,
  Day,
  BulletPoint,
  Album,
  AlbumHoverInfo,
  AlbumCover,
  ListenOnSpotifyButton,
  SpotifyLogo,
} from './styles';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import spotifyLogo from '../images/Spotify_Logo_RGB_Black.png';

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
    return <p>Loading...</p>;
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
          <AlbumCover
            src={
              images[1].url // Spotify's 300x300px image of the album; images[0] is 640x640 and images[2] is 64x64
            }
            title={name}
          />
          <AlbumHoverInfo>
            <b>{name}</b>
            <span>{artists.map(artist => artist.name).join(', ')}</span>
            <span style={{ marginTop: 15 }}>Release Date: {releaseDate.toLocaleDateString()}</span>
            <span>Added on: {addedDateAt(currentAlbumIndex).toLocaleDateString()}</span>
            <a href={external_urls.spotify} target='_blank' rel='noreferrer' style={{ textDecoration: 'none' }}>
              <ListenOnSpotifyButton>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 496 512'
                  style={{ fill: '#fff', padding: '0.25rem 0.5rem', height: '1.5rem', width: '2em' }}
                >
                  <path d='M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z' />
                </svg>
                <span>Listen on Spotify</span>
              </ListenOnSpotifyButton>
            </a>
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
      <SpotifyLogo src={spotifyLogo} alt='' />
      {timelineDays}
      {error && <p>There was an error D:</p>}
      {!error && (loading || next) && <p ref={sentryRef}>Loading...</p>}
    </TimelineContainer>
  );
};
