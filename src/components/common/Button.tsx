import React from 'react';

interface ButtonProps {
  name: string;
  type?: 'submit' | 'reset' | 'button';
  btnStyle?: 'accent' | 'regular';
  disabled?: boolean;
  clickHandler?(): void;
}

export const Button: React.FC<ButtonProps> = ({ name, clickHandler, disabled = false, type = 'button', btnStyle = 'accent' }) => {
  return (
    <button type={type} className={`conf-step__button conf-step__button-${btnStyle}`} onClick={clickHandler} disabled={disabled}>
      {name}
    </button>
  );
};
