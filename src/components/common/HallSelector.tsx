import React from 'react';
import { Hall } from '../../models/IServerResponce';

interface HallSelectorProps {
  halls: { [key: Hall['id']]: Hall };
  activeId: number;
  setActiveId(id: number): void;
  name: string;
}
export const HallSelector: React.FC<HallSelectorProps> = ({ halls, activeId, setActiveId, name }) => {
  const onChangeHandler = (hall: Hall) => {
    setActiveId(hall.id);
  };

  return (
    <>
      <p className='conf-step__paragraph'>Выберите зал для конфигурации:</p>
      <ul className='conf-step__selectors-box'>
        {Object.values(halls).length &&
          Object.values(halls).map((hall) => (
            <li key={hall.id}>
              <input type='radio' className='conf-step__radio' name={`chairs-hall-${name}`} value={hall.id} onChange={() => onChangeHandler(hall)} checked={activeId === hall.id} />
              <span className='conf-step__selector'>{hall.name}</span>
            </li>
          ))}
      </ul>
    </>
  );
};
