import React from 'react';

interface InputsSizeHallProps {
  hallRow: number;
  hallRowLength: number;
  setHallRow(n: number): void;
  setHallRowLength(n: number): void;
}
export const InputsSizeHall: React.FC<InputsSizeHallProps> = ({ hallRow, hallRowLength, setHallRow, setHallRowLength }) => {
  return (
    <div className='conf-step__legend'>
      <label className='conf-step__label'>
        Рядов, шт
        <input type='number' className='conf-step__input' value={hallRow} onChange={(e) => setHallRow(+e.target.value > 0 ? +e.target.value : 0)} />
      </label>
      <span className='multiplier'>x</span>
      <label className='conf-step__label'>
        Мест, шт
        <input type='number' className='conf-step__input' value={hallRowLength} onChange={(e) => setHallRowLength(+e.target.value > 0 ? +e.target.value : 0)} />
      </label>
    </div>
  );
};
