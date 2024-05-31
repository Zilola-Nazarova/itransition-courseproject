import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

const EditDelete = ({ edit, del }) => (
  <Col sm={12} md={2}>
    <Button
      onClick={() => edit()}
      variant="warning"
    >
      Edit
    </Button>
    <br />
    <Button
      onClick={() => del()}
      variant="danger"
    >
      Delete
    </Button>
  </Col>
);

EditDelete.propTypes = {
  edit: PropTypes.func.isRequired,
  del: PropTypes.func.isRequired,
};

export default EditDelete;
