import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getCollections } from './redux/collections/collectionsSlice';
import { getItems } from './redux/items/itemsSlice';

import Items from './components/items/Items';
import Collections from './components/collections/Collections';
import Form from './components/form/Form';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCollections());
    dispatch(getItems());
  }, [dispatch]);

  return (
    <>
      <nav>
        <h1>MY CATALOGUE</h1>
      </nav>
      <section id="collections">
        <h2>
          COLLECTIONS:
        </h2>
        <Collections />
      </section>
      <section id="items">
        <h2>
          ITEMS:
        </h2>
        <Items />
      </section>
      <section id="form">
        <h2>
          FORM:
        </h2>
        <Form />
      </section>
    </>
  );
};

export default App;
