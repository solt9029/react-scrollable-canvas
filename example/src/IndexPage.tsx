import React from 'react';
import Jumbotron from './Jumbotron';
import Navbar from './Navbar';
import { Container } from 'reactstrap';

const IndexPage = () => {
  return (
    <>
      <Navbar />
      <Jumbotron />
      <Container></Container>
    </>
  );
};

export default IndexPage;
