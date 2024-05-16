import { Box, Link, Typography } from '@mui/material';
import { sharedStyles } from '../../util/Style';

interface MovieDetailsEntryProps {
  title: string;
  value: string;
  link?: string;
}

const MovieDetailsEntry = (props: MovieDetailsEntryProps) => {
  return (
    <Box
      component='div'
      sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}
    >
      <Typography sx={{ ...sharedStyles.body1, fontWeight: 'bold' }}>
        {props.title}
      </Typography>
      {props.link ? (
        <Link
          href={props.link}
          target='_blank'
          rel='noopener noreferrer'
          sx={{ mt: 0.5 }}
        >
          {props.value}
        </Link>
      ) : (
        <Typography>{props.value}</Typography>
      )}
    </Box>
  );
};

export default MovieDetailsEntry;
