import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal2 } from '../../common/Modal/Modal2';
import { useAppSelector } from '../../../hooks/redux';
import { Button } from '../../common/Button';

export interface SubmitForm {
  start_time: string;
  film: string;
  hall: string;
}

interface AddFilmSessionProps {
  onComplite(obj: SubmitForm): void;
}

export const AddFilmSession: React.FC<AddFilmSessionProps> = ({ onComplite }) => {
  const { halls } = useAppSelector((state) => state.hallReducer);
  const { films } = useAppSelector((state) => state.filmSlice);
  const [timeValue, setTimeValue] = useState<string>('00:00');

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<SubmitForm>({
    mode: 'onBlur',
  });

  const onSubmit = handleSubmit((data) => {
    onComplite(data);
    reset();
    setIsAddShown(false);
  });

  const [isAddShown, setIsAddShown] = useState(false);

  const showAddModalHandler = () => {
    setIsAddShown(true);
  };

  const cancelHandler = () => {
    setIsAddShown(false);
  };

  return (
    <>
      <p className='conf-step__paragraph'>
        <button className='conf-step__button conf-step__button-accent' onClick={showAddModalHandler}>
          Добавить сеанс
        </button>
      </p>
      <Modal2 active={isAddShown} setActive={setIsAddShown} title='Добавление сеанса'>
        <form onSubmit={onSubmit}>
          <label className='conf-step__label conf-step__label-fullsize' htmlFor='hall'>
            Название зала
            <select className='conf-step__input' defaultValue={Object.keys(halls)[0]} {...register('hall')}>
              {Object.values(halls || {}).map((hall) => (
                <option value={hall.id} key={hall.id}>
                  {hall.name}
                </option>
              ))}
            </select>
          </label>

          <label className='conf-step__label conf-step__label-fullsize' htmlFor='film'>
            Название фильма
            <select className='conf-step__input' defaultValue={Object.keys(films)[0]} {...register('film')}>
              {Object.values(films || {}).map((film) => (
                <option value={film.id} key={film.id}>
                  {film.name}
                </option>
              ))}
            </select>
          </label>

          <label className='conf-step__label conf-step__label-fullsize' htmlFor='start_time'>
            Время начала
            <input
              className='conf-step__input'
              type='time'
              value={timeValue}
              {...register('start_time', {
                required: 'Поле обязательно для заполнения',
                onChange: (e) => setTimeValue(e.target.value),
              })}
            />
          </label>

          <div className='conf-step__buttons text-center'>
            <Button name='Добавить сеанс' type='submit' btnStyle='accent' disabled={!isValid} />
            <Button name='Отменить' btnStyle='regular' clickHandler={cancelHandler} />
          </div>
        </form>
      </Modal2>
    </>
  );
};
