import React, {useState, ChangeEvent, FormEvent, useEffect} from 'react';
import {MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH, RATING_STARS} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {postComment, selectCommentsStatus} from '../../store/slices/comments-slice/comments-slice';

interface ReviewFormProps {
  currentId: number;
}

const ReviewForm = ({currentId}: ReviewFormProps):JSX.Element => {
  const [rating, setRating] = useState('0');
  const [comment, setComment] = useState('');

  const dispatch = useAppDispatch();

  const status = useAppSelector(selectCommentsStatus);

  useEffect(() => {
    if (status.isSuccess) {
      setRating('0');
      setComment('');
    }
  }, [status]);

  const isValidTextarea = comment.length >= MIN_COMMENT_LENGTH && comment.length <= MAX_COMMENT_LENGTH;
  const isRatingValid = rating !== '0';
  const validForm = !isValidTextarea || !isRatingValid || status.isLoading;

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(postComment({
      rating: rating,
      comment: comment,
      id: currentId,
    }));
  };

  return (
    <form action="#"
          onSubmit={handleSubmit}
          className="add-review__form">
      <div className="rating">
        <div className="rating__stars">
          {
            RATING_STARS.map((id) => (
              <React.Fragment key={id}>
                <input className="rating__input"
                  id={`star-${id}`}
                  type="radio"
                  name="rating"
                  disabled={status.isLoading}
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
          disabled={status.isLoading}
          onChange={(evt: ChangeEvent<HTMLTextAreaElement>) => setComment(evt.target.value)}
          placeholder="Review text"
        >
        </textarea>
        <div className="add-review__submit">
          <button className="add-review__btn"
                  disabled={validForm}
                  type="submit">Post</button>
        </div>

      </div>
    </form>
  );
};

export default ReviewForm;
