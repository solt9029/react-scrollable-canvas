import * as React from 'react';

export interface ButtonProps {
  text: string;
  flag?: boolean;
  action(): void;
}

const Button = (props: ButtonProps) => {
  const { text, flag, action } = props;
  return (
    <React.Fragment>
      {flag && <p>{text}</p>}
      <button onClick={action}>Button</button>
    </React.Fragment>
  );
};

export default Button;
