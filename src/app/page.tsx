import Image from "next/image";
import { getShows } from '../app/lib/tvmaze';
import ShowCard from '../app/components/ShowCard';
import {Show} from "../app/types/show";

export default async function HomePage() {

  const shows = await getShows();

  return (
    <main className=" p-10 bg-slate-950">
      <h1 className="text-3xl font-bold mb-4 p-4 text-center text-taupe-50">Catalogue</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {shows.map((show) => (
          <ShowCard key={show.id} show={show} />
        ))} 
      </div>
    </main>
  );
}
