import React, { useState } from "react";
import Axios from "axios";
import MovieComponent from "../components/MovieComponent";
import MovieInfoComponent from "../components/MovieInfoComponent";
import { data as movies } from "../data";
import {
  Container, Header, AppName, SearchBox, SearchIcon, SearchInput, MovieImage,
  MovieListContainer, Placeholder
} from './Home.styled';

export const API_KEY = "a9118a3a";
function Home() {
  //Stores the user's search query.
  const [searchQuery, updateSearchQuery] = useState("");
  //Stores the list of movies fetched from the API or a default list if no results are found.
  const [movieList, updateMovieList] = useState();
  //Stores the selected movie for displaying additional information.
  const [selectedMovie, updateSelectedMovie] = useState();
  //The purpose of using timeoutId in this context is to manage the debounce behavior. When the user 
  //types in the search input, you set a timeout to delay making the API call until the user has finished 
  //typing. If the user continues typing within that timeout, the previous timeout is cleared (to avoid 
  //making unnecessary API requests) and a new one is set. This ensures that the API call is only made after 
  //a brief pause in typing, reducing the number of requests and improving performance.
  const [timeoutId, updateTimeoutId] = useState();
  //Create an async function fetchData to make an API call to OMDB and update the movieList state with 
  //the search results. It also checks if there are no results and reverts to the default list.
  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
    );
    updateMovieList(response.data.Search);
    console.log(response.data.Search);
  };
  //Define the onTextChange function that is called when the user types in the search input. 
  const onTextChange = (e) => {
    //Clears the selectedMovie
    updateSelectedMovie()
    //clearTimeout is a JavaScript function that allows you to cancel a timeout previously created with setTimeout()
    clearTimeout(timeoutId);
    //Updates the searchQuery state with the input value.
    updateSearchQuery(e.target.value);
    //Sets a new timeout to call the fetchData function after a delay, effectively debouncing the input.
    const timeout = setTimeout(() => fetchData(e.target.value), 100);
    updateTimeoutId(timeout);
  };
  return (
    <Container>
      <Header>
        <AppName>
          <MovieImage src="/react-movie-app/movie-icon.svg" />
          Movie Mania
        </AppName>
        <SearchBox>
          <SearchIcon src="/react-movie-app/search-icon.svg" />
          <SearchInput
            placeholder="Search Movie"
            //value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>
      {/* {selectedMovie && ...}: 
          This is a conditional rendering pattern in React. It checks whether the selectedMovie prop 
          is truthy (i.e., it has a value). If selectedMovie is truthy, it proceeds to render the content 
          inside the curly braces. If selectedMovie is falsy (e.g., null or undefined), it doesn't render anything.
     */}
      {selectedMovie && <MovieInfoComponent
        //selectedMovie: This prop is set to the value of selectedMovie, presumably used by the MovieInfoComponent
        //               to display detailed information about the selected movie.
        selectedMovie={selectedMovie}
        //updateSelectedMovie: This prop is set to a function (presumably) used to update the selected movie.
        //                     when click on close button X , we need to deselect the selected movie
        updateSelectedMovie={updateSelectedMovie} />}
      <MovieListContainer>
        {/* {movieList?.length ? (...) : (...)}: 
          This is a conditional rendering pattern. It checks whether movieList exists and has a length greater 
          than zero. If movieList has items (length greater than zero), it renders the first block of JSX inside
          the parentheses. If movieList is empty (has a length of zero), it renders the second block of JSX.  

          Note -> movieList.?object_Property? -> we can also write movieList.object_Property 
              .? -> called optional chaining operator  introduced in JavaScript to help avoid errors 
                    that occur when trying to access properties or methods on null or undefined values.
                    Example : => movieList?.length: This code attempts to access the length property of 
                                 the movieList object. If movieList is null or undefined, this expression 
                                 will not throw an error; instead, it will return undefined. If movieList 
                                 is an object with a length property, it will return the value of that property  
        */}
        {movieList?.length ? (
          // movieList.map(...): If movieList is not empty, it maps over each movie in the movieList array 
          //                     and creates a MovieComponent for each one.
          movieList.map((movie, index) => (
            <MovieComponent
              // index.js:1  Warning: Each child in a list should have a unique "key" prop.
              // to stop this waring key to be passed and to make key unique i have used index of the array
              key={index}
              // movie: The movie object from the movieList array 
              movie={movie}
              // to select the movie when user click on it
              updateSelectedMovie={updateSelectedMovie}
            />
          ))
        ) : (
          updateMovieList(movies)
        )}
      </MovieListContainer>
    </Container>
  );
}

export default Home;
