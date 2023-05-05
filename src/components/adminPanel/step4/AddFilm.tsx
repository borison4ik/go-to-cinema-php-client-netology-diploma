import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal2 } from '../../common/Modal/Modal2';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { fechAddFilm } from '../../../store/reducers/ActionCreators';
import { Button } from '../../common/Button';

export interface SubmitForm {
  name: string;
  minutes: number;
  image: FileList;
}

export const AddFilm = () => {
  const { isSending } = useAppSelector((state) => state.filmSlice);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<SubmitForm>({
    mode: 'onBlur',
  });

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('minutes', data.minutes.toString());
    formData.append('image', data.image[0]);
    dispatch(fechAddFilm(formData));
    reset();
  });

  const [isAddShown, setIsAddShown] = useState(false);

  const showAddModalHandler = () => {
    setIsAddShown(true);
  };

  const cancelHandler = () => {
    setIsAddShown(false);
  };

  useEffect(() => {
    if (!isSending) {
      setIsAddShown(false);
    }
  }, [isSending]);

  return (
    <>
      <p className='conf-step__paragraph'>
        <Button name='Добавить фильм' btnStyle='accent' clickHandler={showAddModalHandler} />
      </p>
      <Modal2 active={isAddShown} setActive={setIsAddShown} title='Добавление фильма'>
        <form onSubmit={onSubmit}>
          <label className='conf-step__label conf-step__label-fullsize' htmlFor='name'>
            Название фильма
            <input
              className='conf-step__input'
              type='text'
              placeholder='Например, &laquo;Гражданин Кейн&raquo;'
              {...register('name', {
                required: 'Поле обязательно для заполнения',
              })}
            />
            {errors?.name && <p className='error'>{errors?.name?.message || 'Не корректно заполненное поле'}</p>}
          </label>
          <label className='conf-step__label conf-step__label-fullsize' htmlFor='minutes'>
            Длительность
            <input
              className='conf-step__input'
              type='number'
              placeholder='60'
              {...register('minutes', {
                required: 'Поле обязательно для заполнения',
                valueAsNumber: true,
              })}
            />
            {errors?.minutes && <p className='error'>{errors?.minutes?.message || 'Не корректно заполненное поле'}</p>}
          </label>
          <label className='conf-step__label conf-step__label-fullsize' htmlFor='image'>
            Обложка
            <input
              className='conf-step__input'
              type='file'
              placeholder='Выбери изображение'
              {...register('image', {
                required: 'Поле обязательно для заполнения',
              })}
            />
          </label>
          <div className='conf-step__buttons text-center'>
            <Button name='Добавить фильм' type='submit' btnStyle='accent' disabled={!isValid} />
            <Button name='Отменить' btnStyle='regular' clickHandler={cancelHandler} />
          </div>
        </form>
      </Modal2>
    </>
  );
};
