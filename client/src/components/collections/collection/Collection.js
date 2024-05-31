import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useState } from 'react';
import PropTypes from 'prop-types';
import UpdateCollection from './UpdateCollection';
import { updateCollection, deleteCollection } from '../../../redux/collections/collectionsSlice';
import EditDelete from '../../EditDelete';

const Collection = ({ collection }) => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const [onEdit, setOnEdit] = useState(false);
  const {
    _id, title, text, category, imageUrl,
  } = collection;
  const [collectionData, setCollectionData] = useState({
    _id, title, text, category, imageUrl,
  });
  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(collectionData).map((entry) => (
      formData.append(entry[0], entry[1])
    ));
    dispatch(updateCollection({ userId, collId: _id, updatedCollection: formData }));
    setOnEdit(false);
  };

  return (
    <Row className="collection position-relative">
      {onEdit ? (
        <>
          <UpdateCollection
            collectionData={collectionData}
            collection={collection}
            handleChange={(data) => setCollectionData(data)}
          />
          <button type="button" onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <a
            href={`/users/${collection.author}/collections/${collection._id}/items`}
            className="stretched-link"
            aria-label="Open Collection"
          />
          <Col sm={12} md={2}>
            <h3>
              {title}
              <br />
              <small className="text-muted">{category}</small>
            </h3>
          </Col>
          <Col sm={12} md={6}>{text}</Col>
          <Col sm={12} md={2}>
            {imageUrl ? <img src={imageUrl} alt={title} /> : <p>No image provided</p>}
          </Col>
          <EditDelete
            edit={() => setOnEdit(true)}
            del={() => dispatch(deleteCollection({ userId, collId: _id }))}
          />
        </>
      )}
    </Row>
  );
};

Collection.propTypes = {
  collection: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
};

export default Collection;
