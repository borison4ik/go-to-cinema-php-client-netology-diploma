import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { Hall } from '../../../models/IServerResponce';
import { HallSelector } from '../../common/HallSelector';
import { fechUpdateHallPrice } from '../../../store/reducers/ActionCreators';
import { Button } from '../../common/Button';

export const ConfigurePrice = () => {
  const dispatch = useAppDispatch();
  const { halls, isLoading, error } = useAppSelector((state) => state.hallReducer);
  const { hallPlaceTypePrices, isSending } = useAppSelector((state) => state.hallPLacePrice);
  const [simplePrice, setSimplePrice] = useState(0);
  const [vipPrice, setVipPrice] = useState(0);
  const [activeHall, setActiveHall] = useState<Hall | null>(null);

  const setActiveHallHandler = (id: number) => {
    setActiveHall(halls[id]);
  };

  const resetHandler = () => {
    if (activeHall) {
      const activeSimplePrice = Object.values(hallPlaceTypePrices).find((place) => place.hall_id === activeHall.id && place.place_type_id === 1)?.price;
      setSimplePrice(activeSimplePrice || 0);
      const activeVipPrice = Object.values(hallPlaceTypePrices).find((place) => place.hall_id === activeHall.id && place.place_type_id === 2)?.price;
      setVipPrice(activeVipPrice || 0);
    }
  };

  const saveHandler = () => {
    const dataToSave = [];

    if (activeHall) {
      dataToSave.push({
        id: 0,
        hall_id: activeHall.id,
        place_type_id: 1,
        price: simplePrice,
      });
      dataToSave.push({
        id: 0,
        hall_id: activeHall.id,
        place_type_id: 2,
        price: vipPrice,
      });

      dispatch(fechUpdateHallPrice(dataToSave));
    }
  };

  useEffect(() => {
    if (Object.values(halls).length > 0) {
      setActiveHall(Object.values(halls)[0]);
    }
  }, [halls]);

  useEffect(() => {
    resetHandler();
  }, [activeHall]);

  if (isLoading) return <h1>Загрузка ...</h1>;
  if (error !== null) return <h1>Что-то пошло не так ...</h1>;

  return (
    <>
      {activeHall && <HallSelector halls={halls} name='price' activeId={activeHall.id} setActiveId={setActiveHallHandler} />}
      <p className='conf-step__paragraph'>Установите цены для типов кресел:</p>
      <div className='conf-step__legend'>
        <label className='conf-step__label'>
          Цена, рублей
          <input type='text' className='conf-step__input' placeholder='0' value={simplePrice} onChange={(e) => setSimplePrice(+e.target.value > 0 ? +e.target.value : 0)} />
        </label>
        за <span className='conf-step__chair conf-step__chair_standart'></span> обычные кресла
      </div>
      <div className='conf-step__legend'>
        <label className='conf-step__label'>
          Цена, рублей
          <input type='text' className='conf-step__input' placeholder='0' value={vipPrice} onChange={(e) => setVipPrice(+e.target.value > 0 ? +e.target.value : 0)} />
        </label>
        за <span className='conf-step__chair conf-step__chair_vip'></span> VIP кресла
      </div>

      <fieldset className='conf-step__buttons text-center'>
        <Button name='Отмена' btnStyle='regular' clickHandler={resetHandler} disabled={isSending} />
        <Button name='Сохранить' btnStyle='accent' clickHandler={saveHandler} disabled={isSending} />
      </fieldset>
    </>
  );
};
