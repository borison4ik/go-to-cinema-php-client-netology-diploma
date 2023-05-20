import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../hooks/redux';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import { FilmsList } from './FilmsList';
import { SessionList } from './SessionList';
import { AddFilm } from './AddFilm';
import { formatDate } from '../../../utils/helpers';
import { FilmSession } from '../../../models/IServerResponce';
import { api } from '../../../API/callToServer';
import { AddFilmSession, SubmitForm } from './AddFilmSession';
import { Button } from '../../common/Button';
import { Store } from 'react-notifications-component';

export const FilmSessionsConfiguration = () => {
  const { films, isLoading } = useAppSelector((state) => state.filmSlice);
  const [mapedSessions, setMapedSessions] = useState<{ [key: number]: FilmSession[] }>({});
  const [sessionDate, setSessionDate] = useState(new Date());
  const [isSending, setIsSending] = useState(false);
  const [isSessionLoading, setIsSessionLoadind] = useState(false);

  const resetHandler = async () => {
    const searchParams = new URLSearchParams();
    searchParams.append('date', formatDate(sessionDate));

    const response = await api.get('film-sessions', { params: searchParams });
    setMapedSessions(getMapedData(response.data));
  };

  const saveHandler = async () => {
    const allSessionsArrs = Object.values(mapedSessions);
    const dataToServer = allSessionsArrs.reduce((acc: FilmSession[], hallArray) => {
      hallArray.forEach((s) => acc.push(s));
      return acc;
    }, []);
    setIsSending(true);
    await api.post('admin/film-sessions', dataToServer);
    Store.addNotification({
      title: 'Ура!',
      message: 'Расписание сохранено успешно!',
      type: 'success',
      insert: 'top',
      container: 'top-right',
      dismiss: {
        duration: 2000,
        onScreen: true,
      },
    });
    setIsSending(false);
  };

  const onDateChangeHandler = (date: Date) => {
    setSessionDate(date);
  };

  const getMapedData = (sessions: { [key: FilmSession['id']]: FilmSession }) => {
    return Object.values(sessions).reduce((acc: any, session) => {
      if (!acc[session.hall_id]) {
        acc[session.hall_id] = [];
      }
      acc[session.hall_id].push(session);
      return acc;
    }, {});
  };

  const onComplitSessionHandler = (obj: SubmitForm) => {
    const newSession: FilmSession = {
      id: 0,
      film_id: +obj.film,
      hall_id: +obj.hall,
      session_minutes: films[+obj.film].minutes,
      start_date_time: formatDate(sessionDate) + ' ' + obj.start_time,
    };

    if (!mapedSessions.hasOwnProperty(+obj.hall)) {
      setMapedSessions((oldState) => {
        return { ...oldState, [+obj.hall]: [newSession] };
      });
    } else {
      setMapedSessions((oldState) => {
        return { ...oldState, [+obj.hall]: [...oldState[+obj.hall], newSession] };
      });
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams();
    searchParams.append('date', formatDate(sessionDate));

    setIsSessionLoadind(true);
    api.get('film-sessions', { params: searchParams }).then((sessions) => {
      setIsSessionLoadind(false);
      setMapedSessions(getMapedData(sessions.data));
    });
  }, [sessionDate]);

  if (isLoading) return <h1>Загрузка ...</h1>;

  return (
    <>
      <div className='conf-step__flex-wrapper'>
        <div>
          <AddFilm />
        </div>
        <div>
          <AddFilmSession onComplite={onComplitSessionHandler} />
        </div>
        <div className='conf-step__date-paragraph'>
          <label>Дата сеансов:</label>
          <DatePicker selected={sessionDate} onChange={onDateChangeHandler} />
        </div>
      </div>
      <FilmsList />
      {isSessionLoading ? (
        <div className='conf-step__seances-movie-empty'>
          <h1>Загрузка ...</h1>
        </div>
      ) : (
        <SessionList sessions={mapedSessions} />
      )}
      <fieldset className='conf-step__buttons text-center'>
        <Button name='Отмена' btnStyle='regular' clickHandler={resetHandler} disabled={isSending} />
        <Button name='Сохранить' btnStyle='accent' clickHandler={saveHandler} disabled={isSending} />
      </fieldset>
    </>
  );
};
