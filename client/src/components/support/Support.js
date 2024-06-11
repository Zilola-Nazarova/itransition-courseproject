import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import CloseButton from 'react-bootstrap/CloseButton';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Collapse from 'react-bootstrap/Collapse';
import { createIssue } from '../../redux/jira/jiraSlice';

const BASE_URL = process.env.REACT_APP_API_ENDPOINT || 'https://itransition-courseproject-tljv.onrender.com';
const domain = process.env.REACT_APP_DOMAIN;
const JIRA_URL = `https://${domain}.atlassian.net`;

const Support = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { collId } = useParams();
  const [open, setOpen] = useState(false);
  const [collectionId, setCollectionId] = useState(null);
  const [jiraLink, setJiraLink] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { newIssueKey, isLoading, error } = useSelector((state) => state.jira);
  const initialState = {
    url: `${BASE_URL}${pathname}`,
    collId: null,
    description: '',
    priority: '',
  };
  const [formData, setFormData] = useState(initialState);
  useEffect(() => {
    setCollectionId(collId);
  }, [collId]);
  useEffect(() => {
    if (newIssueKey) {
      setJiraLink(`${JIRA_URL}/browse/${newIssueKey}`);
    } else {
      setJiraLink(null);
    }
  }, [newIssueKey]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createIssue({ ...formData, collId: collectionId }));
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <>
      {user && (
        <Button
          className="position-fixed bottom-0 end-0 m-3 p-3 btn-help"
          onClick={() => {
            setOpen(!open);
            setFormData({ ...formData, user: user.user });
          }}
          aria-controls="jira-form"
          aria-expanded={open}
        >
          HELP
        </Button>
      )}
      <Collapse in={open}>
        <div
          data-bs-theme="dark"
          id="jira-form"
          className="position-fixed bottom-0 end-0 p-3 m-1 green-bg"
        >
          <CloseButton
            onClick={() => {
              setOpen(!open);
              setFormData(initialState);
              setJiraLink(null);
            }}
            aria-controls="jira-form"
            aria-expanded={open}
            aria-label="Close Help Form"
            className="ms-auto d-block mb-2"
          />
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
          {jiraLink && (
            <Alert
              variant="success p-2 text-center"
            >
              Issue created!
              {' '}
              <a href={jiraLink}>View on Jira</a>
            </Alert>
          )}
          <Form
            onSubmit={handleSubmit}
            className="d-flex h-100 flex-column gap-3"
          >
            <Form.Control
              required
              name="description"
              as="textarea"
              rows={5}
              placeholder="Describe your problem"
              onChange={handleChange}
              value={formData.description}
            />
            <Form.Select
              required
              aria-label="Priority"
              name="priority"
              onChange={handleChange}
              value={formData.priority}
            >
              <option value="">Select priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Form.Select>
            <Button variant="success" type="submit" disabled={!formData.priority}>
              Submit Issue
            </Button>
            {(!formData.priority || !formData.description)
              ? (
                <Alert
                  variant="warning p-1 text-center"
                >
                  Please, fill in all fields.
                </Alert>
              ) : (
                <Alert
                  variant="success p-1 text-center"
                >
                  All fields filled.
                </Alert>
              )}
          </Form>
        </div>
      </Collapse>
    </>
  );
};

export default Support;
