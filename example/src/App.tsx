import React from 'react';
import { Route } from 'react-router-dom';
import IndexPage from './IndexPage';
import ExamplesPage from './ExamplesPage';
import DocsPage from './DocsPage';

const App = () => {
  return (
    <>
      <Route exact path="/" component={IndexPage} />
      <Route exact path="/examples" component={ExamplesPage} />
      <Route exact path="/docs" component={DocsPage} />
    </>
  );
};

export default App;
