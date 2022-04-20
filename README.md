# smrt

In order to run local env please follow the instructions
1. Run `docker-compose -f docker-compose.yml up -d` in the kafka folder
2. Create kafka topic manually 
   `docker-compose exec broker kafka-topics --create --zookeeper zookeeper:2181 --replication-factor 1 --partitions 1 --topic sc-events`
3. 


<!-- 
docker-compose -f docker-compose.yml up -d

Cannot stop Docker Compose application. Reason: Error invoking remote method 'compose-action': Error: Command failed: docker-compose-v1 --file "docker-compose.yml" --project-name "kafka" --project-directory "/Users/matanshushan/Programing/personal/smrt/kafka" stop In file './docker-compose.yml

docker exec -ti postgres1 psql -U postgres


CREATE TABLE sc_events (
	id SERIAL PRIMARY KEY,
	source VARCHAR(255) NOT NULL,
	eventType VARCHAR(255) NOT NULL,
	date bigint,
);
 -->
