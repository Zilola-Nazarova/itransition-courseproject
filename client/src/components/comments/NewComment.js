import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const NewComment = ({ submit, commentData, handleChange }) => (
  <Form onSubmit={submit}>
    <Form.Group>
      <Form.Control
        as="textarea"
        rows={3}
        required
        placeholder="Write your comment"
        value={commentData.text}
        onChange={handleChange}
      />
    </Form.Group>
    <Button type="submit">Comment</Button>
  </Form>
);

NewComment.propTypes = {
  submit: PropTypes.func.isRequired,
  commentData: PropTypes.objectOf(String).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default NewComment;
