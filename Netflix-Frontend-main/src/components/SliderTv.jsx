import React from 'react'
import styled from "styled-components";
import CardSliderTv from './CardSliderTv';

export default function SliderTv({ movies }) {

  const getMoviesFromRange = (from, to) => {
    return movies.slice(from, to);
  };
  return (
    <Container>
      <CardSliderTv data={getMoviesFromRange(0, 10)} title="Trending Now" />
      <CardSliderTv data={getMoviesFromRange(10, 20)} title="New Releases" />
      <CardSliderTv
        data={getMoviesFromRange(20, 30)}
        title="Blockbuster Movies"
      />
      <CardSliderTv
        data={getMoviesFromRange(30, 40)}
        title="Popular on Netflix"
      />
      <CardSliderTv data={getMoviesFromRange(40, 50)} title="Action Movies" />
      <CardSliderTv data={getMoviesFromRange(50, 60)} title="Epics" />
    </Container>
  );
}

const Container = styled.div``;