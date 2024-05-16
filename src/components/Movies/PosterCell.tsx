import { useState } from 'react';
import { Box, Tooltip } from '@mui/material';

interface PosterCellProps {
  alt: string;
  url: string;
}

const PosterCell = (props: PosterCellProps) => {
  const [valid, setValid] = useState(true);

  return valid ? (
    <Tooltip
      title={
        <Box
          component='img'
          alt={props.alt}
          src={props.url}
          sx={{ height: 350, width: 'auto', borderRadius: 1, m: -1 }}
        />
      }
    >
      <Box
        component='img'
        alt={props.alt}
        src={props.url}
        onError={() => setValid(false)}
        sx={{ height: 50, width: 35, borderRadius: 1 }}
      />
    </Tooltip>
  ) : (
    <></>
  );
};

export default PosterCell;
