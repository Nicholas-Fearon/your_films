import { db } from "@/utils/db";

export default async function singleProfilePage({ params }) {
  const { userid } = await params;
  
  console.log("this is my params log:", params);

  try {
    const userresponse = await db.query(
      `SELECT * FROM users WHERE id = $1`,
      [userid]
    );
    const user = userresponse.rows;
    console.log("This is the user log:", user);

    if (!user || user.length === 0) {
      return <div><h2>User not found</h2></div>;
    }

    return (
      <div>
        <h2>username: {user[0].username}</h2>
        <p>bio: {user[0].bio}</p>
        <p>favorites: {user[0].favorites}</p>
      </div>
    );
  } catch (error) {
    console.error("Database error:", error);
    return <div><h2>Error loading user</h2></div>;
  }
}