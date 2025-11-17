import { db } from "@/utils/db";
import UserForm from "@/components/UserForm";
import { currentUser, auth } from "@clerk/nextjs/server";
import Link from "next/link";
import Image from "next/image";
import { EditBio } from "@/components/EditBio";

export default async function ProfileForm({ params }) {
  const { userId } = await auth();
  const user = await currentUser();

  console.log("This is my user log:", user);

  if (!userId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-8">
        <p className="text-lg font-medium mb-4">
          Please sign in to access this page.
        </p>
        <Link
          href="/sign-in"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Sign In
        </Link>
      </div>
    );
  }

  // Fetch user bio data
  let bio = null;
  try {
    const responseUser = await db.query(
      `SELECT bio FROM users WHERE clerk_id = $1`,
      [userId]
    );
    const currentUserData = responseUser?.rows[0];
    bio = currentUserData?.bio;
  } catch (error) {
    console.error("Error fetching user bio:", error);
  }

  return (
    <main className="bg-gray-900 text-white min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-400 mb-4">
          Welcome, {user.firstName}!
        </h1>
        <Image
          src={user.imageUrl}
          height={100}
          width={100}
          alt="Picture of User"
          className="rounded-full mb-4"
        />
        <p className="mb-2">Username: {user.username}</p>
        <p className="mb-6">Email: {user.emailAddresses[0].emailAddress}</p>

        {bio ? (
          <div>
            <p className="text-gray-300 mb-4">Your Bio:</p>
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
              <p className="text-white mb-4">{bio}</p>
              <Link
                href="/profile/edit"
                className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition duration-300"
              >
                Edit Bio
              </Link>
            </div>
            <EditBio currentBio={bio} userId={userId} />
          </div>
        ) : (
          <div>
            <p className="text-gray-300 mb-6">
              To leave reviews on films and TV shows, please fill in your
              details below:
            </p>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <UserForm />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}