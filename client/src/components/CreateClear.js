import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

const CreateClear = ({ clear }) => (
  <Row className="g-3">
    <Form.Group as={Col} xs={12} sm={6} className="d-grid gap-2">
      <Button
        type="submit"
        variant="outline-success"
      >
        Create
      </Button>
    </Form.Group>
    <Form.Group as={Col} xs={12} sm={6} className="d-grid gap-2">
      <Button
        onClick={() => clear()}
        variant="outline-danger"
      >
        Clear
      </Button>
    </Form.Group>
  </Row>
);

CreateClear.propTypes = {
  clear: PropTypes.func.isRequired,
};

export default CreateClear;
