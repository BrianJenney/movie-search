import React, { useState } from "react";

const MovieList = ({ movies }) => {
    const [selectedMovie, setSelectedMovie] = useState({});

    const sortedMovies = movies.sort((a, b) => b.popularity - a.popularity);

    return sortedMovies.map(movie => {
        const imgUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        return (
            <div key={movie.id} onClick={() => setSelectedMovie(movie)}>
                <img src={imgUrl} />
                <p>Average Rating: {movie.vote_average}</p>

                {selectedMovie.id === movie.id && (
                    <div>
                        <h3>{movie.original_title}</h3>
                        <p>{movie.overview}</p>
                        <p>Released: {movie.release_date}</p>
                        <p>No. of votes: {movie.vote_count}</p>
                    </div>
                )}
                <hr />
            </div>
        );
    });
};

export default MovieList;
