import React from 'react';
import { Route } from 'react-router-dom';
import IndexPage from './IndexPage';
import ScrollableCanvasExample from './ScrollableCanvasExample';

const About = () => <h2>About</h2>;

const App = () => {
  return (
    <>
      <Route exact path="/" component={IndexPage} />
      <Route path="/about" component={About} />
      <Route path="/example" component={ScrollableCanvasExample} />
    </>
  );
};

export default App;
