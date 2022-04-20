CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS notes(
  id          int PRIMARY KEY,
  note        TEXT UNIQUE NOT NULL
);