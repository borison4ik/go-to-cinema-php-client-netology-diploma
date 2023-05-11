import React, { useEffect, useState } from 'react';
import nextId from 'react-id-generator';
import { HallSelector } from '../../common/HallSelector';
import { SchemaUserPlaces } from './SchemaUserPlaces';
import { Hall } from '../../../models/IServerResponce';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { InputsSizeHall } from './InputsSizeHall';
import { fechUpdateHall } from '../../../store/reducers/ActionCreators';
import { Button } from '../../common/Button';
import { Store } from 'react-notifications-component';

export interface MatrixItem {
  id: number;
  places: tempUserPlace[];
}

export interface tempUserPlace {
  id?: number | string;
  place_row: number;
  place_number: number;
  hall_id: number;
  place_type_id: number;
}

export interface TempHallUpdated {
  id: number;
  name: string;
  rows: number;
  row_length: number;
  enabled: boolean;
  userPlaces?: tempUserPlace[];
}

export const ConfigureHalls = () => {
  const dispatch = useAppDispatch();
  const { halls, isLoading, isSending, error } = useAppSelector((state) => state.hallReducer);

  const [activeHall, setActiveHall] = useState<Hall | null>(null);
  const [hallRow, setHallRow] = useState(0);
  const [hallRowLength, setHallRowLength] = useState(0);
  const [matrix, setMatrix] = useState<MatrixItem[]>([]);
  const [rendered, setRendered] = useState(false);

  const getUserPlace = (row: number, placeNumber: number) => {
    return {
      id: nextId(),
      place_row: row,
      place_number: placeNumber,
      hall_id: activeHall?.id || 0,
      place_type_id: 1,
    };
  };

  const getFormatedUserPlaces = () => {
    const userPlacesToServer = matrix.reduce((acc: tempUserPlace[], row) => {
      return (acc = [...acc, ...row.places]);
    }, []);
    return userPlacesToServer;
  };

  const getMatrix = () => {
    const temp: MatrixItem[] = [];
    if (!activeHall) return temp;
    if (!activeHall.userPlaces) return [];
    const userPlaceArray = Object.values(activeHall.userPlaces);

    for (let r = 1; r <= hallRow; r++) {
      const matrixRow: { id: number; places: tempUserPlace[] } = {
        id: r,
        places: [],
      };

      for (let l = 1; l <= hallRowLength; l++) {
        const up = userPlaceArray.find((place) => place.place_row === r && place.place_number === l);
        if (up) {
          matrixRow.places.push(up);
        } else {
          matrixRow.places.push(getUserPlace(r, l));
        }
      }

      temp.push(matrixRow);
    }

    return temp;
  };

  const setActiveHallHandler = (id: number) => {
    setActiveHall(halls[id]);
  };

  const resetHandler = () => {
    if (activeHall) {
      setHallRow(halls[activeHall.id].rows);
      setHallRowLength(halls[activeHall.id].row_length);
      setMatrix(getMatrix());
    }
  };

  const saveHandler = () => {
    if (activeHall) {
      const updatedHall = {
        ...activeHall,
        rows: hallRow,
        row_length: hallRowLength,
        userPlaces: getFormatedUserPlaces(),
      };

      dispatch(fechUpdateHall(updatedHall)).then(() => {
        Store.addNotification({
          title: 'Ура!',
          message: 'Конфигурация сохнанена успешно!',
          type: 'success',
          insert: 'top',
          container: 'top-right',
          dismiss: {
            duration: 2000,
            onScreen: true,
          },
        });
      });
    }
  };

  useEffect(() => {
    resetHandler();
  }, [activeHall]);

  React.useEffect(() => {
    setMatrix(getMatrix());
  }, [activeHall, hallRow, hallRowLength]);

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

  if (isLoading) return <h1>Загрузка ...</h1>;
  if (error !== null) return <h1>Что-то пошло не так ...</h1>;

  return (
    <>
      {activeHall && <HallSelector halls={halls} activeId={activeHall.id} name='conf' setActiveId={setActiveHallHandler} />}

      {activeHall && !halls[activeHall.id].rows && !halls[activeHall.id].row_length ? (
        <>
          <p className='conf-step__paragraph'>Укажите количество рядов и максимальное количество кресел в ряду:</p>
          <InputsSizeHall hallRow={hallRow} hallRowLength={hallRowLength} setHallRow={setHallRow} setHallRowLength={setHallRowLength} />
        </>
      ) : (
        <p className='conf-step__paragraph'>Размеры этого зала уже сконфигурированны</p>
      )}

      {activeHall && <SchemaUserPlaces activeHall={activeHall} matrix={matrix} setMatrix={setMatrix} />}

      <fieldset className='conf-step__buttons text-center'>
        <Button name='Отмена' btnStyle='regular' clickHandler={resetHandler} disabled={isSending} />
        <Button name='Сохранить' btnStyle='accent' clickHandler={saveHandler} disabled={isSending} />
      </fieldset>
    </>
  );
};
