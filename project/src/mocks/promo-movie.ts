import { IMovie } from '../types/Movie';

export const promoMovie: IMovie = {
  id: 7,
  name: 'Fantastic Beasts: The Crimes of Grindelwald',
  posterImage: 'img/the-grand-budapest-hotel-poster.jpg',
  previewImage: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
  backgroundImage: 'img/bg-the-grand-budapest-hotel-bg.jpg',
  backgroundColor: '#ffffff',
  videoLink: 'https://some-link',
  previewVideoLink: 'https://some-link',
  description: 'In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave\'s friend and protege.',
  rating: 8.9,
  scoresCount: 240,
  director: 'Wes Anderson',
  starring: [
    'Bill Murray'
  ],
  runTime: 99,
  genre: 'Comedy',
  released: 2018,
  isFavorite: false
};
