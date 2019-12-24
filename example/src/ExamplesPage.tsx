import React from 'react';
import Navbar from './Navbar';
import { Container as RCContainer } from 'reactstrap';
import styled from 'styled-components';
import SyntaxHighlighter from 'react-syntax-highlighter';
import ScrollableCanvasExample from './ScrollableCanvasExample';
import { scrollableCanvasExampleCode } from './constants';

const Container = styled(RCContainer)`
  margin-top: 30px;
  margin-bottom: 30px;
`;

const StyledSyntaxHighlighter = styled(SyntaxHighlighter)`
  margin-top: 30px;
  margin-bottom: 30px;
`;

const ExamplesPage = () => {
  return (
    <>
      <Navbar active="examples" />
      <Container>
        <h1>Example: ScrollableCanvas</h1>
        <ScrollableCanvasExample />
        <StyledSyntaxHighlighter language="typescript">{scrollableCanvasExampleCode}</StyledSyntaxHighlighter>

        <h1>Example: ScrollableCanvasContainer</h1>
      </Container>
    </>
  );
};

export default ExamplesPage;
