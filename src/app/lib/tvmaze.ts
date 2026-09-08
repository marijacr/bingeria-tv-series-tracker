import {Show} from "../types/show";

const BASE_URL = "https://api.tvmaze.com";

export async function getShows(): Promise<Show[]> {

    const response = await fetch(`${BASE_URL}/shows?page=0`);

    if(!response.ok){
        throw new Error(`Response status: ${response.status}`)
    }

    const data: Show[] = await response.json();

    return data.slice(0,24);

}