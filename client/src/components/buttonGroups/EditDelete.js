import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { FaTrash } from 'react-icons/fa';

const EditDelete = ({ edit, del }) => (
  <Card.Footer className="edit-delete d-flex justify-content-center gap-3">
    <Button
      onClick={edit}
      variant="secondary"
    >
      Edit
    </Button>
    <Button
      className="d-flex justify-content-center align-items-center"
      onClick={del}
      variant="danger"
    >
      <FaTrash size={14} />
    </Button>
  </Card.Footer>
);

EditDelete.propTypes = {
  edit: PropTypes.func.isRequired,
  del: PropTypes.func.isRequired,
};

export default EditDelete;
