import {generatePath, Link} from 'react-router-dom';
import {AppRoute} from '../../const';

interface AddReviewButtonProps {
  id: number;
}

const AddReviewButton = ({id}: AddReviewButtonProps):JSX.Element => (
  <Link to={generatePath(AppRoute.AddReview, { id: `${id}`})} className="btn film-card__button">Add review</Link>
);

export default AddReviewButton;
