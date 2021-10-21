## Welcome to the Rise Developer Challenge!

### The coding challenge

Your goal is to implement one of Rise's interactive blocks (see [this Rise course](https://rise.articulate.com/share/IUB9zxbEaKjSQ89lw74eevjW1qC7d-54) for more details).

At a minimum, your implementation should:
1. Decorate the knowledge block returned from [`getKnowledgeCheckBlocks`](/server/src/index.js) with `questions`, `answers`, and `media` from the Postgress Database.
1. Populate your interactive block's configuration from the provided REST API (see [`/server`](/server/src/))
1. use `react` and JavaScript for your UI components
1. Persist your interactive block's UI state by extending the provided REST API.

What you choose to implement from there is up to you. :)

### Implementation notes:

- your interactive block implementation should live in the [`/client`](/client) directory, an app skeleton has been provided in the directory
- the beginnings of a REST API lives in [`/server`](/server/src/) and is reachable at http://localhost:3000
  - the REST API currently only returns the parent `knowledgeCheckBlock` with no questions, answers, or media tied to it.

### Getting started

#### Install Docker

Install [Docker Community Edition](https://hub.docker.com/search?q=&type=edition&offering=community)

- :apple: [macOS](https://hub.docker.com/editions/community/docker-ce-desktop-mac)
- :penguin: [Linux](https://hub.docker.com/search/?type=edition&offering=community&operating_system=linux)
- 🪟 [Windows](https://hub.docker.com/editions/community/docker-ce-desktop-windows)

#### To get the Client up and running on your dev machine:

1. `cd client`
1. `yarn install` (or `npm install`)
1. `yarn start` (or `npm start`)

#### To get the REST API up and running on your dev machine:

1. `cd server`
1. `docker-compose up`

The server will be available at port 3000 and the database will be available at port 7482

### Rebuilding Docker Containers

If you install any new packages or add a new database migration file you'll want to rebuild the docker containers. To do so:

1. Stop your docker containers with `CMD + C` or `CTRL + C`
1. `docker-compose down`
1. `docker-compose up --build`
