import Items from './components/items/Items';
import Collections from './components/collections/Collections';
import Form from './components/form/Form';

const App = () => (
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

export default App;
