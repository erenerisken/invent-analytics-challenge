import { MovieType } from '../../interfaces/MovieType';
import { sharedColors } from '../../util/Style';

export const getMovieTypeName = (movieType: MovieType): string => {
  switch (movieType) {
    case MovieType.MOVIE:
      return 'Movie';
    case MovieType.EPISODE:
      return 'Episode';
    case MovieType.SERIES:
      return 'Series';
    default:
      return 'Other';
  }
};

export const getMovieTypeColor = (movieType: MovieType): string => {
  switch (movieType) {
    case MovieType.MOVIE:
      return sharedColors.primaryDark;
    case MovieType.EPISODE:
      return sharedColors.statusRed;
    case MovieType.SERIES:
      return sharedColors.statusGreen;
    default:
      return sharedColors.gray6;
  }
};
