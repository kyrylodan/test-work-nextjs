import {IGenre} from "@/app/models/IGenre";


export const getGenres = async ():Promise<IGenre[]> => {
    try {
        const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=5ae29fc8e3ed1158d754205b35f9bb14&language=uk-UA')

        const data = await res.json()
        return data.genres;
    } catch (err) {
        console.error('Error', err);
        return [];
    }
}