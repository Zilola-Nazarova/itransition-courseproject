import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { createOdooToken } from '../../redux/odoo/odooSlice';

const Odoo = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { value, isLoading, error } = useSelector((state) => state.odoo);
  const handleClick = () => {
    dispatch(createOdooToken());
  };

  return (
    <Container
      fluid
      data-bs-theme="dark"
      classname="odoo bg-light"
    >
      {user && (
        <Button
          variant="outline-success"
          onClick={handleClick}
        >
          Create Odoo Token
        </Button>
      )}
      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}
      {isLoading && (
        <Spinner className="m-auto d-block mb-2" animation="border" role="status" variant="success">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {value && (
        <Alert
          variant="success p-2 text-center"
        >
          Token created!
          {' '}
          {value}
        </Alert>
      )}
    </Container>
  );
};

export default Odoo;
