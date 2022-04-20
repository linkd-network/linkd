
# Fyber local deployment!

Please follow the instractions in order to deploy a local development environment




## Setup environment like a ninja 

1. Please make sure you have node installed on you machine, if no please download from [here](https://nodejs.org/en/download/). 
1. Please make sure you have docker installed on you machine, if no please download from [here](https://www.docker.com/products/docker-desktop/). 
If using linux machine please install docker compose as well from [here](https://docs.docker.com/compose/install/) 

2. Clone Repo 

3. In folder  ```/apps/mgmt``` run ```pnpm install```
4. In folder  ```/apps/web``` run ```pnpm install```
5. Go to the repo root project and run 
```bash
  docker-compose up -d
```
#### You are good to go!

    
## Development

After set the env and its up and running, lets see what do we have.

- postgres pod :5432
- mgmt pod (Backend API - Node) :4000
- Web pod (Frontend - React) :4033
- flyway temp pod (Run migrations on DB)

### Things to know 

#### Postgres
 - When adding new tables please add it to the migrations file ```V1__init.sql```

 #### mgmt
 - The pod is ready for development just start coding and its watch for changes on your machine. start coding and the pod will update :)  

 #### Web
 - There is proxy to the API port


 