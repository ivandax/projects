import axios from 'axios';

//global methods for requesting stuff...
const base = 'https://api.themoviedb.org/3/movie/';
const fixedparams = {api_key:'75b2942605388d74a946390a8257a505',
  language:'en-US', include_adult: false};

const base_search = 'https://api.themoviedb.org/3/search/movie/'

/*this api can work with category being just one movie ID, returning a single
movie, or "top_rates" would return a list of movies... */
const get = async (category, params='') => {
    const query = base + category; //category can be single movie or an actual category.
    const mod_params = {...fixedparams,...params}; /*Makes a copy of the fixed parameters and adds the new inputs... if there is none, the empty string won't affect the query.*/
    const result = await axios.get(query, {params : mod_params});
    //we pass the modified parameters...

    if(result.status === 200){
        return result.data;
    }
}

//https://api.themoviedb.org/3/search/movie?query="shaw"&api_key=75b2942605388d74a946390a8257a505&language=en-US&page=1&include_adult=false
const getSearch = async (queryString, params='') => {
    const mod_params = {...fixedparams,...{query: queryString},...params}
    console.log(mod_params)
    const result = await axios.get(base_search, {params : mod_params});

    if(result.status === 200){
        return result.data;
    }
}

//class to consult from components... 
class movieAPI{

    static async getSingleMovie(movieId){
        const result = await get(movieId);
        return result;
    }
    static async getMovies(category, page_number){
        const result = await get(category, {page:page_number});
        return result;
    }

    static async getMoviesSearch(queryString, page_number){
        const result = await getSearch(queryString, {page:page_number});
        return result;
    }

}

export default movieAPI;