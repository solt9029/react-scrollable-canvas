import React from 'react';
import { Link, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Jumbotron from './Jumbotron';

const Home = () => <h2>Home</h2>;
const About = () => <h2>About</h2>;

const App = () => {
  return (
    <div>
      <Navbar />
      <Jumbotron />

      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
    </div>
  );
};

export default App;
