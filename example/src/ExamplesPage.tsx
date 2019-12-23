import React from 'react';
import Navbar from './Navbar';
import { Container as RCContainer } from 'reactstrap';
import styled from 'styled-components';

const Container = styled(RCContainer)`
  margin-top: 30px;
`;

const ExamplesPage = () => {
  return (
    <>
      <Navbar active="examples" />
      <Container>text</Container>
    </>
  );
};

export default ExamplesPage;
