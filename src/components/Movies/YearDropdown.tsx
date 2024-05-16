import { FormControl, MenuItem, Select } from '@mui/material';
import { getYearOptions } from '../utils/Year';
import { sharedColors } from '../../util/Style';

interface YearDropdownProps {
  value?: number;
  onChange: (newValue?: number) => void;
}

const YearDropdown = (props: YearDropdownProps) => {
  const options = getYearOptions();

  return (
    <FormControl
      size='small'
      sx={{ width: 150, backgroundColor: sharedColors.white }}
    >
      <Select
        value={props.value ?? -1}
        onChange={(e) =>
          props.onChange(
            e.target.value < 0 ? undefined : (e.target.value as number),
          )
        }
        name='select'
        required
      >
        <MenuItem value={-1} key={-1}>
          All Years
        </MenuItem>
        {options.map((year) => (
          <MenuItem value={year} key={year}>
            {year.toString()}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default YearDropdown;
