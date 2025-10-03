import axios from "axios";


const API_KEY = "5ae29fc8e3ed1158d754205b35f9bb14";
const BASE_URL = "https://api.themoviedb.org/3";

export async function getMovieById(id: number) {
        const response = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=uk-UA`);
    return response.data;
}
