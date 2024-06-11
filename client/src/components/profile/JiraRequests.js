import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getIssuesByUser } from '../../redux/jira/jiraSlice';
import JiraTicket from './JiraTicket';
import Paginated from '../Paginated';

const JiraRequests = () => {
  const dispatch = useDispatch();
  const maxResults = 5;
  const { user } = useSelector((state) => state.auth);
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  useEffect(() => {
    if (user && page) {
      const pagination = { startAt: (page - 1) * maxResults, maxResults };
      dispatch(getIssuesByUser(pagination));
    }
  }, [dispatch, user, page]);
  const {
    value, error, isLoading, pageCount,
  } = useSelector((state) => state.jira);

  return (
    <Container
      fluid
      data-bs-theme="dark"
      className="issues text-light"
    >
      <h3 className="text-center">MY REQUESTS</h3>
      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}
      {isLoading && (
        <Spinner animation="border" role="status" variant="success">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {value && (
        <Paginated
          pageCount={pageCount}
          page={page}
          slice="jira"
          renderItem={(issue) => (
            <JiraTicket
              summary={issue.fields.summary}
              description={issue.fields.description.content[0].content[0].text}
              status={issue.fields.status.name}
              issueKey={issue.key}
              key={uuidv4()}
            />
          )}
        />
      )}
      {value?.length === 0
        && <p>Oops! Seems you don&apos;t have any items. Want to create one?</p>}
    </Container>
  );
};

export default JiraRequests;
