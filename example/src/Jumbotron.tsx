import React from 'react';
import { Jumbotron as RCJumbotron, Container as RCContainer } from 'reactstrap';
import styled from 'styled-components';

const Container = styled(RCContainer)`
  text-align: center;
`;

const SRCJumbotron = styled(RCJumbotron)`
  margin-bottom: 0;
`;

const Jumbotron = () => {
  return (
    <SRCJumbotron>
      <Container>
        <h1 className="display-3">React Scrollable Canvas</h1>
        <p className="lead">React component library that allows you to create scrollable canvas easily and quickly.</p>
      </Container>
    </SRCJumbotron>
  );
};

export default Jumbotron;
