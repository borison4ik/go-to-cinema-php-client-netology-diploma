import React, { useState } from 'react';
import cn from 'classnames';
import { Button } from '../../common/Button';
import { Modal2 } from '../../common/Modal/Modal2';
import { AddHall } from './AddHall';
import { DeleteHall } from './DeleteHall';
import { useAppSelector } from '../../../hooks/redux';

export const modalTypes = {
  del: 'Удаление зала',
  add: 'Добавление зала',
};

export const HallsNameList = () => {
  const { halls, isLoading, error } = useAppSelector((state) => state.hallReducer);
  const [isShowAddModal, setIsShowAddModal] = useState(false);
  const [isShowDelModal, setIsShowDelModal] = useState(false);
  const [dellHallId, setDellHallId] = useState<number>(0);
  const hallsArray = Object.values(halls);

  const addHallHandler = () => {
    setIsShowAddModal(true);
  };

  const deleteHallHandler = (hallId: number) => {
    setDellHallId(hallId);
    setIsShowDelModal(true);
  };

  if (isLoading) return <h1>Загрузка...</h1>;
  if (error !== null) return <h1>Что-то пошло не так ...</h1>;

  return (
    <>
      <p className='conf-step__paragraph'>Доступные залы:</p>
      <ul className='conf-step__list'>
        {hallsArray &&
          hallsArray.length > 0 &&
          hallsArray.map((hall) => (
            <li key={hall.id}>
              {hall.name}&nbsp;&nbsp;
              <button className='conf-step__button conf-step__button-trash' onClick={() => deleteHallHandler(hall.id)}></button>&nbsp;&nbsp;
              <span className={cn({ open: hall.enabled, close: !hall.enabled })}>{hall.enabled ? 'Продажи открыты' : 'Продажи закрыты'}</span>
            </li>
          ))}
      </ul>
      <Button name='Создать зал' clickHandler={addHallHandler} />

      <Modal2 title={modalTypes.add} active={isShowAddModal} setActive={setIsShowAddModal}>
        <AddHall complited={() => setIsShowAddModal(false)} />
      </Modal2>

      <Modal2 title={modalTypes.del} active={isShowDelModal} setActive={setIsShowDelModal}>
        <DeleteHall complited={() => setIsShowDelModal(false)} hallId={dellHallId} />
      </Modal2>
    </>
  );
};
