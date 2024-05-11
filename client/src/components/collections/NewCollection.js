import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postCollection } from '../../redux/collections/collectionsSlice';

const NewCollection = () => {
  const dispatch = useDispatch();
  const [collectionData, setCollectionData] = useState({
    title: '',
    description: '',
  });
  const clear = () => {
    setCollectionData({
      title: '',
      description: '',
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postCollection(collectionData));
    clear();
  };

  return (
    <>
      <h3>CREATE COLLECTION</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="title"
          label="title"
          value={collectionData.title}
          onChange={(e) => setCollectionData({ ...collectionData, title: e.target.value })}
        />
        <input
          name="description"
          placeholder="description"
          label="description"
          value={collectionData.description}
          onChange={(e) => setCollectionData({ ...collectionData, description: e.target.value })}
        />
        <button type="submit">Submit</button>
        <button type="button" onClick={clear}>Clear</button>
      </form>
    </>
  );
};

export default NewCollection;
