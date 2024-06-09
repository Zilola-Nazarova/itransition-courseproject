import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

const SignUpSwitcher = ({ isSignup, switchSignup }) => (
  <Card.Footer className="p-3 text-muted">
    <Card.Text className="mb-2">
      {isSignup ? 'Already have an account?' : "Don't have an account?"}
    </Card.Text>
    <Card.Link href="#" className="text-success" onClick={switchSignup}>
      {isSignup ? 'Sign In' : 'Sign Up'}
    </Card.Link>
  </Card.Footer>
);

SignUpSwitcher.propTypes = {
  isSignup: PropTypes.bool.isRequired,
  switchSignup: PropTypes.func.isRequired,
};

export default SignUpSwitcher;
