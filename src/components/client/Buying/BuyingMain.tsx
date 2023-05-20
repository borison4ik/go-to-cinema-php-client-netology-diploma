import React, { useEffect, useState } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';

import { BuyingInfo } from './BuyingInfo';
import { BuyingScheme } from './BuyingScheme';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { api } from '../../../API/callToServer';
import { FilmSession, Ticket } from '../../../models/IServerResponce';
import { Store } from 'react-notifications-component';
import { fechSessionForDay } from '../../../store/reducers/ActionCreators';
import { selectedClientPlacesSlice } from '../../../store/reducers/SelectedClientPlacesSlice';
import { ClientHallHeaderLoader } from '../../common/Loaders/ClientHallHeaderLoader';
import { ClientHallLoader } from '../../common/Loaders/ClientHallLoader';

export const BuyingMain = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { films, isLoading: isFilmLoading } = useAppSelector((state) => state.filmSlice);
  const { halls, isLoading: isHallLoading } = useAppSelector((state) => state.hallReducer);
  const { selectedPlaces } = useAppSelector((state) => state.SelectedClientPlacesSlice);
  const { session } = useAppSelector((state) => state.SelectedClientFilmSessionSlice);
  const { reset: ReserSelectedTikets } = selectedClientPlacesSlice.actions;
  const [tickets, setTickets] = useState<{ [key: Ticket['id']]: Ticket }>({});
  const [isLoading, setIsLoading] = useState(false);

  const sessionId = params.sessionId ? Number.parseInt(params.sessionId, 10) : 0;

  const orderHandler = () => {
    if (!selectedPlaces.length) {
      Store.addNotification({
        title: 'Места не выбраны!',
        message: 'Выберите места для продолжения',
        type: 'danger',
        insert: 'top',
        container: 'top-right',
        dismiss: {
          duration: 2000,
          onScreen: true,
        },
      });
      return;
    }

    navigate(`/order/${sessionId}/payment`);
  };

  useEffect(() => {
    setIsLoading(true);
    if (selectedPlaces.length) {
      dispatch(ReserSelectedTikets());
    }

    if (sessionId && !isFilmLoading && !isHallLoading && Object.keys(films).length && Object.keys(halls).length) {
      const fsp = dispatch(fechSessionForDay(sessionId));
      const tp = api.get(`ticket/${sessionId}`);

      Promise.all([fsp, tp]).then((resp) => {
        setTickets(resp[1].data);
        setIsLoading(false);
      });
    }
  }, [sessionId, isFilmLoading, isHallLoading]);

  if (!sessionId) return <Navigate to='/404' />;

  return (
    <main>
      <section className='buying'>
        {isLoading || !session ? (
          <>
            <ClientHallHeaderLoader />
            <ClientHallLoader />
          </>
        ) : (
          <>
            <BuyingInfo session={session} />
            <BuyingScheme session={session} tickets={tickets} />
          </>
        )}
        <button className='acceptin-button' onClick={orderHandler}>
          Забронировать
        </button>
      </section>
    </main>
  );
};
