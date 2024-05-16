import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  name, type, placeholder, handleChange, handleShowPassword,
}) => (
  <>
    <input
      required
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={handleChange}
    />
    {name === 'password'
      && (
        <button
          id="check"
          type="button"
          onClick={handleShowPassword}
        >
          {type === 'password' ? 'Show Password' : 'Hide Password'}
        </button>
      )}
  </>
);

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleShowPassword: PropTypes.func,
};

Input.defaultProps = {
  handleShowPassword: null,
};

export default Input;
