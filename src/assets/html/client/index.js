// user interface
// данные сеансов на дату

const initSessionsDate = {
  dateTime: '2017-02-12',
  filmSession: [
    {
      startTime: '2017-02-12T09:00:00',
      sessionMinutes: 190,
      filmId: 1,
      hallId: 2,
    },
    {
      startTime: '2017-02-12T09:00:00',
      sessionMinutes: 190,
      filmId: 1,
      hallId: 2,
    },
    {
      startTime: '2017-02-12T09:00:00',
      sessionMinutes: 190,
      filmId: 1,
      hallId: 2,
    },
  ],
  films: [
    {
      id: 1,
      name: 'film',
      minutes: 190,
      imageUrl: 'https://',
    },
    {
      id: 2,
      name: 'film',
      minutes: 190,
      imageUrl: 'https://',
    },
    {
      id: 3,
      name: 'film',
      minutes: 190,
      imageUrl: 'https://',
    },
  ],
  halls: [
    {
      id: 1,
      name: 'hall 1',
    },
  ],
};

// site/order

// film_session
// GET /film_session/1

const data2 = {
  session: {
    id: 33,
    startTime: '2017-02-12T09:00:00',
    sessionMinutes: 190,
    filmId: 1,
    hallId: 2,
  },
  film: {
    id: 1,
    name: 'film',
    minutes: 190,
    imageUrl: 'https://',
  },
  hall: {
    id: 1,
    name: 'hall 1',
    rows: 5,
    rowLength: 5,
  },
  userPlases: [
    {
      id: 1,
      placeRow: 2,
      placeNum: 3,
      typeId: 'vip',
      isSold: true,
    },
    {
      id: 2,
      placeRow: 2,
      placeNum: 3,
      typeId: 'standard',
      isSold: true,
    },
    {
      id: 3,
      placeRow: 2,
      placeNum: 3,
      typeId: 'disable',
      isSold: false,
    },
    {
      id: 4,
      placeRow: 2,
      placeNum: 3,
      typeId: 'standard',
      isSold: true,
    },
  ],
  price: {
    standard: 250,
    vip: 350,
  },
};

// generate qr code POST
const body = {
  placeIds: [45, 46],
  filmSessionId: 1,
};

const data3 = {
  qrUrl: 'http://',
};

// GET api/admin/init

const data = {
  halls: [
    {
      id: 1,
      name: 'Зал 1',
      rows: 3,
      row_length: 3,
    },
    {
      id: 2,
      name: 'Зал 2',
      rows: 2,
      row_length: 2,
    },
  ],
  userPlaces: [
    {
      id: 1,
      place_row: 1,
      place_number: 1,
      hall_id: 1,
      place_type_id: 1,
    },
    {
      id: 2,
      place_row: 1,
      place_number: 2,
      hall_id: 1,
      place_type_id: 1,
    },
    {
      id: 3,
      place_row: 1,
      place_number: 3,
      hall_id: 1,
      place_type_id: 1,
    },
    {
      id: 4,
      place_row: 2,
      place_number: 1,
      hall_id: 1,
      place_type_id: 2,
    },
    {
      id: 5,
      place_row: 2,
      place_number: 2,
      hall_id: 1,
      place_type_id: 2,
    },
    {
      id: 6,
      place_row: 2,
      place_number: 3,
      hall_id: 1,
      place_type_id: 2,
    },
    {
      id: 7,
      place_row: 3,
      place_number: 1,
      hall_id: 1,
      place_type_id: 2,
    },
    {
      id: 8,
      place_row: 3,
      place_number: 2,
      hall_id: 1,
      place_type_id: 2,
    },
    {
      id: 9,
      place_row: 3,
      place_number: 3,
      hall_id: 1,
      place_type_id: 3,
    },
    {
      id: 10,
      place_row: 1,
      place_number: 1,
      hall_id: 2,
      place_type_id: 1,
    },
    {
      id: 11,
      place_row: 1,
      place_number: 2,
      hall_id: 2,
      place_type_id: 2,
    },
    {
      id: 12,
      place_row: 2,
      place_number: 1,
      hall_id: 2,
      place_type_id: 3,
    },
    {
      id: 13,
      place_row: 2,
      place_number: 2,
      hall_id: 2,
      place_type_id: 1,
    },
  ],
  hallPlaceTypePrices: [
    {
      id: 1,
      hall_id: 1,
      place_type_id: 1,
      price: 250,
    },
    {
      id: 2,
      hall_id: 1,
      place_type_id: 2,
      price: 350,
    },
    {
      id: 3,
      hall_id: 2,
      place_type_id: 1,
      price: 550,
    },
    {
      id: 4,
      hall_id: 2,
      place_type_id: 2,
      price: 1250,
    },
  ],
  film_sessions: [],
  films: [
    {
      id: 1,
      name: 'Мой ужасный сосед (2022)',
      minutes: 190,
      imageUrl:
        'https://2023-lu2.lordfilm7.link/uploads/posts/2023-01/1673206696-1819219271.webp',
    },
    {
      id: 2,
      name: 'Джон Уик 4 (2023)',
      minutes: 160,
      imageUrl:
        'https://2023-lu2.lordfilm7.link/uploads/posts/2023-03/1678136665-462888459.webp',
    },
    {
      id: 3,
      name: 'Аферисты (2023)',
      minutes: 120,
      imageUrl:
        'https://2023-lu2.lordfilm7.link/uploads/posts/2023-02/1676566870-346360807.webp',
    },
  ],
};

// POST admin/hall
const h = {
  name: 'hall 3',
  rows: 5,
  row_length: 5,
  userPlaces: [
    {
      id: 1,
      place_row: 1,
      place_number: 1,
      hall_id: 1,
      place_type_id: 1,
    },
    {
      id: 2,
      place_row: 1,
      place_number: 2,
      hall_id: 1,
      place_type_id: 1,
    },
    {
      id: 3,
      place_row: 1,
      place_number: 3,
      hall_id: 1,
      place_type_id: 1,
    },
  ],
};
// return
// {
//   id: 3,
// }

// POST admin/hall-place-type-price
const p = [
  {
    hall_id: 3,
    place_type_id: 1,
    price: 250,
  },
  {
    hall_id: 3,
    place_type_id: 2,
    price: 350,
  },
];
// return true;

// POST admin/film
const f = {
  name: 'Мой ужасный сосед (2022)',
  minutes: 190,
  image: 'file',
};
// return
// {
//   id: 5
//   name: 'Мой ужасный сосед (2022)',
//   minutes: 190,
//   imageUrl: 'https://localhost:8000/upload/image.jpg',
// }

// POST admin/film-sessions
const fs = {
  data: [
    {
      startTime: '2017-02-12 09:00:00',
      sessionMinutes: 120,
      filmId: 1,
      hallId: 2,
    },
    {
      startTime: '2017-02-12 12:00:00',
      sessionMinutes: 160,
      filmId: 1,
      hallId: 2,
    },
    {
      startTime: '2017-02-12 16:00:00',
      sessionMinutes: 190,
      filmId: 1,
      hallId: 2,
    },
  ],
};
