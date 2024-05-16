import { FormControl, MenuItem, Select } from '@mui/material';
import { MovieType } from '../../interfaces/MovieType';
import { sharedColors } from '../../util/Style';
import { getMovieTypeName } from '../utils/MovieType';

interface MovieTypeDropdownProps {
  value?: MovieType;
  onChange: (newValue?: MovieType) => void;
}

const MovieTypeDropdown = (props: MovieTypeDropdownProps) => {
  const possibleTypes = [MovieType.MOVIE, MovieType.SERIES, MovieType.EPISODE];

  return (
    <FormControl
      size='small'
      sx={{ width: 150, backgroundColor: sharedColors.white }}
    >
      <Select
        value={props.value ?? 'ALL'}
        onChange={(e) =>
          props.onChange(
            e.target.value === 'ALL'
              ? undefined
              : (e.target.value as MovieType),
          )
        }
        name='select'
        required
      >
        <MenuItem value='ALL' key='ALL'>
          All Types
        </MenuItem>
        {possibleTypes.map((movieType) => (
          <MenuItem value={movieType} key={movieType}>
            {getMovieTypeName(movieType)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MovieTypeDropdown;
