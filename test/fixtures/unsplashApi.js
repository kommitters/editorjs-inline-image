/**
 * Mock response from unsplash.
 */
export const unsplashReponse = {
  total: 1300,
  total_pages: 650,
  results: [
    {
      id: 'MqT0asuoIcU',
      description: 'Hawaiian Chicken PizzaSmoked',
      alt_description: 'pizza on chopping board',
      urls: {
        raw: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEzNjUwNH0',
        full: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEzNjUwNH0',
        regular: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEzNjUwNH0',
        small: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEzNjUwNH0',
        thumb: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjEzNjUwNH0',
      },
      links: {
        self: 'https://api.unsplash.com/photos/MqT0asuoIcU',
        html: 'https://unsplash.com/photos/MqT0asuoIcU',
        download: 'https://unsplash.com/photos/MqT0asuoIcU/download',
        download_location: 'https://api.unsplash.com/photos/MqT0asuoIcU/download',
      },
      user: {
        id: 'aVUNff1Ejv0',
        username: 'briewilly',
        name: 'Chad Montano',
        first_name: 'Chad',
        last_name: 'Montano',
        links: {
          self: 'https://api.unsplash.com/users/briewilly',
          html: 'https://unsplash.com/@briewilly',
          photos: 'https://api.unsplash.com/users/briewilly/photos',
          likes: 'https://api.unsplash.com/users/briewilly/likes',
          portfolio: 'https://api.unsplash.com/users/briewilly/portfolio',
          following: 'https://api.unsplash.com/users/briewilly/following',
          followers: 'https://api.unsplash.com/users/briewilly/followers',
        },
      },
    },
    {
      id: 'MQUqbmszGGM',
      description: 'heavenly slice',
      alt_description: 'pizza with berries',
      urls: {
        raw: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEzNjUwNH0',
        full: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEzNjUwNH0',
        regular: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEzNjUwNH0',
        small: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEzNjUwNH0',
        thumb: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjEzNjUwNH0',
      },
      links: {
        self: 'https://api.unsplash.com/photos/MQUqbmszGGM',
        html: 'https://unsplash.com/photos/MQUqbmszGGM',
        download: 'https://unsplash.com/photos/MQUqbmszGGM/download',
        download_location: 'https://api.unsplash.com/photos/MQUqbmszGGM/download',
      },
      user: {
        id: 'vZqSTaxc56k',
        username: 'iavnt',
        name: 'ivan Torres',
        first_name: 'ivan',
        last_name: 'Torres',
        links: {
          self: 'https://api.unsplash.com/users/iavnt',
          html: 'https://unsplash.com/@iavnt',
          photos: 'https://api.unsplash.com/users/iavnt/photos',
          likes: 'https://api.unsplash.com/users/iavnt/likes',
          portfolio: 'https://api.unsplash.com/users/iavnt/portfolio',
          following: 'https://api.unsplash.com/users/iavnt/following',
          followers: 'https://api.unsplash.com/users/iavnt/followers',
        },
      },
    },
  ],
};

/**
 * Mock parsed response.
 */
export const parsedResponse = [
  {
    url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEzNjUwNH0',
    thumb: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjEzNjUwNH0',
    downloadLocation: 'https://api.unsplash.com/photos/MqT0asuoIcU/download',
    author: 'Chad Montano',
    profileLink: 'https://unsplash.com/@briewilly',
  },
  {
    url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEzNjUwNH0',
    thumb: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjEzNjUwNH0',
    downloadLocation: 'https://api.unsplash.com/photos/MQUqbmszGGM/download',
    author: 'ivan Torres',
    profileLink: 'https://unsplash.com/@iavnt',
  },
];

/**
 * Mock empty response from unsplash.
 */
export const unsplashEmptyResponse = {
  total: 0,
  total_pages: 0,
  results: [],
};
