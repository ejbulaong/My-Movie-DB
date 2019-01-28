import React, { Component } from 'react';
import Movie from "./Movie";
import { Route, Link } from "react-router-dom";

class MovieList extends Component {

  state = {
    userInput:"",
    searchedMovies: [],
    moviesToWatch: [],
    watchedMovies:[]
  }

  handleChange = (e)=>{
    this.setState({
      userInput:e.target.value
    })
  }
  // called when the search button is clicked
  searchMovies = () => {
    if(this.state.userInput === "") {
      alert("Please Enter a movie title.")
    } else {
      fetch(`https://www.omdbapi.com/?apikey=8a46960c&s=${this.state.userInput}`)
      .then(response => response.json())
      .then(data => {
        data.Search.forEach((movie)=>{
          movie.watched = false; // will insert watched and wantToWatch properties to the searched objects 
          movie.wantToWatch = false;
      })

        this.setState(prevState =>{
          for(const movie of data.Search) {
            //will mark the incoming object wantToWant property as true if it is in the moviesToWatch List
            for(const m of this.state.moviesToWatch) {
              if(movie.imdbID === m.imdbID) {
                movie.wantToWatch = true;
              }
            }
            //will mark the incoming object watched property as true if it is in the watchedMovies List
            for(const m of this.state.watchedMovies) {
              if(movie.imdbID === m.imdbID) {
                movie.watched = true;
              }
            }
          }
          return {
            userInput:"",
            searchedMovies: data.Search
          }
        })        
      })
      .catch(() => {
        alert("No results found");
        this.setState({
          userInput:""
        })
      });
    }    
  }
  //put the object into the watchedMovies list if the already watched button is clicked and
  //set its watched property into true
  alreadyWatched = (movie) => {    
    this.setState(prevState => {
      let movies = prevState.searchedMovies;
      movies.forEach(m => {
        if(m.imdbID === movie.imdbID) {
          m.watched = true
        }
      })

      return {
        searchedMovies: movies,
        watchedMovies:[movie, ...prevState.watchedMovies]
      }
    })
  }
  //put the object into the moviesToWatch list if the wanto to watch button is clicked and
  //set its wantToWatch property into true
  watchMovie = (movie) => {
    this.setState(prevState => {
      let movies = prevState.searchedMovies;
      movies.forEach(m => {
        if(m.imdbID === movie.imdbID) {
          m.wantToWatch = true
        }
      })

      return {
        searchedMovies: movies,
        moviesToWatch: [movie, ...prevState.moviesToWatch]
      }
    })
  }
  //clear the searchedMovies list when the home link is clicked
  clearsearchedMovies = () => {
    this.setState({
        userInput:"",
        searchedMovies: []
    })
  }

  render() {          
    return (
      <div>

        <Route exact path="/" render={()=>
            <div >
              <Link to= "/search">Search for Movies</Link>
          
              <div >
                {this.state.watchedMovies.length > 0 && <h2>Watched Movies</h2> }
                <div className="movie-list"> 
                {this.state.watchedMovies.map(movie=>
                  <Movie 
                    key={movie.imdbID} 
                    movie={movie}
                    watchMovie = {this.watchMovie}
                    alreadyWatched = {this.alreadyWatched}/> )
                }
                </div>               
              </div>

              <div>
                {this.state.moviesToWatch.length > 0 && <h2>Movies To Watch</h2>}
                <div className="movie-list"> 
                {this.state.moviesToWatch.map(movie=>
                  <Movie 
                    key={movie.imdbID} 
                    movie={movie}
                    watchMovie = {this.watchMovie}
                    alreadyWatched = {this.alreadyWatched}/> )
                }
                </div>               
              </div>
            </div>
        } />

        <Route exact path="/search" render={()=>
          <div >
            <Link to= "/" onClick={this.clearsearchedMovies}>Home</Link>
            <form className="form">
              <input 
                name="search" 
                type="text" 
                placeholder="type movie title here..."
                value={this.state.userInput}
                onChange={this.handleChange}
                />
              <button type="button" onClick = {this.searchMovies}>Search</button>
            </form>
            <div  className="movie-list">
            {this.state.searchedMovies.map(movie=>
              <Movie 
                key={movie.imdbID} 
                movie={movie}
                watchMovie = {this.watchMovie}
                alreadyWatched = {this.alreadyWatched}
            /> )}
            </div>
          </div>
        } />
      </div>
    );
  }
}

export default MovieList;