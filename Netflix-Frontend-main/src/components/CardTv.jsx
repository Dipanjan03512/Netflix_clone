import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoPlayCircleSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BiChevronDown } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useDispatch } from "react-redux";
import { removeMovieFromLiked } from "../store";
import ReactPlayer from 'react-player';

export default React.memo(function CardTv({ type ="tv", index, movieData, isLiked = false }) {

  const MOVIE_API = "https://api.themoviedb.org/3/"
  const SEARCH_API = MOVIE_API + "search/movie"
  const DISCOVER_API = MOVIE_API + "discover/movie"
  const API_KEY = "3d39d6bfe362592e6aa293f01fbcf9b9"

  const [playing, setPlaying] = useState(false)
  const [trailer, setTrailer] = useState([])
  const [movies, setMovies] = useState([])
  const [searchKey, setSearchKey] = useState("")
  const [movie, setMovie] = useState({title: "Loading Movies"})

  useEffect(() => {
      fetchMovies()
  }, [])

  const fetchMovies = async (event) => {
      if (event) {
          event.preventDefault()
      }

      const {data} = await axios.get(`${searchKey ? SEARCH_API : DISCOVER_API}`, {
          params: {
              api_key: API_KEY,
              query: searchKey
          }
      })
      setMovies(data.results)
      setMovie(data.results[0])

      if (data.results.length) {
          await fetchMovie(data.results[0].id)
      }
  }
  const fetchMovie = async (id) => {
      const {data} = await axios.get(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${API_KEY}&language=en-US`)

      setTrailer(data.results[0]?.key);
      setMovie(data)
  }
  const selectMovie = (movie) => {
    fetchMovie(movie.id)
    setPlaying(false)
    setMovie(movie)
}
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState(undefined);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      setEmail(currentUser.email);
    } else navigate("/login");
  });

  const addToList = async () => {
    try {
      await axios.post("https://netflix-backend-yeai.onrender.com/api/user/add", {
        email,
        data: movieData,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      
      onMouseEnter={() => {setIsHovered(true);selectMovie(movieData)}}
      onMouseLeave={() => {setIsHovered(false)}}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
        alt="card"
      />

      {isHovered && (
        <div className="hover">
          <div  className="image-video-container">
          <ReactPlayer
                key={trailer}
                width="inherit"
                height="inherit"
                url={`https://www.youtube.com/watch?v=${trailer}`}
                controls
                playing={true}
            />
          </div>
          <div className="info-container flex column">
            <h3 className="name" onClick={() => navigate("/player")}>
              {movieData.name}
            </h3>
            <div className="icons flex j-between">
              <div className="controls flex">
                <IoPlayCircleSharp
                  title="Play"
                  onClick={() => navigate("/player")}
                />
                <RiThumbUpFill title="Like" />
                <RiThumbDownFill title="Dislike" />
                {isLiked ? (
                  <BsCheck
                    title="Remove from List"
                    onClick={() =>
                      dispatch(
                        removeMovieFromLiked({ movieId: movieData.id, email })
                      )
                    }
                  />
                ) : (
                  <AiOutlinePlus title="Add to my list" onClick={addToList} />
                )}
              </div>
              <div className="info">
                <BiChevronDown title="More Info" />
              </div>
            </div>
            <div className="genres flex">
              <ul className="flex">
                {movieData.genres.map((genre) => (
                  <li key={genre}>{genre}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
});

const Container = styled.div`
  max-width: 230px;
  width: 230px;
  height: 100%;
  cursor: pointer;
  position: relative;
  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .hover {
    z-index: 99;
    height: max-content;
    width: 20rem;
    position: absolute;
    top: -18vh;
    left: 0;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: #181818;
    transition: 0.3s ease-in-out;
    .image-video-container {
      position: relative;
      height: 140px;
      img {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        position: absolute;
      }
      video {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 5;
        position: absolute;
      }
    }
    .info-container {
      padding: 1rem;
      gap: 0.5rem;
    }
    .icons {
      .controls {
        display: flex;
        gap: 1rem;
      }
      svg {
        font-size: 2rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #b8b8b8;
        }
      }
    }
    .genres {
      ul {
        gap: 1rem;
        li {
          padding-right: 0.7rem;
          &:first-of-type {
            list-style-type: none;
          }
        }
      }
    }
  }
`;
