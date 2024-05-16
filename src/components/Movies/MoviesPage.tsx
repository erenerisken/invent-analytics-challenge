import { Box, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'material-react-toastify';
import { sharedStyles } from '../../util/Style';
import { MoviesFilter } from '../../interfaces/MoviesFilter';
import MoviesTable from './MoviesTable';
import { MovieSummariesResponse } from '../../interfaces/MovieSummariesResponse';
import Waiting from '../Misc/Waiting';
import { getMovieSummaries } from '../../services/OMDb';
import SearchTextField from './SearchTextField';
import MovieTypeDropdown from './MovieTypeDropdown';
import YearDropdown from './YearDropdown';

const MoviesPage = () => {
  const [filters, setFilters] = useState<MoviesFilter>({
    name: 'Pokemon',
    page: 0,
  });
  const [moviesResponse, setMoviesResponse] = useState<MovieSummariesResponse>({
    summaries: [],
    totalResults: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getMovieSummaries(filters)
      .then((res) => setMoviesResponse(res))
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  }, [filters]);

  return (
    <Box component='div'>
      <Waiting open={loading} />
      <Paper sx={sharedStyles.pageHeader}>
        <Typography sx={sharedStyles.h3}>Movies</Typography>
      </Paper>
      <Box component='div' sx={sharedStyles.pageBody}>
        <Box
          component='div'
          sx={{
            display: 'flex',
            flexGrow: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
        >
          <SearchTextField
            value={filters.name}
            onSubmit={(newValue) =>
              setFilters({ ...filters, name: newValue, page: 0 })
            }
          />
          <Box component='div' sx={{ mr: 1.5 }} />
          <MovieTypeDropdown
            value={filters.type}
            onChange={(newValue) =>
              setFilters({ ...filters, type: newValue, page: 0 })
            }
          />
          <Box component='div' sx={{ mr: 1.5 }} />
          <YearDropdown
            value={filters.year}
            onChange={(newValue) =>
              setFilters({ ...filters, year: newValue, page: 0 })
            }
          />
        </Box>
        <MoviesTable
          rows={moviesResponse.summaries}
          totalCount={moviesResponse.totalResults}
          pageNumber={filters.page}
          onPagination={(newPage) => setFilters({ ...filters, page: newPage })}
        />
      </Box>
    </Box>
  );
};

export default MoviesPage;
