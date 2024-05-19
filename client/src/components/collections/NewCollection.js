import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useState } from 'react';
import FileBase from 'react-file-base64';
import { v4 as uuidv4 } from 'uuid';
import { postCollection } from '../../redux/collections/collectionsSlice';

const NewCollection = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const emptyCollectionObj = {
    title: '', text: '', category: '', image: '',
  };
  const [collectionData, setCollectionData] = useState(emptyCollectionObj);
  const clear = () => setCollectionData(emptyCollectionObj);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postCollection({ userId, newCollection: collectionData }));
    clear();
  };
  const categories = ['cat1', 'cat2', 'cat3', 'other'];

  return (
    <div className="form">
      <h3>CREATE COLLECTION</h3>
      <form onSubmit={handleSubmit}>
        <input
          required
          placeholder="title"
          value={collectionData.title}
          onChange={(e) => setCollectionData({ ...collectionData, title: e.target.value })}
        />
        <input
          required
          placeholder="text"
          value={collectionData.text}
          onChange={(e) => setCollectionData({ ...collectionData, text: e.target.value })}
        />
        <select
          required
          placeholder="category"
          onChange={(e) => setCollectionData({ ...collectionData, category: e.target.value })}
          value={collectionData.category}
        >
          <option value="">Please select a category</option>
          {categories.map((category) => (
            <option key={uuidv4()} value={category}>{category}</option>
          ))}
        </select>
        <div>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setCollectionData({ ...collectionData, image: base64 })}
          />
        </div>
        <button type="submit">Submit</button>
        <button type="button" onClick={clear}>Clear</button>
      </form>
    </div>
  );
};

export default NewCollection;
