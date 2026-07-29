-- Guilds & Clans
CREATE TABLE guilds (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE guild_members (
  guild_id UUID REFERENCES guilds(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member',
  joined_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (guild_id, user_id)
);

-- Duels
CREATE TABLE duels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  challenger_id UUID REFERENCES profiles(id),
  opponent_id UUID REFERENCES profiles(id),
  status TEXT DEFAULT 'waiting', -- waiting, active, finished
  winner_id UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE duel_questions (
  duel_id UUID REFERENCES duels(id) ON DELETE CASCADE,
  question_id UUID REFERENCES questions(id),
  PRIMARY KEY (duel_id, question_id)
);

-- Social Posts
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  language TEXT DEFAULT 'ku',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE post_likes (
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, user_id)
);

-- Certificates
CREATE TABLE certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES teacher_courses(id) ON DELETE CASCADE,
  issued_at TIMESTAMPTZ DEFAULT now(),
  verification_code TEXT UNIQUE
);

-- Vector Search (pgvector)
CREATE EXTENSION IF NOT EXISTS vector;
ALTER TABLE sentences ADD COLUMN IF NOT EXISTS embedding vector(384);

-- Full-text search with pg_trgm (already added)
