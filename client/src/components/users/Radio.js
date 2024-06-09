import Form from 'react-bootstrap/Form';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const Radio = ({
  legend, options, current = null, handleChange,
}) => (
  <fieldset>
    <legend>{legend}</legend>
    {options.map((opt) => (
      <Form.Check
        key={uuidv4()}
        required
        type="radio"
        label={`${opt}`}
        checked={current === opt}
        value={opt}
        onChange={(e) => handleChange(e, opt)}
      />
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
  handleChange: PropTypes.func.isRequired,
};

export default Radio;
