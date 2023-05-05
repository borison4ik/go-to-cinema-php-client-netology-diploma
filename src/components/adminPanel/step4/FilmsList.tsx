import React from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { fechDeleteFilm } from '../../../store/reducers/ActionCreators';

export const FilmsList = () => {
  const dispatch = useAppDispatch();
  const { films } = useAppSelector((state) => state.filmSlice);

  const deleteFilmHandler = (id: number) => {
    dispatch(fechDeleteFilm(id));
  };

  return (
    <>
      <div className='conf-step__movies'>
        {Object.values(films || {}).map((film) => (
          <div className='conf-step__movie' key={film.id} data-film-id={film.id}>
            <div className='conf-step__movie-delete'>
              <button className='conf-step__button conf-step__button-trash' onClick={() => deleteFilmHandler(film.id)}></button>
            </div>
            <img className='conf-step__movie-poster' alt='poster' src={film.image} />
            <h3 className='conf-step__movie-title'>{film.name}</h3>
            <p className='conf-step__movie-duration'>{film.minutes} минут</p>
          </div>
        ))}
      </div>
    </>
  );
};
