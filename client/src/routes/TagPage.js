import { useEffect } from 'react';
import { useParams } from 'react-router';
// import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { getTagItems } from '../redux/tags/tagsSlice';
import Paginated from '../components/Paginated';
import Item from '../components/items/item/Item';

const TagPage = () => {
  const dispatch = useDispatch();
  const { tagId } = useParams();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  useEffect(() => {
    if (page) {
      dispatch(getTagItems({ tagId, page }));
    }
  }, [dispatch, tagId, page]);
  const {
    tagItems, numberOfPages, isLoading, error,
  } = useSelector((state) => state.tags);

  return (
    <>
      <h2>TAG ITEMS PAGE</h2>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {tagItems?.items?.length > 0 && (
        <>
          <h3>{`#${tagItems?.tag.tagname}`}</h3>
          <Paginated
            pageCount={numberOfPages}
            page={page}
            items={tagItems.items}
            renderItem={(item) => <Item item={item} key={uuidv4()} />}
          />
        </>
      )}
      {tagItems?.items?.length === 0
        && <p>Oops! Seems there are no items with this tag.</p>}
    </>
  );
};

export default TagPage;
