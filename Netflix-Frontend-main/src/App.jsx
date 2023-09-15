import React from 'react'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Login from './pages/Login';
import Signup from './pages/Signup'
import Netflix from './pages/Netflix';
import Movies from "./pages/Movies";
import Player from './pages/Player';
import UserListedMovies from './pages/UserListedMovies';
import TVShows from './pages/TVShows';
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/login" element={<Login/>} />
      <Route exact path="/" element={<Signup/>} />
      <Route exact path='/player' element={<Player />} />
      <Route exact path="/movies" element={<Movies/>} />
      <Route exact path="/tv" element={<TVShows />} />
      <Route exact path="/new" element={<Player />} />
      <Route exact path="/home" element={<Netflix/>} />
      <Route exact path="/mylist" element={<UserListedMovies />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App