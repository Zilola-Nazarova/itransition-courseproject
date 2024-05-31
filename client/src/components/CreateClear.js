import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
// import Col from 'react-bootstrap/Col';

const CreateClear = ({ clear }) => (
  <>
    <Button
      type="submit"
      // onClick={() => edit()}
      variant="warning"
    >
      Create
    </Button>
    {/* <br /> */}
    <Button
      onClick={() => clear()}
      variant="danger"
    >
      Clear
    </Button>
  </>
);

CreateClear.propTypes = {
  clear: PropTypes.func.isRequired,
  // del: PropTypes.func.isRequired,
};

export default CreateClear;
