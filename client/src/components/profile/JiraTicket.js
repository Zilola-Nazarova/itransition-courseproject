import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup';

const domain = process.env.REACT_APP_DOMAIN;
const JIRA_URL = `https://${domain}.atlassian.net`;
const JiraTicket = ({
  summary, description, status, issueKey,
}) => (
  <ListGroup.Item className="item-link py-0">
    <Row className="border-b">
      <Col sm={12} md={3} className="py-3">{summary}</Col>
      <Col sm={12} md={3} className="odd-col py-3">{description}</Col>
      <Col sm={12} md={3} className="py-3">{status}</Col>
      <Col sm={12} md={3} className="odd-col py-3">
        <a
          href={`${JIRA_URL}/browse/${issueKey}`}
        >
          Open in Jira
        </a>
      </Col>
    </Row>
  </ListGroup.Item>
);

JiraTicket.propTypes = {
  summary: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  issueKey: PropTypes.string.isRequired,
};

export default JiraTicket;
