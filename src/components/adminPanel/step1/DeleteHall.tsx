import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { fechDeleteHall } from '../../../store/reducers/ActionCreators';
import { Button } from '../../common/Button';

interface DeleteHallProps {
  complited(): void;
  hallId: number;
}

export const DeleteHall: React.FC<DeleteHallProps> = ({ complited, hallId }) => {
  const { halls, isSending } = useAppSelector((state) => state.hallReducer);
  const { name } = halls[hallId] || '';
  const dispatch = useAppDispatch();

  const submitHandler = (evt: React.SyntheticEvent) => {
    evt.preventDefault();

    dispatch(fechDeleteHall(hallId));
  };

  useEffect(() => {
    if (!isSending) {
      complited();
    }
  }, [isSending]);

  return (
    <form onSubmit={submitHandler}>
      <p className='conf-step__paragraph'>
        Вы действительно хотите удалить зал <span>{name}</span>?
      </p>

      <div className='conf-step__buttons text-center'>
        <Button name='Удалить' type='submit' btnStyle='accent' disabled={isSending} />
        <Button name='Отменить' btnStyle='regular' disabled={isSending} clickHandler={complited} />
      </div>
    </form>
  );
};
