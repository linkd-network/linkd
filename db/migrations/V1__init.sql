CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS ad(
  id VARCHAR PRIMARY KEY,
  budget int,
  model VARCHAR,
  content VARCHAR,
  contentType VARCHAR,
  samplingRate BIGINT,
  creationDate BIGINT,
  publisher VARCHAR
);

CREATE TABLE IF NOT EXISTS trackingEvent(
  id VARCHAR PRIMARY KEY,
  publisherId VARCHAR,
  EventModel VARCHAR,
  eventDate BIGINT,
  adId VARCHAR
);