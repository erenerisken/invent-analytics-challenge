import { useEffect, useState } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { sharedColors } from '../../util/Style';

interface SearchTextFieldProps {
  value: string;
  onSubmit: (newValue: string) => void;
}

const SearchTextField = (props: SearchTextFieldProps) => {
  const [typedValue, setTypedValue] = useState('');

  useEffect(() => {
    setTypedValue(props.value);
  }, [props.value]);

  const handleKeyDown = (e: any) => {
    if (e.code === '13' || e.keyCode === 13) {
      props.onSubmit(typedValue);
    }
  };

  return (
    <TextField
      variant='outlined'
      size='small'
      placeholder='Search'
      onChange={(e) => setTypedValue(e.target.value)}
      onKeyDown={handleKeyDown}
      value={typedValue}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <SearchIcon
              onClick={() => props.onSubmit(typedValue)}
              sx={{
                color: sharedColors.gray4,
                cursor: 'pointer',
              }}
            />
          </InputAdornment>
        ),
      }}
      sx={{ backgroundColor: sharedColors.white }}
    />
  );
};

export default SearchTextField;
