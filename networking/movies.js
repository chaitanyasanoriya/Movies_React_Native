let __topRatedPage = 1;

export const getTopRatedMovies = async (callBack) => {
    let response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=268c88dfb53e699af83e0094f0b584ce&language=en-US&page=${__topRatedPage}`
    );
    let json = await response.json();
    console.log(json);
    callBack(json);
};
