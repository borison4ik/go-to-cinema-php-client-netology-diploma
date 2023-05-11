import React from 'react';

import { FilmSession } from '../../../models/IServerResponce';
import { useAppSelector } from '../../../hooks/redux';
import { formatTime, getStartTime, getfilmColor } from '../../../utils/heplers';

interface SessionDateProps {
  sessions: { [key: number]: FilmSession[] };
}
const step = 30;

export const SessionList: React.FC<SessionDateProps> = ({ sessions }) => {
  const { halls } = useAppSelector((state) => state.hallReducer);
  const { films } = useAppSelector((state) => state.filmSlice);

  const deleteSessionHandler = (id: number) => {
    console.log('id', id); // удаление сеансов под вопросом так как на них будут куплены билеты
  };

  return (
    <>
      <div className='conf-step__seances'>
        {Object.entries(films).length && Object.entries(sessions).length ? (
          Object.entries(sessions).map(([key, value]) => (
            <div className='conf-step__seances-hall' key={key}>
              <h3 className='conf-step__seances-title'>{halls[parseInt(key, 10)].name}</h3>
              <div className='conf-step__seances-timeline'>
                {Object.values(value || {}).map((session) => (
                  <div
                    className='conf-step__seances-movie'
                    title={films[session.film_id].name}
                    key={session.film_id + '-' + session.hall_id + '-' + session.start_date_time}
                    style={{
                      width: `${(session.session_minutes / 60) * step}px`,
                      backgroundColor: getfilmColor(session.film_id),
                      left: (getStartTime(session.start_date_time)[0] + 1 / (60 / getStartTime(session.start_date_time)[1])) * step,
                    }}>
                    <div className='conf-step__session-delete'>
                      <button className='conf-step__button conf-step__button-trash' onClick={() => deleteSessionHandler(session.id)}></button>
                    </div>
                    <p className='conf-step__seances-movie-title'>{films[session.film_id].name}</p>
                    <p className='conf-step__seances-movie-start'>{formatTime(getStartTime(session.start_date_time))}</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className='conf-step__seances-movie-empty'>
            <p>На выбранную дату сеансы фильмов отсутствуют.</p>
            <p>Выберите другую дату или добавьте сеансы и сохраните расписание.</p>
          </div>
        )}
      </div>
    </>
  );
};
