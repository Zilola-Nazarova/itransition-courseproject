import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';
import { GoHeart, GoHeartFill } from 'react-icons/go';
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
            ? <GoHeartFill color="red" onClick={handleLike} />
            : <GoHeart color="white" onClick={handleLike} />}
          <span>{value?.length}</span>
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
