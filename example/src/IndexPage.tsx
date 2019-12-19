import React from 'react';
import Jumbotron from './Jumbotron';
import Navbar from './Navbar';
import ResizableCanvas from './ResizableCanvas';

const IndexPage = () => {
  return (
    <>
      <Navbar />
      <Jumbotron />
      <ResizableCanvas />
    </>
  );
};

export default IndexPage;
