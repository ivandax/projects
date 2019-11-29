class LocalStorage{

    static setFavorite(key, array){
        localStorage.setItem(key,array);
    }

    static getFavorites(key){
        const ref = localStorage.getItem(key);
        if(ref){
            return ref;
        }
        return false;
    }
}

export default LocalStorage;