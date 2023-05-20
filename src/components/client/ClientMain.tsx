import React, { useEffect, useState } from 'react';
import moment, { Moment } from 'moment';

import { NavigationDatePicker } from './NavigationDatePicker';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fechAllSessionForDay } from '../../store/reducers/ActionCreators';
import { Schedule } from './Schedule';

import 'moment/locale/ru';
import { ClientFilmLoader } from '../common/Loaders/ClientFilmLoader';

export const ClientMain = () => {
  const dispatch = useAppDispatch();
  const [chosenMoment, setChosenMoment] = useState<Moment>(moment().locale('ru'));
  const { films, isLoading: isFilmLoading } = useAppSelector((state) => state.filmSlice);
  const { halls, isLoading: isHallLoading } = useAppSelector((state) => state.hallReducer);
  const { isLoading } = useAppSelector((state) => state.sessionFilmForDateSlice);

  useEffect(() => {
    if (!isFilmLoading && !isHallLoading && Object.keys(films).length && Object.keys(halls).length) {
      dispatch(fechAllSessionForDay(chosenMoment.format('YYYY-MM-DD')));
    }
  }, [dispatch, chosenMoment, isFilmLoading, isHallLoading]);

  return (
    <>
      <NavigationDatePicker chosenMoment={chosenMoment} setChosenMoment={setChosenMoment} />
      <main>
        {isLoading || isFilmLoading || isHallLoading ? (
          Array(4)
            .fill(null)
            .map((u, index) => (
              <section className='movie' key={index}>
                <ClientFilmLoader />
              </section>
            ))
        ) : (
          <Schedule chosenMoment={chosenMoment} />
        )}
      </main>
    </>
  );
};
