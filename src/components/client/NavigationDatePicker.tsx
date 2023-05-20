import React, { useEffect, useState } from 'react';
import moment, { Moment } from 'moment';
import cn from 'classnames';

import { capitalize } from '../../utils/heplers';

import 'moment/locale/ru';

interface DaysSate {
  moment: Moment;
  chosen: boolean;
}

interface NavigationDatePickerProps {
  setChosenMoment(m: Moment): void;
  chosenMoment: Moment;
}

export const NavigationDatePicker: React.FC<NavigationDatePickerProps> = ({ chosenMoment, setChosenMoment }) => {
  const [days, setDays] = useState<DaysSate[]>([]);

  const generateDays = () => {
    const arr = [];
    for (let i = 0; i < 6; i++) {
      const arrMoment = moment().add(i, 'd').locale('ru');
      arr.push({
        moment: arrMoment,
        chosen: arrMoment.isSame(chosenMoment, 'day'),
      });
    }
    return arr;
  };

  const dayClickHandler = (day: DaysSate) => {
    if (day.moment.isSame(chosenMoment, 'day')) return;

    setChosenMoment(day.moment.clone());

    setDays((oldState) => {
      const newState = oldState.map((stateDay) => {
        if (stateDay.moment.isSame(day.moment, 'day')) {
          return { ...stateDay, chosen: true };
        } else {
          return { ...stateDay, chosen: false };
        }
      });
      return newState;
    });
  };

  const nextHandler = () => {
    setDays((oldState) => {
      return oldState.map((stateDay) => {
        const newDayMoment = stateDay.moment.clone().add(1, 'd').locale('ru');
        return { moment: newDayMoment, chosen: newDayMoment.isSame(chosenMoment, 'day') };
      });
    });
  };

  const prevHandler = () => {
    setDays((oldState) => {
      return oldState.map((stateDay) => {
        const newDayMoment = stateDay.moment.clone().subtract(1, 'd').locale('ru');
        return { moment: newDayMoment, chosen: newDayMoment.isSame(chosenMoment, 'day') };
      });
    });
  };

  useEffect(() => {
    setDays(generateDays());
  }, []);

  return (
    <nav className='page-nav'>
      <button className='page-nav__day page-nav__day_prev' onClick={prevHandler}></button>
      {days.length &&
        days.map((day) => (
          <button
            onClick={() => dayClickHandler(day)}
            className={cn(
              'page-nav__day',
              { 'page-nav__day_today': day.moment.isSame(moment(), 'day') },
              { 'page-nav__day_chosen': day.chosen },
              { 'page-nav__day_weekend': Number.parseInt(day.moment.format('d'), 10) === 6 || Number.parseInt(day.moment.format('d'), 10) === 0 },
            )}
            key={day.moment.format('D')}
            type='button'>
            <span className='page-nav__day-week'>{capitalize(day.moment.format('dd'))}</span>
            <span className='page-nav__day-number'>{day.moment.format('D MMM')}</span>
          </button>
        ))}

      <button className='page-nav__day page-nav__day_next' onClick={nextHandler}></button>
    </nav>
  );
};
