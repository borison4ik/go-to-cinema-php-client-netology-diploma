import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { useAppSelector } from '../../hooks/redux';
import { Film, FilmSession, Hall } from '../../models/IServerResponce';
import moment, { Moment } from 'moment';

interface List {
  id: number;
  film: Film;
  sessionCollection: { [key: Hall['id']]: FilmSession[] };
}

interface ScheduleProps {
  chosenMoment: Moment;
}

export const Schedule: React.FC<ScheduleProps> = ({ chosenMoment }) => {
  const { filmSessions } = useAppSelector((state) => state.sessionFilmForDateSlice);
  const { films } = useAppSelector((state) => state.filmSlice);
  const { halls } = useAppSelector((state) => state.hallReducer);
  const [list, setList] = useState<List[]>([]);

  const getMappedList = (): List[] => {
    if (Object.values(filmSessions).length) {
      const list = Object.values(filmSessions).reduce((acc: { [key: List['id']]: List }, session) => {
        if (!halls[session.hall_id].enabled) return acc;

        const film = films[session.film_id];

        if (!acc[session.film_id]) {
          acc[session.film_id] = {
            id: film.id,
            film,
            sessionCollection: {},
          };
          acc[session.film_id].sessionCollection[session.hall_id] = [session];
        } else if (acc[session.film_id] && !acc[session.film_id].sessionCollection[session.hall_id]) {
          acc[session.film_id].sessionCollection[session.hall_id] = [session];
        } else {
          acc[session.film_id].sessionCollection[session.hall_id].push(session);
        }
        return acc;
      }, {});

      return Object.values(list);
    }
    return [];
  };

  useEffect(() => {
    setList(getMappedList());
  }, []);

  return (
    <>
      {!list.length ? (
        <section className='movie empty-sessions'>
          <h2>На выбранную вами дату в нашем кинотеатре нет сеансов</h2>
          <p>Пожалуйста попробуйте выбрать другую дату</p>
        </section>
      ) : (
        list.map((listItem) => (
          <section className={cn('movie', { 'movie-disabled': !chosenMoment.isSameOrAfter(moment(), 'day') })} key={listItem.id}>
            <div className='movie__info'>
              <div className='movie__poster'>
                <img className='movie__poster-image' alt={listItem.film.name} src={listItem.film.image} />
              </div>
              <div className='movie__description'>
                <h2 className='movie__title'>{listItem.film.name}</h2>
                <p className='movie__synopsis'>Две сотни лет назад малороссийские хутора разоряла шайка нехристей-ляхов во главе с могущественным колдуном.</p>
                <p className='movie__data'>
                  <span className='movie__data-duration'>{listItem.film.minutes} минут</span>
                  <span className='movie__data-origin'>США</span>
                </p>
              </div>
            </div>
            {Object.values(halls).map((hall) =>
              hall.enabled && listItem.sessionCollection[hall.id] && listItem.sessionCollection[hall.id].length ? (
                <div className='movie-seances__hall' key={hall.id}>
                  <h3 className='movie-seances__hall-title'>{hall.name}</h3>
                  <ul className='movie-seances__list'>
                    {listItem.sessionCollection[hall.id].map((session) => (
                      <li className='movie-seances__time-block' key={session.id}>
                        <Link className='movie-seances__time' to={`/order/${session.id}`}>
                          {moment(session.start_date_time).format('HH:mm')}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <React.Fragment key={hall.id}></React.Fragment>
              ),
            )}
          </section>
        ))
      )}
    </>
  );
};
