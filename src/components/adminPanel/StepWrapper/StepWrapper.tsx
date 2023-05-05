import React from 'react';
import cn from 'classnames';

interface StepWrapperProps {
  title: string;
  children: React.ReactNode;
}
export const StepWrapper: React.FC<StepWrapperProps> = ({
  title,
  children,
}) => {
  const [isOpen, setIsOpen] = React.useState(true);

  const clickHandler = () => {
    setIsOpen((isOldOpen) => !isOldOpen);
  };
  return (
    <section className='conf-step'>
      <header
        className={cn(
          'conf-step__header',
          { 'conf-step__header_opened': isOpen },
          { 'conf-step__header_closed': !isOpen },
        )}
        onClick={clickHandler}>
        <h2 className='conf-step__title'>{title}</h2>
      </header>

      <div className='conf-step__wrapper'>{children}</div>
    </section>
  );
};
