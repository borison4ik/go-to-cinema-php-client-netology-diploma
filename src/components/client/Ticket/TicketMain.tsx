import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux';
import moment from 'moment';

export const TicketMain = () => {
  const { selectedPlaces } = useAppSelector((state) => state.SelectedClientPlacesSlice);
  const { session } = useAppSelector((state) => state.SelectedClientFilmSessionSlice);
  const { halls } = useAppSelector((state) => state.hallReducer);
  const { films } = useAppSelector((state) => state.filmSlice);
  const { tickets, qrUrl } = useAppSelector((state) => state.ClientTicketsSlice);

  if (!session || !tickets.length) return <Navigate to='/' replace={true} />;

  return (
    <main>
      <section className='ticket'>
        <header className='tichet__check'>
          <h2 className='ticket__check-title'>Электронный билет</h2>
        </header>

        <div className='ticket__info-wrapper'>
          <p className='ticket__info'>
            На фильм: <span className='ticket__details ticket__title'>{films[session.film_id].name}</span>
          </p>
          <p className='ticket__info'>
            Места:{' '}
            <span className='ticket__details ticket__chairs'>
              {[...selectedPlaces].reverse().map((place) => (
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

          {qrUrl && <img className='ticket__info-qr' src={qrUrl} alt='ticket qr code' />}

          <p className='ticket__hint'>Покажите QR-код нашему контроллеру для подтверждения бронирования.</p>
          <p className='ticket__hint'>Приятного просмотра!</p>
        </div>
      </section>
    </main>
  );
};
