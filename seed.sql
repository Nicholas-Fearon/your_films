-- 1. Base tables first
CREATE TABLE types (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  type TEXT
);

CREATE TABLE genres (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  genre TEXT,
  type_id INT REFERENCES types(id)
);

-- 2. Users table with UNIQUE constraint on clerk_id
CREATE TABLE users (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username TEXT,
  bio TEXT,
  favorites TEXT,
  clerk_id TEXT UNIQUE NOT NULL
);

-- 3. Likes table (reference users)
CREATE TABLE likes (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id INT REFERENCES users(id),
  review_id INT NULL,
  comment_id INT NULL,
  vote SMALLINT CHECK (vote IN (-1, 1)),
  vote_type VARCHAR(255) CHECK (vote_type IN ('review', 'comment')),
  UNIQUE(user_id, review_id, comment_id, vote_type)
);

-- 4. Reviews (reference users, types)
CREATE TABLE review (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  content TEXT,
  title TEXT,
  users_id INT REFERENCES users(id),
  types_id INT REFERENCES types(id),
  clerk_id TEXT,
  movie_id INT
);

-- 5. Comments (reference users, reviews)
CREATE TABLE comment (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  comment TEXT,
  users_id INT REFERENCES users(id),
  review_id INT REFERENCES review(id),
  clerk_id TEXT
);