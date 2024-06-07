import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Stack from 'react-bootstrap/Stack';
import { useSelector } from 'react-redux';

const NewComment = ({ commentData, handleChange }) => {
  const { error: commentFailed } = useSelector((state) => state.comments);

  return (
    <>
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
      <Stack
        direction="horizontal"
        className="mt-2"
        gap={3}
      >
        <Button
          type="submit"
          variant="success"
        >
          Comment
        </Button>
        {commentFailed && (
          <Alert variant="danger" className="p-2 m-0">
            {commentFailed}
          </Alert>
        )}
      </Stack>
    </>
  );
};

NewComment.propTypes = {
  commentData: PropTypes.objectOf(String).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default NewComment;
