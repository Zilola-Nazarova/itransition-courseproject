import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCollection } from '../../redux/collections/collectionsSlice';

const NewCollection = () => {
  const dispatch = useDispatch();
  const [collectionData, setCollectionData] = useState({
    id: '',
    name: '',
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCollection(collectionData));
  };
  const clear = () => {
    setCollectionData({
      id: '',
      name: '',
    });
  };

  return (
    <>
      <h3>CREATE COLLECTION</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="id"
          type="number"
          placeholder="5"
          label="id"
          value={collectionData.id}
          onChange={(e) => setCollectionData({ ...collectionData, id: e.target.valueAsNumber })}
        />
        <input
          name="name"
          placeholder="Collection #5"
          label="name"
          value={collectionData.name}
          onChange={(e) => setCollectionData({ ...collectionData, name: e.target.value })}
        />
        <button type="submit">Submit</button>
        <button type="button" onClick={clear}>Clear</button>
      </form>
    </>
  );
};

export default NewCollection;
