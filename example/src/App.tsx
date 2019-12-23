import React from 'react';
import { Route } from 'react-router-dom';
import IndexPage from './IndexPage';
import ExamplesPage from './ExamplesPage';
import ScrollableCanvasExample from './ScrollableCanvasExample';

const App = () => {
  return (
    <>
      <Route exact path="/" component={IndexPage} />
      <Route exact path="/examples" component={ExamplesPage} />
      <Route path="/example" component={ScrollableCanvasExample} />
    </>
  );
};

export default App;
