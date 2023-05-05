import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { fechAddHall } from '../../../store/reducers/ActionCreators';
import { Button } from '../../common/Button';

interface AddHallProps {
  complited(): void;
}

export const AddHall: React.FC<AddHallProps> = ({ complited }) => {
  const dispatch = useAppDispatch();
  const { isSending } = useAppSelector((state) => state.hallReducer);
  const [name, setName] = useState('');

  const submitHandler = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    dispatch(fechAddHall({ name }));
  };

  useEffect(() => {
    if (!isSending) {
      setName('');
      complited();
    }
  }, [isSending]);

  return (
    <form onSubmit={submitHandler}>
      <label className='conf-step__label conf-step__label-fullsize' htmlFor='name'>
        Название зала
        <input className='conf-step__input' type='text' placeholder='Например, &laquo;Зал 1&raquo;' name='name' value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <div className='conf-step__buttons text-center'>
        <Button name='Добавить зал' type='submit' btnStyle='accent' disabled={isSending} />
        <Button name='Отменить' btnStyle='regular' disabled={isSending} clickHandler={complited} />
      </div>
    </form>
  );
};
