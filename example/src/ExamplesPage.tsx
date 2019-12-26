import React from 'react';
import Navbar from './Navbar';
import { Container } from 'reactstrap';
import styled from 'styled-components';
import ScrollableCanvasExample from './ScrollableCanvasExample';
import ScrollableCanvasContainerExample from './ScrollableCanvasContainerExample';
import ScrollableCanvasWithMeasureExample from './ScrollableCanvasWithMeasureExample';
import {
  scrollableCanvasExampleCode,
  scrollableCanvasContainerExampleCode,
  scrollableCanvasWithMeasureExampleCode,
  scrollableClickableCanvasExampleCode,
} from './constants';
import ExampleContent from './ExampleContent';
import ScrollableClickableCanvasExample from './ScrollableClickableCanvasExample';

const StyledContainer = styled(Container)`
  margin-top: 30px;
  margin-bottom: 30px;
`;

const ExamplesPage = () => {
  return (
    <>
      <Navbar active="examples" />
      <StyledContainer>
        <ExampleContent
          title="Example: ScrollableCanvas"
          description="ScrollableCanvas is very simple to use."
          code={scrollableCanvasExampleCode}
        >
          <ScrollableCanvasExample />
        </ExampleContent>

        <ExampleContent
          title="Example: ScrollableCanvasContainer"
          description="You can create some layers with ScrollableCanvasContainer and Canvas."
          code={scrollableCanvasContainerExampleCode}
        >
          <ScrollableCanvasContainerExample />
        </ExampleContent>

        <ExampleContent
          title="Example: ScrollableCanvas with ReactMeasure"
          description="You can create scrollable canvas that matches the width of 100%."
          code={scrollableCanvasWithMeasureExampleCode}
        >
          <ScrollableCanvasWithMeasureExample />
        </ExampleContent>

        <ExampleContent
          title="Example: ScrollableCanvas handling click events"
          description="You can handle click events by wrapping ScrollableCanvas with div element."
          code={scrollableClickableCanvasExampleCode}
        >
          <ScrollableClickableCanvasExample />
        </ExampleContent>
      </StyledContainer>
    </>
  );
};

export default ExamplesPage;
