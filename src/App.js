import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // const fetchMoviesHandler = () => {
    //     fetch("https://www.swapi.tech/api/films")
    //         .then((response) => {
    //             return response.json();
    //         })
    //         .then((data) => {
    //             const transformedMovies = data.result.map(movieData => {
    //                 return {
    //                     id: movieData.properties.episode_id,
    //                     title: movieData.properties.title,
    //                     openingText: movieData.properties.opening_crawl,
    //                     releaseDate: movieData.properties.release_date
    //                 }
    //             })
    //             setMovies(transformedMovies);
    //         })
    //         .catch((error) => {
    //             console.error("Error:", error);
    //         });
    // };

    const fetchMoviesHandler = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await fetch("https://swapi.py4e.com/api/films/");

            // the response also has a 'status' field which hold the concrete
            // response status code. we can also check that manually
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const transformedMovies = data.results.map((movieData) => {
                return {
                    id: movieData.episode_id,
                    title: movieData.title,
                    openingText: movieData.opening_crawl,
                    releaseDate: movieData.release_date,
                };
            });
            setMovies(transformedMovies);
            setIsLoading(false);
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    }, []);

    // use useEfeect to fetch movies from api when the component is called
    useEffect(() => {
        fetchMoviesHandler()
    }, [fetchMoviesHandler])

    // return (
    //     <React.Fragment>
    //         <section>
    //             <button onClick={fetchMoviesHandler}>Fetch Movies</button>
    //         </section>
    //         <section>
    //             {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
    //             {!isLoading && movies.length === 0 && !error && <p>Found no movies.</p>}
    //             {isLoading && <p>Loading...</p>}
    //             {!isLoading && error && <p>{error}</p>}
    //         </section>
    //     </React.Fragment>
    // );

    let content = <p>Found no movies.</p>;

    if (movies.length > 0) {
        content = <MoviesList movies={movies} />;
    }

    if (error) {
        content = <p>{error}</p>;
    }

    if (isLoading) {
        content = <p>Loading...</p>;
    }

    return (
        <React.Fragment>
            <section>
                <button onClick={fetchMoviesHandler}>Fetch Movies</button>
            </section>
            <section>{content}</section>
        </React.Fragment>
    );
}

export default App;
