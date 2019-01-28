import React, { Component } from 'react';

class Movie extends Component {
  render() {
    return (
      <div className="movie">
        <img src={this.props.movie.Poster} alt="poster"/>
        <div>
        <h3>{this.props.movie.Title}</h3>
        <h4>{this.props.movie.Year}</h4>
        </div>        
        {!this.props.movie.watched && !this.props.movie.wantToWatch &&
           <button onClick={()=>this.props.alreadyWatched(this.props.movie)}>Already Watched</button>}
        {!this.props.movie.watched && !this.props.movie.wantToWatch &&
           <button onClick={()=>this.props.watchMovie(this.props.movie)}>Want to Watch</button>}
      </div>
    );
  }
}

export default Movie;