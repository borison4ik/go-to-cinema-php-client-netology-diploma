import React, { useEffect } from 'react';
import { FilmSession } from '../../../models/IServerResponce';
import { useAppSelector } from '../../../hooks/redux';
import moment from 'moment';
import { useParams } from 'react-router-dom';

interface BuyingInfoProps {
  session: FilmSession;
}
export const BuyingInfo: React.FC<BuyingInfoProps> = ({ session }) => {
  const { films } = useAppSelector((state) => state.filmSlice);
  const { halls } = useAppSelector((state) => state.hallReducer);

  return (
    <>
      {session && (
        <div className='buying__info'>
          <div className='buying__info-description'>
            <h2 className='buying__info-title'>{films[session.film_id].name}</h2>
            <p className='buying__info-start'>Начало сеанса: {moment(session.start_date_time).format('HH:mm')}</p>
            <p className='buying__info-hall'>{halls[session.hall_id].name}</p>
          </div>
          <div className='buying__info-hint'>
            <p>
              Тапните дважды,
              <br />
              чтобы увеличить
            </p>
          </div>
        </div>
      )}
    </>
  );
};
