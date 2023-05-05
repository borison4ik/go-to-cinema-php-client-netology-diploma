import React from 'react';

import { Hall } from '../../../models/IServerResponce';
import { useAppSelector } from '../../../hooks/redux';
import { MatrixItem, tempUserPlace } from './ConfigureHalls';

interface SchemaUserPlacesProps {
  activeHall: Hall;
  matrix: MatrixItem[];
  setMatrix(matrix: MatrixItem[]): void;
}

export const SchemaUserPlaces: React.FC<SchemaUserPlacesProps> = ({ matrix, setMatrix }) => {
  const { place_types: placeTypes } = useAppSelector((state) => state.placeTypesSlice);

  function changeMartix(matrix: MatrixItem[], activePlace: tempUserPlace) {
    const clonedMatrix = structuredClone(matrix);

    for (let i = 0; i < clonedMatrix.length; i++) {
      for (let j = 0; j < clonedMatrix[i].places.length; j++) {
        if (clonedMatrix[i].places[j].id === activePlace.id) {
          clonedMatrix[i].places[j] = {
            ...activePlace,
            place_type_id: changePlaceType(activePlace),
          };
        }
      }
    }

    return clonedMatrix;
  }

  function onPlaceClickHandler(place: tempUserPlace) {
    setMatrix(changeMartix(matrix, place));
  }

  function getPlaceType(place: tempUserPlace): string {
    if (placeTypes) {
      return placeTypes[place.place_type_id].type;
    }
    return 'disabled';
  }

  function changePlaceType(place: tempUserPlace) {
    const activeTypeId = place.place_type_id;

    if (activeTypeId < Object.values(placeTypes).length) {
      return activeTypeId + 1;
    } else {
      return 1;
    }
  }

  return (
    <>
      <div className='conf-step__legend'>
        <span className='conf-step__chair conf-step__chair_standart'></span> — обычные кресла
        <span className='conf-step__chair conf-step__chair_vip'></span> — VIP кресла
        <span className='conf-step__chair conf-step__chair_disabled'></span> — заблокированные (нет кресла)
        <p className='conf-step__hint'>Чтобы изменить вид кресла, нажмите по нему левой кнопкой мыши</p>
      </div>
      <div className='conf-step__hall'>
        <div className='conf-step__hall-wrapper'>
          {matrix &&
            matrix.length > 0 &&
            matrix.map((row) => (
              <div className='conf-step__row' key={row.id}>
                {row.places.map((place) => (
                  <span
                    className={`conf-step__chair conf-step__chair_${getPlaceType(place)}`}
                    key={place.id}
                    onClick={() => {
                      onPlaceClickHandler(place);
                    }}></span>
                ))}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
