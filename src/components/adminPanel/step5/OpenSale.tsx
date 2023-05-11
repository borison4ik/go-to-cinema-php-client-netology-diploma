import React, { useEffect, useState } from 'react';
import { HallSelector } from '../../common/HallSelector';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { Hall } from '../../../models/IServerResponce';
import { fechUpdateHall } from '../../../store/reducers/ActionCreators';
import { TempHallUpdated } from '../step2/ConfigureHalls';
import { Store } from 'react-notifications-component';

export const OpenSale = () => {
  const dispatch = useAppDispatch();
  const { halls, isLoading, isSending, error } = useAppSelector((state) => state.hallReducer);
  const [activeHall, setActiveHall] = useState<Hall | null>(null);
  const [rendered, setRendered] = useState(false);

  const setActiveHallHandler = (id: number) => {
    setActiveHall(halls[id]);
    console.log('id', activeHall);
  };

  const saveHandler = () => {
    if (!activeHall) {
      return;
    }

    const updatedHall: TempHallUpdated = { ...activeHall, enabled: !activeHall.enabled, userPlaces: [] };
    console.log('updatedHall', updatedHall);

    dispatch(fechUpdateHall(updatedHall)).then(() => {
      Store.addNotification({
        title: 'Ура!',
        message: 'Изменения сохранены успешно!',
        type: 'success',
        insert: 'top',
        container: 'top-right',
        dismiss: {
          duration: 2000,
          onScreen: true,
        },
      });
    });
  };

  useEffect(() => {
    if (!rendered && Object.values(halls).length > 0) {
      setActiveHall(Object.values(halls)[0]);
      setRendered(true);
    } else {
      setActiveHall((oldActiveHall) => {
        if (!oldActiveHall) return oldActiveHall;
        return { ...halls[oldActiveHall.id] };
      });
    }
  }, [halls]);

  return (
    <>
      {activeHall && <HallSelector halls={halls} activeId={activeHall.id} name='enabled' setActiveId={setActiveHallHandler} />}
      <div className='text-center pt-30'>
        {!activeHall?.enabled && <p className='conf-step__paragraph'>Всё готово, теперь можно:</p>}
        <button className='conf-step__button conf-step__button-accent' onClick={saveHandler}>
          {activeHall?.enabled ? 'Приостановить продажу билетов' : 'Открыть продажу билетов'}
        </button>
      </div>
    </>
  );
};
