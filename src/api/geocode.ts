import got from 'got';

const geocode = (search: string) => {
  return got(`https://geocode.xyz/${search}`, {
    searchParams: {
      json: 1,
    },
    responseType: 'json',
  }).then((response: any) => response.body);
};

export { geocode };
