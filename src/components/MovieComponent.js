import React from "react";
import { MovieContainer, CoverImage, MovieName, InfoColumn, MovieInfo } from './MovieComponent.styled';

const MovieComponent = ({ movie, updateSelectedMovie }) => {
  const { Title, Year, imdbID, Type, Poster } = movie;

  return (
    <MovieContainer
      onClick={() => {
        // when clicked on any movie then it to be selected in order to get more info about this movie
        updateSelectedMovie(imdbID);
        // scrolls the window to the top of the page with a smooth scrolling animation. 
        // window.scrollTo method, where { top: 0, behavior: "smooth" } specifies that 
        //it should scroll to the top of the page (top: 0) with a smooth animation (behavior: "smooth").
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <CoverImage src={Poster} alt={Title} />
      <MovieName>{Title}</MovieName>
      <InfoColumn>
        <MovieInfo>Year : {Year}</MovieInfo>
        <MovieInfo>Type : {Type}</MovieInfo>
      </InfoColumn>
    </MovieContainer>
  );
};
export default MovieComponent;
