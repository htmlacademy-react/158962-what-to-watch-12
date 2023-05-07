import {IReview} from '../../types/review';
import ReviewCard from '../review-card/review-card';
import { isEven } from '../../utils/utils';

interface MoviePageTabReviewsProps {
  reviews: IReview[];
}

const MoviePageTabReviews = ({reviews}: MoviePageTabReviewsProps):JSX.Element => {
  const oddReviews: IReview[] = [];
  const evenReviews: IReview[] = [];

  reviews.forEach((review, i) => isEven(i + 1) ? evenReviews.push(review) : oddReviews.push(review));

  return (
    <div className="film-card__reviews film-card__row">

      <div className="film-card__reviews-col">
        {
          oddReviews.map((review) => <ReviewCard key={review.id} review={review} />)
        }
      </div>

      <div className="film-card__reviews-col">
        {
          evenReviews.map((review) => <ReviewCard key={review.id} review={review} />)
        }
      </div>
    </div>
  );
};

export default MoviePageTabReviews;
