import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const Radio = ({
  legend, options, name, current = null, handleChange,
}) => (
  <fieldset>
    <legend>{legend}</legend>
    {options.map((opt) => (
      <label key={uuidv4()} htmlFor={`${opt}`}>
        <input
          required
          checked={current === opt}
          type="radio"
          name={name}
          value={opt}
          id={`${opt}`}
          onChange={(e) => handleChange(e, opt)}
        />
        {`${opt}`}
      </label>
    ))}
  </fieldset>
);

Radio.propTypes = {
  legend: PropTypes.string.isRequired,
  current: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  options: PropTypes.arrayOf(String).isRequired,
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Radio;
