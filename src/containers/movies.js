import React, { useState, useEffect } from "react";
import axios from "axios";
import useDebounce from "../hooks/debounce";

import MovieList from "./components/movielist";

const MovieContainer = () => {
    const API_KEY = "50bb8cc380100c5ea082ad86e775e26b";

    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const debouncedSearchTerm = useDebounce(searchTerm, 400);

    useEffect(() => {
        if (debouncedSearchTerm) {
            const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=1&include_adult=false`;
            axios.get(url).then(data => {
                const pagesToDisplay = Math.ceil(data.data.results.length / 10);
                setTotalPages(pagesToDisplay);
                setMovies(data.data.results);
            });
        } else {
            setMovies([]);
        }
    }, [debouncedSearchTerm]);

    const pageNav = () => {
        const items = [];
        for (let i = 1; i <= totalPages; i++) {
            let style =
                page === i
                    ? {
                          color: "red",
                          listStyle: "none"
                      }
                    : {
                          color: "black",
                          listStyle: "none"
                      };
            items.push(
                <li style={style} onClick={() => setPage(i)}>
                    <span
                        style={{
                            borderLeft: "1px solid black",
                            margin: "10px",
                            padding: "4px"
                        }}
                    >
                        {i}
                    </span>
                </li>
            );
        }
        return items;
    };

    return (
        <div>
            <h2>Search for a movie</h2>
            <input type="text" onChange={e => setSearchTerm(e.target.value)} />

            <MovieList movies={movies.slice(page * 10 - 10, page * 10)} />
            <ul
                style={{
                    display: "flex"
                }}
            >
                {pageNav()}
            </ul>
        </div>
    );
};

export default MovieContainer;
