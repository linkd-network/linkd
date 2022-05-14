CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS ad(
  id VARCHAR PRIMARY KEY,
  resourceType VARCHAR,
  title VARCHAR,
  contentURL VARCHAR,
  triggerType VARCHAR,	
  contractId VARCHAR,	
  destinationURL VARCHAR,	
  budget int,	
  costPerAction int,	
  creationDate TIMESTAMP
);

CREATE TABLE IF NOT EXISTS account(
  id VARCHAR PRIMARY KEY,
  accountId VARCHAR,
  username VARCHAR
);
