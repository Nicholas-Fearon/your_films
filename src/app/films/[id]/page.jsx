import ReviewForm from "@/components/ReviewForm";
import Image from "next/image";
import { db } from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";

export default async function MovieDetails({ params }) {
  const user = await currentUser();
  const { id } = await params;
console.log("This is my user log", user)
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=f47b625a3ecff64d5d999ad0d8f5b88f`
  );
 
  const movie = await response.json();

  let content = [];

  try {
    // Add a timeout and error handling
    const review = await Promise.race([
      db.query(`SELECT * FROM review WHERE movie_id = $1`, [id]),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Query timeout")), 5000)
      ),
    ]);
    content = review.rows || [];
  } catch (error) {
    console.error("Database error:", error);
    content = [];
  }

  return (
    <main className="bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen p-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center tracking-wider">
        🎬 {movie.title}
      </h1>
      <div className="flex flex-col items-center">
        {movie.poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="rounded-lg shadow-lg"
            width={500}
            height={750}
          />
        ) : (
          <div className="w-96 h-96 bg-gray-600 rounded-lg flex items-center justify-center">
            No Image
          </div>
        )}

        <div className="mt-4 max-w-2xl text-center">
          <p className="text-lg text-gray-300">{movie.overview}</p>
          <p className="mt-2 text-sm text-gray-400">
            Release Date: {movie.release_date}
          </p>
          <ReviewForm movieId={id} />

          {user && <p className="mt-4">Username: {user.username}</p>}

          {content.length > 0 ? (
            <div className="mt-6 bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-bold">
                Film Title: {content[0].title}
              </h3>
              <p className="mt-2">Film Review: {content[0].content}</p>
            </div>
          ) : (
            <p className="mt-6 text-gray-400">No reviews yet</p>
          )}
        </div>
      </div>
    </main>
  );
}
