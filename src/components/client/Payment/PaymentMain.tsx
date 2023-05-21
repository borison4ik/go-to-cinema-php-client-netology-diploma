import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import moment from 'moment';
import { api } from '../../../API/callToServer';
import { Store } from 'react-notifications-component';
import { clientTicketsSlice } from '../../../store/reducers/ClientTicketsSlice';
import { selectedClientPlacesSlice } from '../../../store/reducers/SelectedClientPlacesSlice';

export const PaymentMain = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useAppDispatch();
  const sessionId = params.sessionId ? Number.parseInt(params.sessionId, 10) : 0;
  const { selectedPlaces } = useAppSelector((state) => state.SelectedClientPlacesSlice);
  const { session } = useAppSelector((state) => state.SelectedClientFilmSessionSlice);
  const { hallPlaceTypePrices } = useAppSelector((state) => state.hallPLacePrice);
  const { halls } = useAppSelector((state) => state.hallReducer);
  const { films } = useAppSelector((state) => state.filmSlice);
  const { add } = clientTicketsSlice.actions;
  const { reset } = selectedClientPlacesSlice.actions;

  const countPrice = () => {
    const price = selectedPlaces.reduce((acc, place) => {
      acc = acc + hallPlaceTypePrices[place.place_type_id].price;
      return acc;
    }, 0);

    return price;
  };

  const payClickHandler = () => {
    const obj = {
      film_session_id: sessionId,
      userPlaces: selectedPlaces,
    };
    const response = api
      .post('ticket', obj)
      .then((response) => {
        dispatch(add(response.data));
        navigate(`/order/${sessionId}/ticket`);
      })
      .catch((response) => {
        if (response.response.status === 301) {
          Store.addNotification({
            title: 'Вы опоздали!',
            message: 'Выбранные билеты уже куплены',
            type: 'danger',
            insert: 'top',
            container: 'top-right',
            dismiss: {
              duration: 2000,
              onScreen: true,
            },
            onRemoval: () => {
              dispatch(reset());
              navigate(`/order/${sessionId}/`, { replace: true, state: true });
            },
          });
        }
      });
  };

  if (!selectedPlaces.length || sessionId !== session?.id) return <Navigate to='/' replace={true} />;

  return (
    <main>
      <section className='ticket'>
        <header className='tichet__check'>
          <h2 className='ticket__check-title'>Вы выбрали билеты:</h2>
        </header>

        <div className='ticket__info-wrapper'>
          <p className='ticket__info'>
            На фильм: <span className='ticket__details ticket__title'>{films[session.film_id].name}</span>
          </p>
          <p className='ticket__info'>
            Места:{' '}
            <span className='ticket__details ticket__chairs'>
              {selectedPlaces.map((place) => (
                <span key={place.id} className='ticket__chairs-item'>
                  место:&nbsp;<span className='ticket__chairs-place'>{place.place_number}</span>&nbsp;&nbsp;ряд:&nbsp;
                  <span className='ticket__chairs-row'>{place.place_row}</span>
                </span>
              ))}
            </span>
          </p>
          <p className='ticket__info'>
            В зале: <span className='ticket__details ticket__hall'>{halls[session.hall_id].name}</span>
          </p>
          <p className='ticket__info'>
            Начало сеанса: <span className='ticket__details ticket__start'>{moment(session.start_date_time).format('HH:mm')}</span>
          </p>
          <p className='ticket__info'>
            Стоимость: <span className='ticket__details ticket__cost'>{countPrice()}</span> рублей
          </p>

          <button className='acceptin-button' onClick={payClickHandler}>
            Получить код бронирования
          </button>

          <p className='ticket__hint'>После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему контроллёру у входа в зал.</p>
          <p className='ticket__hint'>Приятного просмотра!</p>
        </div>
      </section>
    </main>
  );
};
