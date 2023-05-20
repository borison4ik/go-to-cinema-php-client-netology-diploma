import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { FilmSession, PlaceType, Ticket, UserPlace } from '../../../models/IServerResponce';
import { selectedClientPlacesSlice } from '../../../store/reducers/SelectedClientPlacesSlice';
import { CLIENT_PLACE_TYPES } from '../../../models/constants';

export interface MatrixClienHallItem {
  id: number;
  places: UserPlace[];
}

interface BuyingSchemeProps {
  session: FilmSession;
  tickets: { [key: Ticket['id']]: Ticket };
}

export const BuyingScheme: React.FC<BuyingSchemeProps> = ({ session, tickets }) => {
  const dispatch = useAppDispatch();
  const { halls } = useAppSelector((state) => state.hallReducer);
  const { place_types } = useAppSelector((state) => state.placeTypesSlice);
  const [matrix, setMatrix] = useState<MatrixClienHallItem[]>([]);
  const { add, remove } = selectedClientPlacesSlice.actions;

  const HALL = halls[session.hall_id];

  const checkHasTicket = (place: UserPlace) => {
    return Object.values(tickets).some((v) => v.user_place_id === place.id);
  };

  const getPlaceType = (place: UserPlace): string => {
    if (place.isTaken) {
      return CLIENT_PLACE_TYPES.taken;
    } else if (place.isSelected) {
      return CLIENT_PLACE_TYPES.selected;
    }
    return place_types[place.place_type_id].type;
  };

  const getMatrix = (): MatrixClienHallItem[] => {
    const temp: MatrixClienHallItem[] = [];

    const userPlaceArray = Object.values(halls[session.hall_id].userPlaces);

    for (let r = 1; r <= HALL.rows; r++) {
      const matrixRow: { id: number; places: UserPlace[] } = {
        id: r,
        places: [],
      };

      for (let l = 1; l <= HALL.row_length; l++) {
        const up = userPlaceArray.find((place) => place.place_row === r && place.place_number === l);
        if (up) {
          matrixRow.places.push({ ...up, isSelected: false, isTaken: checkHasTicket(up) });
        }
      }

      temp.push(matrixRow);
    }

    return temp;
  };

  const changeMatrix = (matrix: MatrixClienHallItem[], clickedPlace: UserPlace): MatrixClienHallItem[] => {
    const clonedMatrix = structuredClone(matrix);

    for (let i = 0; i < clonedMatrix.length; i++) {
      for (let j = 0; j < clonedMatrix[i].places.length; j++) {
        if (clonedMatrix[i].places[j].id === clickedPlace.id) {
          clonedMatrix[i].places[j] = {
            ...clickedPlace,
            isSelected: !clickedPlace.isSelected,
          };
        }
      }
    }

    return clonedMatrix;
  };

  const onPlaceClickHandler = (place: UserPlace) => {
    if (place_types[place.place_type_id].type === CLIENT_PLACE_TYPES.disabled) return;
    if (!place.isSelected) {
      dispatch(add({ ...place, isSelected: true }));
    } else {
      dispatch(remove(place));
    }
    setMatrix(changeMatrix(matrix, place));
  };

  useEffect(() => {
    setMatrix(getMatrix());
  }, []);

  return (
    <div className='buying-scheme'>
      {matrix.length && (
        <div className='buying-scheme__wrapper'>
          {matrix.map((item) => (
            <div className='buying-scheme__row' key={item.id}>
              {item.places.map((place) => (
                <span className={`buying-scheme__chair buying-scheme__chair_${getPlaceType(place)}`} onClick={() => onPlaceClickHandler(place)} key={place.id}></span>
              ))}
            </div>
          ))}
        </div>
      )}
      <div className='buying-scheme__legend'>
        <div className='col'>
          <p className='buying-scheme__legend-price'>
            <span className='buying-scheme__chair buying-scheme__chair_standart'></span> Свободно (<span className='buying-scheme__legend-value'>250</span>руб)
          </p>
          <p className='buying-scheme__legend-price'>
            <span className='buying-scheme__chair buying-scheme__chair_vip'></span> Свободно VIP (<span className='buying-scheme__legend-value'>350</span>руб)
          </p>
        </div>
        <div className='col'>
          <p className='buying-scheme__legend-price'>
            <span className='buying-scheme__chair buying-scheme__chair_taken'></span> Занято
          </p>
          <p className='buying-scheme__legend-price'>
            <span className='buying-scheme__chair buying-scheme__chair_selected'></span> Выбрано
          </p>
        </div>
      </div>
    </div>
  );
};
