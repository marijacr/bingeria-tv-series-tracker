import { getShows, searchShows } from '@/app/lib/tvmaze';
import ShowCard from '@/app/components/ShowCard';
import SearchBar from "@/app/components/SearchBar";
import {Show} from "@/app/types/show";

interface HomePageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function HomePage({searchParams}: HomePageProps) {

  const {q} = await searchParams;

  const shows = q ? await searchShows(q) : await getShows();


  return (
    <main className="bg-slate-950">
      <div className='max-w-[1500] mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <h1 className="text-3xl font-bold mb-4 p-4 text-center text-taupe-50">Catalogue</h1>

        <div className="flex justify-center mb-8 text-gray-100">
          <SearchBar />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {shows.map((show) => (
            <ShowCard key={show.id} show={show} />
          ))} 
        </div>
      </div>
    </main>
  );
}
