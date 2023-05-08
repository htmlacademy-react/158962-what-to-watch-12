interface ShoMoreButtonProps {
  onButtonShowMoreClick: () => void;
}

const ShowMoreButton = ({onButtonShowMoreClick}: ShoMoreButtonProps):JSX.Element => (
  <div className="catalog__more">
    <button className="catalog__button"
      onClick={onButtonShowMoreClick}
      type="button"
    >Show more
    </button>
  </div>
);

export default ShowMoreButton;
