import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLargestCollections, getRecentItems, getPopularTags } from '../redux/home/homeSlice';
import RecentItems from '../components/home/RecentItems';
import LargestCollections from '../components/home/LargestCollections';
import PopularTags from '../components/home/PopularTags';

const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLargestCollections());
    dispatch(getRecentItems());
    dispatch(getPopularTags());
  }, [dispatch]);
  const {
    recentItems, largestCollections, popularTags, isLoading, error,
  } = useSelector((state) => state.home);
  return (
    <>
      <h1 className="text-light text-center mb-3">WELCOME TO COLLECTIONS OF THINGS</h1>
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
      <Container
        className="home-container"
      >
        <Row>
          <Col className="py-3" sm={12} lg={4}>{recentItems && <RecentItems />}</Col>
          <Col className="py-3" sm={12} lg={4}>{largestCollections && <LargestCollections />}</Col>
          <Col className="py-3" sm={12} lg={4}>{popularTags && <PopularTags />}</Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
