export const getStartTime = (dateTime: string) => {
  const date = new Date(dateTime);
  return [date.getHours(), date.getMinutes()];
};

export const formatTime = (time: number[]): string => {
  const [h, m] = time;
  const hour = h < 10 ? '0' + h : h;
  const min = m < 10 ? '0' + m : m;
  const str = `${hour}:${min}`;
  return str;
};

export const getfilmColor = (id: number) => {
  const filmEl = document.querySelector(`[data-film-id="${id}"]`);
  if (filmEl) {
    return window.getComputedStyle(filmEl, null).getPropertyValue('background-color');
  }
  return '#ffeb85';
};

export const formatDate = (date: Date): string => {
  return `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`;
};

export const getToken = () => {
  return JSON.parse(localStorage.getItem('user') || '{"token": ""}')?.token;
};
