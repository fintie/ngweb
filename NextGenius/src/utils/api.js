const API_BASE_URL = 'https://epipghygg9.execute-api.ap-southeast-2.amazonaws.com/prod';

export const postData = (path, data, options) => {

  let opts = Object.assign(
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      },
      options
  );

  return fetchData(path, opts);
};

export const fetchData = async (path, options) => {
  let opts = Object.assign(
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      },
      options
  );

  const response = await fetch(API_BASE_URL + path, opts);

  return response.json();

};
