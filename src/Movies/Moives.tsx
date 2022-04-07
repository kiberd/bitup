import React, {useEffect, useState} from 'react';

import Nav from "./Nav";
import NavItem from "./NavItem";
import List from "./List";
import ListItem from "./ListItem";

import {useQuery, useLazyQuery} from "@apollo/client";

import {GET_MOVIES, GET_SUGGESTION_MOVIES, GET_MOVIE} from "../queries";
import {Movie} from "../types";

interface MoivesProps {

}

const Moives: React.FunctionComponent<MoivesProps> = (props) => {


    const [data, setData] = useState<Movie[]>();

    const [searchId, setSearchId] = useState<number>(1);

    const [getMovie, {
        loading: getMovieLoading,
        error: getMovieError,
        data: getMovieData
    }] = useLazyQuery(GET_MOVIE, {
        // fetchPolicy: "network-only",
    });

    const [getMovies, {
        loading: getMoviesLoading,
        error: getMoviesError,
        data: getMoviesData
    }] = useLazyQuery(GET_MOVIES, {
        // fetchPolicy: "network-only",
    });

    const [getSuggestionMovies, {
        loading: getSuggestionMoviesLoading,
        error: getSuggestionMoviesError,
        data: getSuggestionMoviesData
    }] = useLazyQuery(GET_SUGGESTION_MOVIES, {
        // fetchPolicy: "network-only",
    });

    useEffect(() => {
        getMovies({variables: {limit: 20, rating: 9}});
    }, []);

    useEffect(() => {
        if (getMovieData) {
            const arry = [getMovieData.movie];
            setData(arry);
        }
    }, [getMovieData]);

    useEffect(() => {
        if (getMoviesData) {

            setData(getMoviesData.movies);
        }
    }, [getMoviesData]);

    useEffect(() => {
        if (getSuggestionMoviesData) {
            setData(getSuggestionMoviesData.suggestions);
        }
    }, [getSuggestionMoviesData]);

    const [tabName, setTabName] = useState('Top Rated 20');

    const handleClick = (tabName: string) => {

        setTabName(tabName);

        if (tabName === "Top Rated 20") {
            getMoviesData ? setData(getMoviesData.movies) : getMovies({variables: {limit: 20, rating: 9}});
        } else {
            getSuggestionMoviesData ? setData(getSuggestionMoviesData.suggestions) : getSuggestionMovies({variables: {id: searchId}});
        }

    };

    const handleChangeSearchId = (e: React.FocusEvent<HTMLInputElement>) => {
        setSearchId(Number(e.target.value));
    };

    const handleSearchClick = () => {
        getMovie({variables: {id: searchId}});
    };

    if (getMovieLoading || getMoviesLoading || getSuggestionMoviesLoading) return <>Loading</>;
    if (getMovieError || getMoviesError || getSuggestionMoviesError) return <>Error!</>;

    return (
        <div className="divide-y divide-slate-100">


            <nav className="py-4 px-6 text-sm font-medium">

                <div className="my-3">

                    <input
                        type="text"
                        name="name"
                        placeholder="Movie Id"
                        className="w-1/6 px-4 py-2 border-b-2 border-gray-400 outline-none  focus:border-gray-400"
                        onChange={handleChangeSearchId}
                    />

                    <button onClick={handleSearchClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 mx-5 rounded">
                        Search
                    </button>


                </div>


                <ul className="flex space-x-3">

                    <NavItem onHandleClick={handleClick} isActive={tabName === 'Top Rated 20' ? true : false}>Top Rated
                        20</NavItem>
                    <NavItem onHandleClick={handleClick}
                             isActive={tabName === 'Suggestion' ? true : false}>Suggestion</NavItem>


                </ul>


            </nav>

            <List>
                {data && data.length && data.map((movie: Movie) => (
                    <ListItem key={movie.id} movie={movie}/>
                ))}
            </List>
        </div>

    );
};

export default Moives;