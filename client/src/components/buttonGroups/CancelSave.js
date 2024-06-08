import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

const CancelSave = ({ cancel, save }) => (
  <Card.Footer className="edit-delete d-flex justify-content-center gap-3">
    <Button
      onClick={cancel}
      variant="secondary"
    >
      Cancel
    </Button>
    <Button
      className="d-flex justify-content-center align-items-center"
      onClick={save}
      variant="success"
    >
      Save
    </Button>
  </Card.Footer>
);

CancelSave.propTypes = {
  cancel: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
};

export default CancelSave;
