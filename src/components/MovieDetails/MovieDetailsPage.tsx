import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'material-react-toastify';
import { Box, Button, Paper, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import StarIcon from '@mui/icons-material/Star';
import { MovieDetails } from '../../interfaces/MovieDetails';
import { getMovieDetails } from '../../services/OMDb';
import Waiting from '../Misc/Waiting';
import { sharedStyles } from '../../util/Style';
import { getMovieTypeName } from '../utils/MovieType';
import { MovieType } from '../../interfaces/MovieType';
import MovieDetailsEntry from './MovieDetailsEntry';

const MovieDetailsPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [movieDetails, setMovieDetails] = useState<MovieDetails | undefined>(
    undefined,
  );
  const [validPoster, setValidPoster] = useState(true);

  const { imdbID } = useParams<string>();

  useEffect(() => {
    if (imdbID) {
      setLoading(true);
      getMovieDetails(imdbID)
        .then((details) => setMovieDetails(details))
        .catch((err) => toast.error(err.message))
        .finally(() => setLoading(false));
    }
  }, [imdbID]);

  useEffect(() => {
    setValidPoster(true);
  }, [movieDetails]);

  const getSubtitle = (): string => {
    if (!movieDetails) {
      return '';
    }

    const parts: string[] = [
      getMovieTypeName(movieDetails.type),
      movieDetails.genre,
      movieDetails.year,
    ];
    if (movieDetails.type === MovieType.MOVIE) {
      parts.push(movieDetails.runtime);
    }

    return parts.join(' • ');
  };

  return (
    <Box component='div'>
      <Waiting open={loading} />
      {movieDetails ? (
        <Box component='div'>
          <Paper sx={{ ...sharedStyles.pageHeader, alignItems: 'center' }}>
            <Box
              component='div'
              sx={{ display: 'flex', flexDirection: 'column' }}
            >
              <Button
                startIcon={<ChevronLeftIcon />}
                onClick={() => navigate('/')}
                sx={{ ...sharedStyles.buttonText, width: 'fit-content', p: 0 }}
              >
                Back to Main Page
              </Button>
              <Typography sx={sharedStyles.h3}>{movieDetails.title}</Typography>
              <Typography sx={{ ...sharedStyles.subtitle2 }}>
                {getSubtitle()}
              </Typography>
            </Box>
            <Box component='div' sx={{ flexGrow: 1 }} />
            <StarIcon fontSize='large' color='primary' />
            <Box
              component='div'
              sx={{ display: 'flex', flexDirection: 'column' }}
            >
              <Typography
                sx={{ fontWeight: 'bold' }}
              >{`${movieDetails.imdbRating}/10`}</Typography>
              <Typography sx={{ ...sharedStyles.overline, mt: -0.5 }}>
                {`${movieDetails.imdbVotes} votes`}
              </Typography>
            </Box>
          </Paper>
          <Box component='div' sx={sharedStyles.pageBody}>
            <Box
              component='div'
              sx={{
                display: 'flex',
                flexGrow: 1,
                flexDirection: 'row',
              }}
            >
              {validPoster && (
                <Box
                  component='img'
                  alt={movieDetails.title}
                  src={movieDetails.posterUrl}
                  onError={() => setValidPoster(false)}
                  sx={{ minWidth: '25%', maxWidth: '30%', height: 'auto' }}
                />
              )}
              <Box
                component='div'
                sx={{ display: 'flex', flexDirection: 'column', ml: 2.5 }}
              >
                <MovieDetailsEntry
                  title='Country'
                  value={movieDetails.country}
                />
                <MovieDetailsEntry
                  title='Language'
                  value={movieDetails.language}
                />
                <MovieDetailsEntry title='Writer' value={movieDetails.writer} />
                <MovieDetailsEntry title='Cast' value={movieDetails.actors} />
                <MovieDetailsEntry title='Plot' value={movieDetails.plot} />
                <MovieDetailsEntry
                  title='More Info'
                  value='IMDb Page'
                  link={`https://www.imdb.com/title/${imdbID}`}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        !loading && (
          <Box
            sx={{
              display: 'flex',
              flexGrow: 1,
              flexDirection: 'column',
              alignItems: 'center',
              pt: 15,
            }}
          >
            <Typography>Movie not found</Typography>
            <Button onClick={() => navigate('/')} sx={sharedStyles.buttonText}>
              Back to Main Page
            </Button>
          </Box>
        )
      )}
    </Box>
  );
};

export default MovieDetailsPage;
