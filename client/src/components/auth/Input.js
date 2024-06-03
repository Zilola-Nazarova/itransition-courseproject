import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';

const AuthForm = ({
  handleSubmit, disabled, isSignup, handleChange, googleLogin, showPassword, handleShowPassword,
}) => (
  <Form onSubmit={handleSubmit} className="text-start w-75 m-auto d-grid gap-3">
    {isSignup && (
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
          required
          name="username"
          type="text"
          placeholder="Enter name"
          onInput={handleChange}
        />
      </Form.Group>
    )}
    <Form.Group controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control
        required
        name="email"
        type="email"
        placeholder="Enter email"
        onInput={handleChange}
      />
    </Form.Group>
    <Form.Group controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <InputGroup>
        <Form.Control
          required
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter password"
          onInput={handleChange}
        />
        <Button
          variant="outline-secondary"
          type="button"
          onClick={handleShowPassword}
        >
          {showPassword ? 'Hide Password' : 'Show Password'}
        </Button>
      </InputGroup>
    </Form.Group>
    {isSignup && (
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Confirm Password</Form.Label>
        <InputGroup>
          <Form.Control
            required
            name="confirmedPassword"
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm your password"
            onInput={handleChange}
          />
          <Button
            variant="outline-secondary"
            type="button"
            onClick={handleShowPassword}
          >
            {showPassword ? 'Hide Password' : 'Show Password'}
          </Button>
        </InputGroup>
      </Form.Group>
    )}
    <Container className="mt-3 p-0 d-grid gap-3">
      <Button
        type="submit"
        variant="success"
        disabled={disabled}
      >
        {isSignup ? 'Sign Up' : 'Sign In'}
      </Button>
      <Button
        type="button"
        variant="outline-success"
        onClick={() => googleLogin()}
      >
        Sign in with Google 🚀
      </Button>
    </Container>
  </Form>
);

AuthForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  isSignup: PropTypes.bool.isRequired,
  googleLogin: PropTypes.func.isRequired,
  showPassword: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleShowPassword: PropTypes.func.isRequired,
};

export default AuthForm;
