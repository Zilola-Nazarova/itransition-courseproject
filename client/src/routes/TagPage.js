import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { getTagItems } from '../redux/tags/tagsSlice';

const TagPage = () => {
  const dispatch = useDispatch();
  const { tagId } = useParams();
  useEffect(() => {
    dispatch(getTagItems(tagId));
  }, [dispatch, tagId]);
  const { tagItems, isLoading, error } = useSelector((state) => state.tags);

  return (
    <>
      <h2>TAG ITEMS PAGE</h2>
      <h3>{`#${tagItems?.tagname}`}</h3>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {tagItems && tagItems.items.map((item) => (
        <Link key={uuidv4()} to={`/users/${item.author}/collections/${item.coll}/items/${item._id}`}>
          <p>{item._id}</p>
          <p>{item.title}</p>
          <p>{item.text}</p>
          {item.tags.map((tag) => <span key={uuidv4()}>{tag.tagname}</span>)}
        </Link>
      ))}
      {tagItems?.length === 0
        && <p>Oops! Seems there are no items with this tag.</p>}
    </>
  );
};

export default TagPage;
