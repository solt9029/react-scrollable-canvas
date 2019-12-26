import React from 'react';
import { Jumbotron as RCJumbotron, Container } from 'reactstrap';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  text-align: center;
`;

const StyledRCJumbotron = styled(RCJumbotron)`
  margin-bottom: 0;
`;

const Jumbotron = () => {
  return (
    <StyledRCJumbotron>
      <StyledContainer>
        <h1 className="display-3">React Scrollable Canvas</h1>
        <p className="lead">React component library that allows you to create scrollable canvas easily and quickly.</p>
      </StyledContainer>
    </StyledRCJumbotron>
  );
};

export default Jumbotron;
