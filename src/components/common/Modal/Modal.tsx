import React from 'react';
import cn from 'classnames';

import styles from './modal.module.scss';

interface MadalProps {
  children: React.ReactNode;
  active: boolean;
  setActive(active: boolean): void;
}
export const Modal: React.FC<MadalProps> = ({
  active,
  setActive,
  children,
}) => {
  return (
    <div
      className={cn(styles.modal, { [styles.active]: active })}
      onClick={() => setActive(false)}>
      <div
        className={cn(styles.content, { [styles.active]: active })}
        onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn}>
          <span>Close</span>
        </button>
        {children}
      </div>
    </div>
  );
};
