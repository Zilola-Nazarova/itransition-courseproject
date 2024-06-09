import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';

const Likes = ({ currentLike, handleLike }) => {
  const { value, isLoading } = useSelector((state) => state.likes);

  return (
    <>
      {isLoading && (
        <Spinner size="sm" animation="border" role="status" variant="success">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {!isLoading && (
        <>
          {currentLike
            ? <BsHeartFill color="red" onClick={handleLike} />
            : <BsHeart color="white" onClick={handleLike} />}
          <span className="text-light ms-2 like-count">
            {value?.length}
          </span>
        </>
      )}
    </>
  );
};

Likes.propTypes = {
  currentLike: PropTypes.objectOf(String).isRequired,
  handleLike: PropTypes.func.isRequired,
};

export default Likes;
