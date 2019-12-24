import React from 'react';
import Navbar from './Navbar';
import { Container as RCContainer } from 'reactstrap';
import styled from 'styled-components';
import SyntaxHighlighter from 'react-syntax-highlighter';
import ScrollableCanvasExample from './ScrollableCanvasExample';
import ScrollableCanvasContainerExample from './ScrollableCanvasContainerExample';
import { scrollableCanvasExampleCode, scrollableCanvasContainerExampleCode } from './constants';

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
        <ul>
          <li>ScrollableCanvas is very simple to use.</li>
        </ul>
        <ScrollableCanvasExample />
        <StyledSyntaxHighlighter language="typescript">{scrollableCanvasExampleCode}</StyledSyntaxHighlighter>

        <h1>Example: ScrollableCanvasContainer</h1>
        <ul>
          <li>It is possible to create some layers with ScrollableCanvasContainer and Canvas.</li>
        </ul>
        <ScrollableCanvasContainerExample />
        <StyledSyntaxHighlighter language="typescript">{scrollableCanvasContainerExampleCode}</StyledSyntaxHighlighter>
      </Container>
    </>
  );
};

export default ExamplesPage;
