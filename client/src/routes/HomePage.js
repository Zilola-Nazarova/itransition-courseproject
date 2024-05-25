import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { getLargestCollections, getLatestItems, getTagsCloud } from '../redux/home/homeSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLargestCollections());
    dispatch(getLatestItems());
    dispatch(getTagsCloud());
  }, [dispatch]);
  const {
    latestItems, largestCollections, tagsCloud, isLoading, error,
  } = useSelector((state) => state.home);
  return (
    <div>
      <h2>THIS IS THE HOMEPAGE</h2>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {latestItems && (
        <section id="section#1">
          <h3>LATEST ITEMS</h3>
          {latestItems && latestItems.map((item) => (
            <div key={uuidv4()}>
              <Link
                to={`users/${item.author}/collections/${item.coll}/items/${item._id}`}
              >
                <h5>{item.title}</h5>
                <p>{item.text}</p>
                {item.tags.map((tag) => <span key={uuidv4()}>{`#${tag.tagname} `}</span>)}
              </Link>
            </div>
          ))}
        </section>
      )}
      {largestCollections && (
        <section id="section#2">
          <h3>LARGEST COLLECTIONS</h3>
          {largestCollections && largestCollections.map((collection) => (
            <div key={uuidv4()}>
              <Link to={`users/${collection.author}/collections/${collection._id}/items`}>
                <h5>{collection.title}</h5>
                <span>{`${collection.itemCount} items`}</span>
              </Link>
            </div>
          ))}
        </section>
      )}
      {tagsCloud && (
        <section id="section#3">
          <h3>POPULAR TAGS</h3>
          {tagsCloud && tagsCloud.map((tag) => (
            <div key={uuidv4()}>
              <Link to={`/tags/${tag._id}`}>
                <h5>{`#${tag.tagname}`}</h5>
                <span>{`${tag.itemCount} items`}</span>
              </Link>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default HomePage;
