import React, { Component } from 'react';
import './App.css';
import MovieList from "./MovieList";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="header">
          <h1>EJB Studio</h1>
        </div>              
        <MovieList />   
      </div>
    );
  }
}

export default App;
