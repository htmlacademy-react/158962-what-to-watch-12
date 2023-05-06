import React, {useState, ChangeEvent} from 'react';
import { RATING_STARS } from '../../const';

const ReviewForm = ():JSX.Element => {
  const [rating, setRating] = useState('0');
  const [comment, setComment] = useState('');

  return (
    <form action="#" className="add-review__form">
      <div className="rating">
        <div className="rating__stars">
          {
            RATING_STARS.map((id) => (
              <React.Fragment key={id}>
                <input className="rating__input"
                  id={`star-${id}`}
                  type="radio"
                  name="rating"
                  checked={id === Number(rating)}
                  onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                    setRating(evt.target.value);
                  } }
                  value={id}
                />
                <label className="rating__label"
                  htmlFor={`star-${id}`}
                >Rating {id}
                </label>
              </React.Fragment>)
            )
          }
        </div>
      </div>

      <div className="add-review__text">
        <textarea className="add-review__textarea"
          name="review-text"
          id="review-text"
          value={comment}
          onChange={(evt: ChangeEvent<HTMLTextAreaElement>) => setComment(evt.target.value)}
          placeholder="Review text"
        >
        </textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit">Post</button>
        </div>

      </div>
    </form>
  );
};

export default ReviewForm;
