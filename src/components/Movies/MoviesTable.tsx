import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MovieSummary } from '../../interfaces/MovieSummary';
import { sharedColors, sharedStyles } from '../../util/Style';
import { getMovieTypeColor, getMovieTypeName } from '../utils/MovieType';
import PosterCell from './PosterCell';

interface MoviesTableProps {
  rows: MovieSummary[];
  totalCount: number;
  pageNumber: number;
  onPagination: (newPage: number) => void;
}

const MoviesTable = (props: MoviesTableProps) => {
  const navigate = useNavigate();

  return (
    <TableContainer
      component={Paper}
      sx={{
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        marginTop: 2,
        backgroundColor: sharedColors.gray1,
      }}
    >
      <Table size='small'>
        <TableHead sx={{ backgroundColor: sharedColors.gray2 }}>
          <TableRow>
            <TableCell />
            <TableCell>
              <Typography sx={sharedStyles.columnLabel}>IMDb ID</Typography>
            </TableCell>
            <TableCell>
              <Typography sx={sharedStyles.columnLabel}>Title</Typography>
            </TableCell>
            <TableCell>
              <Typography sx={sharedStyles.columnLabel}>Year</Typography>
            </TableCell>
            <TableCell>
              <Typography sx={sharedStyles.columnLabel}>Type</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => (
            <TableRow
              key={row.imdbID}
              onClick={() => navigate(`/movies/${  row.imdbID}`)}
              sx={{ cursor: 'pointer' }}
            >
              <TableCell>
                <PosterCell alt={row.title} url={row.posterUrl} />
              </TableCell>
              <TableCell>
                <Typography sx={sharedStyles.tableStringField}>
                  {row.imdbID}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography sx={sharedStyles.tableStringField}>
                  {row.title}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography sx={sharedStyles.tableStringField}>
                  {row.year}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  label={
                    <Typography sx={sharedStyles.tableStringField}>
                      {getMovieTypeName(row.type)}
                    </Typography>
                  }
                  sx={{
                    color: sharedColors.white,
                    backgroundColor: getMovieTypeColor(row.type),
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        count={props.totalCount}
        page={props.pageNumber}
        onPageChange={(_, newPage) => props.onPagination(newPage)}
        rowsPerPage={10}
        rowsPerPageOptions={[10]}
        component='div'
      />
    </TableContainer>
  );
};

export default MoviesTable;
