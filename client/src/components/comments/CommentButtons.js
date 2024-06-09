import PropTypes from 'prop-types';
import { FaTrash } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';

const CommentButtons = ({
  onEdit, del, edit, cancel, save,
}) => (
  onEdit ? (
    <>
      <Button
        className="ms-auto"
        variant="secondary"
        onClick={cancel}
      >
        Cancel
      </Button>
      <Button
        variant="success"
        onClick={save}
      >
        Save
      </Button>
    </>
  ) : (
    <>
      <Button
        className="ms-auto"
        variant="secondary"
        onClick={edit}
      >
        Edit
      </Button>
      <Button
        variant="danger"
        onClick={del}
      >
        <FaTrash />
      </Button>
    </>
  )
);

CommentButtons.propTypes = {
  onEdit: PropTypes.bool.isRequired,
  del: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
};

export default CommentButtons;
