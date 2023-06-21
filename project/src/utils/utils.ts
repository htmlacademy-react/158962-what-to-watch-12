import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { RATING, TimeInSeconds, HOUR } from '../const';
dayjs.extend(duration);

export const getYear = (date: number): string => dayjs(date).format('YYYY');
export const getReviewDate = (date: string): string => dayjs(date).format('MMMM DD, YYYY');
export const getMovieDuration = (date: number): string => {
  if (date < HOUR) {
    return dayjs.duration(date, 'minutes').format('mm[m]');
  }
  return dayjs.duration(date, 'minutes').format('H[h] mm[m]');
};
export const isEven = (i: number): boolean => i % 2 === 0;


export const getRatingDescription = (rating: number): string => {
  if (rating <= RATING.BAD.max) {
    return RATING.BAD.value;
  } else if (rating <= RATING.NORMAL.max) {
    return RATING.NORMAL.value;
  } else if (rating <= RATING.GOOD.max) {
    return RATING.GOOD.value;
  } else if (rating <= RATING.VERY_GOOD.max) {
    return RATING.VERY_GOOD.value;
  } return RATING.AWESOME.value;
};

export const getVideoDuration = (date: number | null): string | undefined => {
  if (!date) {
    date = 0;
  }

  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  let filmDuration = '';

  switch (true) {
    case (date >= TimeInSeconds.Hour):
      hours = Math.trunc(date / TimeInSeconds.Hour);
      minutes = Math.trunc((date - hours * TimeInSeconds.Hour) / TimeInSeconds.Minute);
      seconds = date - (minutes * TimeInSeconds.Minute) - (hours * TimeInSeconds.Hour);

      filmDuration = dayjs.duration({ seconds, minutes, hours }).format('HH:mm:ss');
      break;
    case (date < TimeInSeconds.Hour):
      minutes = Math.trunc(date / TimeInSeconds.Minute);
      seconds = date - (minutes * TimeInSeconds.Minute) - (hours * TimeInSeconds.Hour);

      filmDuration = dayjs.duration({ seconds, minutes }).format('mm:ss');
      break;
  }

  return filmDuration;
};

