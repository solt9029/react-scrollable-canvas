import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Container } from 'reactstrap';
import styled from 'styled-components';
import { docsMarkdown } from './constants';
import Navbar from './Navbar';

const StyledContainer = styled(Container)`
  margin-top: 30px;
  margin-bottom: 30px;
`;

const DocsPage = () => {
  return (
    <>
      <Navbar active="docs" />
      <StyledContainer>
        <ReactMarkdown source={docsMarkdown} />
      </StyledContainer>
    </>
  );
};

export default DocsPage;
