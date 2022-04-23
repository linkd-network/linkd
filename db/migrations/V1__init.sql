CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS ads(
  id VARCHAR PRIMARY KEY,
  budget int,
  model VARCHAR,
  content_type VARCHAR,
  sampling_rate BIGINT,
  creation_date BIGINT,
  publisher VARCHAR
);