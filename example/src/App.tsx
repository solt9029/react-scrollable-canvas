import React from 'react';
import { Route } from 'react-router-dom';
import IndexPage from './IndexPage';
import ExamplesPage from './ExamplesPage';

const App = () => {
  return (
    <>
      <Route exact path="/" component={IndexPage} />
      <Route exact path="/examples" component={ExamplesPage} />
    </>
  );
};

export default App;
