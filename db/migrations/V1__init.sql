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

CREATE TABLE IF NOT EXISTS users(
  accountId VARCHAR PRIMARY KEY,
  lastUpdatedAt TIMESTAMP,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE IF NOT EXISTS SubscriberType AS ENUM ('owner', 'endUser');

CREATE TABLE IF NOT EXISTS subscriptions(
  id SERIAL PRIMARY KEY,
  subscriberType  SubscriberType,
  userId VARCHAR,
  keyName VARCHAR,
  metadata JSON,
  accessKeyNFT VARCHAR UNIQUE,
  lastUpdatedAt TIMESTAMP,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT uk_subs_userid_key UNIQUE (subscriberType, userId, keyName),
  CONSTRAINT fk_subs_user FOREIGN KEY(userId) REFERENCES users(id)
);