
# Fyber local deployment!

Please follow the instractions in order to deploy a local development environment




## Setup environment

1. install `Node` on you machine from [here](https://nodejs.org/en/download/). 

2. install `Docker`  on you machine from [here](https://www.docker.com/products/docker-desktop/). 
If using linux machine please install docker compose as well from [here](https://docs.docker.com/compose/install/) 

3. install `pnpm` on you machine from [here](https://pnpm.io/installation). 


## Run Locally

Clone the project

```bash
  git clone https://github.com/MatanShushan/smrt.git
```

Go to the project directory

```bash
  cd ./smrt
```

Install dependencies

```bash
pnpm --prefix ./apps/mgmt install 
```
```bash
pnpm -prefix  ./apps/web/src install
```

Run Project
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
## FAQ

#### Something is not running as expected

Please reach Matan on slack 
