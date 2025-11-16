import pg from "pg";

export const db = new pg.Pool({
  connectionString: process.env.NEXT_PUBLIC_POSTGRES,
});

export const key = new pg.Pool({ connectionString: process.env.API_KEY });
