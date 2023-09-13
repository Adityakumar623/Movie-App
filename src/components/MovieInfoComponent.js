import React, { useEffect, useState } from "react";
import Axios from "axios";
import { API_KEY } from "../pages/Home";
import { Container, CoverImage, InfoColumn, MovieInfo, MovieName, Close } from './MovieInfoComponent.styled';

const MovieInfoComponent = ({ selectedMovie, updateSelectedMovie }) => {
  // movieInfo state store information about the selected movie.
  const [movieInfo, setMovieInfo] = useState();
  //useEffect is a React hook that takes two arguments: a function and an array of dependencies.
  useEffect(() => {
    // functional argument :  API request is made, and when the response is received, the response.data is 
    //                   used to update the movieInfo state variable using setMovieInfo. This causes a 
    //                  re-render of the component with the fetched movie information, and the UI updates accordingly
    Axios.get(
      `https://www.omdbapi.com/?i=${selectedMovie}&apikey=${API_KEY}`,
    ).then((response) => setMovieInfo(response.data));
  },
    // array argument : It specifies when the effect should run. In your code, [selectedMovie] is provided as 
    //                  the dependency array. This means that the effect will run whenever the selectedMovie prop 
    //                  changes. When selectedMovie changes (i.e., when a new movie is selected), the effect will 
    //                  trigger, making a new API request.
    [selectedMovie]
  );
  return (
    <Container>
      {/* conditional rendering -> movieInfo ? jsx : Loading
          If movieInfo is truthy (i.e., it contains data), the first block of JSX inside the parentheses 
          is rendered. If movieInfo is falsy (e.g., null or undefined), the second block of JSX is rendered.
      */}
      {movieInfo ? (
        <>
          {/* movieInfo.?object_Property? -> we can also write movieInfo.object_Property 
              .? -> called optional chaining operator  introduced in JavaScript to help avoid errors 
                    that occur when trying to access properties or methods on null or undefined values.
                    Example : => movieInfo?.Poster: This code attempts to access the Poster property of 
                                 the movieInfo object. If movieInfo is null or undefined, this expression 
                                 will not throw an error; instead, it will return undefined. If movieInfo 
                                 is an object with a Poster property, it will return the value of that property       
          */}
          <CoverImage src={movieInfo?.Poster} alt={movieInfo?.Title} />
          <InfoColumn>
            <MovieName>
              {movieInfo?.Type}: <span>{movieInfo?.Title}</span>
            </MovieName>
            <MovieInfo>
              IMDB Rating: <span>{movieInfo?.imdbRating}</span>
            </MovieInfo>
            <MovieInfo>
              Year: <span>{movieInfo?.Year}</span>
            </MovieInfo>
            <MovieInfo>
              Language: <span>{movieInfo?.Language}</span>
            </MovieInfo>
            <MovieInfo>
              Rated: <span>{movieInfo?.Rated}</span>
            </MovieInfo>
            <MovieInfo>
              Released: <span>{movieInfo?.Released}</span>
            </MovieInfo>
            <MovieInfo>
              Runtime: <span>{movieInfo?.Runtime}</span>
            </MovieInfo>
            <MovieInfo>
              Genre: <span>{movieInfo?.Genre}</span>
            </MovieInfo>
            <MovieInfo>
              Director: <span>{movieInfo?.Director}</span>
            </MovieInfo>
            <MovieInfo>
              Actors: <span>{movieInfo?.Actors}</span>
            </MovieInfo>
            <MovieInfo>
              Plot: <span>{movieInfo?.Plot}</span>
            </MovieInfo>
          </InfoColumn>
          {/* when clik on X ,we need to close the info of selected movie so we will update useState with empty
              and for this we will use updateSelectedMovie()*/}
          <Close onClick={() => updateSelectedMovie()}>X</Close>
        </>
      ) : (
        "Loading..."
      )}
    </Container>
  );
};
export default MovieInfoComponent;
