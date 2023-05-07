import { IReview } from '../../types/review';
import { reviewDate } from '../../utils/utils';

interface ReviewCardProps {
  review: IReview;
}

const ReviewCard = ({review}: ReviewCardProps):JSX.Element => {
  const {comment, date, rating, user } = review;

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>

        <footer className="review__details">
          <cite className="review__author">{user.name}</cite>
          <time className="review__date" dateTime="2016-12-24">{reviewDate(date)}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{rating}</div>
    </div>
  );
};

export default ReviewCard;
