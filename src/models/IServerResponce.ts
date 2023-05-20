export interface AdminServerResponce {
  halls: { [key: Hall['id']]: Hall };
  hallPlaceTypePrices: { [key: HallPlaceTypePrice['id']]: HallPlaceTypePrice };
  film_sessions: { [key: FilmSession['id']]: FilmSession };
  films: { [key: Film['id']]: Film };
  place_types: { [key: PlaceType['id']]: PlaceType };
}

export interface FilmSession {
  id: number;
  start_date_time: string;
  session_minutes: number;
  film_id: number;
  hall_id: number;
}

export interface Film {
  id: number;
  name: string;
  minutes: number;
  image: string;
}

export interface Ticket {
  id: number;
  user_place_id: number;
  film_session_id: number;
  qr_code_id: number;
}

export interface HallPlaceTypePrice {
  id: number;
  hall_id: number;
  place_type_id: number;
  price: number;
}

export interface UserPlace {
  id: number;
  place_row: number;
  place_number: number;
  hall_id: number;
  place_type_id: number;
  isSelected?: boolean;
  isTaken?: boolean;
}

export interface Hall {
  id: number;
  name: string;
  rows: number;
  row_length: number;
  enabled: boolean;
  userPlaces: { [key: UserPlace['id']]: UserPlace };
}

export interface PlaceType {
  id: number;
  type: string;
  name: string;
}

export interface User {
  user: {
    id: number;
    name: string;
    email: string;
  };
  token?: string;
}
