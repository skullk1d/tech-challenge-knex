# Welcome to the Rise Developer Challenge!

## Part 1: The Coding Challenge

Rise allows customers to create responsive single page, vertically scrolling lessons which include a variety of modular elements called Blocks. These Blocks can be as simple as text and image layouts, videos, image galleries, to more complex components like interactive flash cards, tabbed modules and accordions.

Your goal is to implement one of Rise's interactive blocks (see [this Rise course](https://rise.articulate.com/share/YaZWnWdc2El8-M-4gcZ9eQD0lB9iRXDn) for an example).

At a minimum, your implementation should:
- [ ] Decorate the knowledge block returned from [`getKnowledgeCheckBlocks`](/server/src/index.js) with `questions`, `answers`, and `media` from the Postgress Database.
- [ ] Populate your interactive block's configuration from the provided REST API (see [`/server`](/server/src/))
- [ ] Use `react` and JavaScript to create a UI that replicates [the knowledge check block from this sample course](https://rise.articulate.com/share/YaZWnWdc2El8-M-4gcZ9eQD0lB9iRXDn) 
  - You must use React for your UI components
- [ ] Please stick to the visual styles we have in place. It's important that you implement the feature in full, so pay close attention to the details including how your block behaves across screen sizes. Responsiveness is a core component of Rise.
- [ ] In addition to implementing the knowledge check block, your solution must also maintain its visual state across page refreshes. I.e., if you interact with your block and then refresh the page, the UI state of your interactive block should be the same. Extend the provided REST API to achieve this
  - Your interactive block's UI state must be persisted via the REST API (no storing it in localStorage, cookies, etc.)
- [ ] Once completed, push your solution to the Github classroom for us to review. If additional setup steps beyond the ones provided are required, please include them in your submission.
- [ ] _Bonus points for functional JavaScript, but not required._

What you choose to implement from there is up to you. :)

### Implementation notes:

- your interactive block implementation should live in the [`/client`](/client) directory, an app skeleton has been provided in the directory
- the beginnings of a REST API lives in [`/server`](/server/src/) and is reachable at http://localhost:5001
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

The client will be available at port 3000

#### To get the REST API up and running on your dev machine:

1. `cd server`
1. `docker-compose up`

The server will be available at port 5001 and the database will be available at port 7482

### Rebuilding Docker Containers

If you install any new packages or add a new database migration file you'll want to rebuild the docker containers. To do so:

1. Stop your docker containers with `CMD + C` or `CTRL + C`
1. `docker-compose down`
1. `docker-compose up --build`

## Part 2: Discuss with Team

You will discuss your code and explain your decisions to a small group of developers and stakeholders at Articulate. The format is modeled after the way we conduct pairing sessions and is meant to give you a glimpse into the way we work. We are SUPER friendly and it will be a fun conversation.
