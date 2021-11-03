const request = (endpoint: string, method: 'get' | 'post', data: any) => {
  return fetch(
    `${import.meta.env.VITE_API_URL}${
      endpoint.startsWith('/') ? '' : '/'
    }${endpoint}`,
    {
      method,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }
  ).then((response) => response.json());
};

export { request };
