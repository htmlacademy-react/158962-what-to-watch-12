import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { RATING } from '../const';
dayjs.extend(duration);

export const releasedYear = (date: number): string => dayjs(date).format('YYYY');
export const reviewDate = (date: string): string => dayjs(date).format('MMMM DD, YYYY');
export const movieDuration = (date: number): string => dayjs.duration(date, 'minutes').format('H[h] mm[m]');
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
