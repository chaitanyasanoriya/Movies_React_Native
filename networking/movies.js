let __topRatedPage = 1;
// let __searchPage = 1;

export const getTopRatedMovies = async (callBack, append) => {
    // console.log("fetching movies: ", __topRatedPage);
    let response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=268c88dfb53e699af83e0094f0b584ce&language=en-US&page=${__topRatedPage}`
    );
    let json = await response.json();
    __topRatedPage++;
    // console.log(json);
    callBack(json, append);
};

export const resetTopRatedPage = () => {
    __topRatedPage = 1;
};

export const searchMovies = async (text, callBack) => {
    // console.log("fetching movies: ", __topRatedPage);
    let response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=268c88dfb53e699af83e0094f0b584ce&language=en-US&query=${text}&page=1`
    );
    let json = await response.json();
    // __searchPage++;
    // console.log(json);
    callBack(json, false);
};

// export const resetSearchPage = () => {
//     __searchPage = 0;
// }
