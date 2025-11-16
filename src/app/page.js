import Image from "next/image";
import Link from "next/link";

export default async function Home() {

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNDdiNjI1YTNlY2ZmNjRkNWQ5OTlhZDBkOGY1Yjg4ZiIsIm5iZiI6MTc2MzExOTA2OC40ODUsInN1YiI6IjY5MTcwZmRjNDQzYzljMmQ4Mjg3NmJlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8Ytz4twSiep_GpMeONfZujbhK58Fjm83OhQeHYDFIaQ'
  }
};

const responseMovies = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=f47b625a3ecff64d5d999ad0d8f5b88f', options)
  


  const movies = await responseMovies.json();

  return (
    <main className="bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen p-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center tracking-wider">
        🎬 Popular Movies
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {movies.results?.map((movie) => (
          <Link href={`/films/${movie.id}`} key={movie.id} className="block">
            <div className="bg-gray-700 rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition duration-300 cursor-pointer">
              {movie.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={500}
                  height={750}
                  className="w-full h-72 object-cover"
                  priority={false}
                />
              ) : (
                <div className="w-full h-72 bg-gray-600 flex items-center justify-center">
                  No Image
                </div>
              )}
              <div className="p-4">
                <h2 className="text-lg font-bold truncate">{movie.title}</h2>
                <p className="text-sm text-gray-300 mt-2">
                  {movie.overview?.length > 100
                    ? `${movie.overview.slice(0, 100)}...`
                    : movie.overview || "No description"}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}