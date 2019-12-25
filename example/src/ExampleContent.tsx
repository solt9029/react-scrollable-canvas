import React, { ReactNode } from 'react';
import { Container } from 'reactstrap';
import styled from 'styled-components';
import SyntaxHighlighter from 'react-syntax-highlighter';

const StyledContainer = styled(Container)`
  margin-top: 30px;
  margin-bottom: 150px;
`;

const StyledSyntaxHighlighter = styled(SyntaxHighlighter)`
  margin-top: 30px;
  margin-bottom: 30px;
`;

interface ExampleContentProps {
  title: string;
  description: string;
  code: string;
  children?: ReactNode;
}

const ExamplesContent = ({ title, description, code, children }: ExampleContentProps) => (
  <StyledContainer>
    <h1>{title}</h1>
    <ul>
      <li>{description}</li>
    </ul>
    {children}
    <StyledSyntaxHighlighter language="javascript">{code}</StyledSyntaxHighlighter>
  </StyledContainer>
);

export default ExamplesContent;
