import { Box, Paper, Typography } from '@mui/material';
import { sharedStyles } from '../../util/Style';

const MoviesPage = () => {
  return (
    <Box component='div'>
      <Paper sx={sharedStyles.pageHeader}>
        <Typography sx={sharedStyles.h3}>Movies</Typography>
      </Paper>
    </Box>
  );
};

export default MoviesPage;
