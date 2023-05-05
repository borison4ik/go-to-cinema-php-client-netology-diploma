export const callToServer = async (url: string, param: { [key: string]: String }, method: string = 'GET', body: any = {}) => {
  let query = '';
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  let options = {
    headers,
    method,
  };

  if (Object.keys(body).length) {
    options = Object.assign(options, { body: JSON.stringify(body) });
  }

  if (param) {
    query += '?';

    Object.entries(param).forEach(([key, value]) => {
      query += `${key}=${value}`;
    });
  }

  try {
    const response = await fetch(`${process.env.REACT_APP_ADMIN_URL}/${url + query}`, options);

    if (!response.ok) {
      throw new Error('Ошибка сервера =(');
    }

    const data = await response.json();

    return data;
  } catch (e: ErrorConstructor | any) {
    console.log(e.message);
  }
};
