import {Show} from "../types/show";

const BASE_URL = "https://api.tvmaze.com";

interface TVMazeSearchResult {
    score: number;
    show: Show;
}

export async function getShows(): Promise<Show[]> {


    const response = await fetch(`${BASE_URL}/shows?page=0`,{
        //added this option to revalidate data after a specified number of seconds, in this case 1 hour
        //i didnt choose "cache: 'force-cache'" because fetch in this case would show API updates only after redeploy
        // and in option "cache: 'no-store'", data gets fetched after every request
        next: {revalidate:3600},
    });


    if(!response.ok){
        throw new Error(`Response status: ${response.status}`)
    }

    const data: Show[] = await response.json();

    return data.slice(0,24);

}

export async function searchShows(searchInput: string): Promise<Show[]> {

    if (!searchInput.trim()) {
        return [];
    }

    const response = await fetch(`${BASE_URL}/search/shows?q=${encodeURIComponent(searchInput)}`,{
        cache: "no-store",
    });

    if(!response.ok){
        throw new Error(`Response status: ${response.status}`)
    }

    const data: TVMazeSearchResult[] = await response.json();

    return data.map((result)=> result.show);

}