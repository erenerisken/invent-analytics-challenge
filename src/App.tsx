import React from 'react';
import './App.css';
import { Box } from '@mui/material';
import { ToastContainer } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import MoviesPage from './components/Movies/MoviesPage';
import MovieDetailsPage from './components/MovieDetails/MovieDetailsPage';

const App = () => {
  return (
    <Box component='div'>
      <ToastContainer
        position='top-center'
        autoClose={6000}
        hideProgressBar={false}
        newestOnTop
        rtl={false}
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path='/movies/:imdbID' element={<MovieDetailsPage />} />
        <Route path='/movies/*' element={<MoviesPage />} />
        <Route path='*' element={<Navigate to='/movies' replace />} />
      </Routes>
    </Box>
  );
};

export default App;
