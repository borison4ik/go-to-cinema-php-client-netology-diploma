import React from 'react';

import closeIcon from '../../../assets/images/i/close.png';

interface MadalProps {
  title: string;
  children: React.ReactNode;
  active: boolean;
  setActive(active: boolean): void;
}
export const Modal2: React.FC<MadalProps> = ({ active, setActive, children, title }) => {
  return (
    <div className={active ? 'popup active' : 'popup'} onClick={() => setActive(false)}>
      <div className='popup__container' onClick={(e) => e.stopPropagation()}>
        <div className='popup__content'>
          <div className='popup__header'>
            <h2 className='popup__title'>
              {title}
              <button className='popup__dismiss' type='button' onClick={() => setActive(false)}>
                <img src={closeIcon} alt='Закрыть' />
              </button>
            </h2>
          </div>
          <div className='popup__wrapper'>{children}</div>
        </div>
      </div>
    </div>
  );
};
