# Welcome to the Rise Developer Challenge!

## Part 1: The Coding Challenge

Rise allows customers to create responsive single page, vertically scrolling lessons which include a variety of modular elements called Blocks. These Blocks can be as simple as text and image layouts, videos, image galleries, to more complex components like interactive flash cards, tabbed modules and accordions.

Your goal is to implement one of Rise's interactive blocks (see [this Rise lesson](https://rise.articulate.com/share/YaZWnWdc2El8-M-4gcZ9eQD0lB9iRXDn#/lessons/lZ0qX7FvbGICXnk-30conqfR_JAFagbh) for an example).

At a minimum, your implementation should:

- [ ] Decorate the knowledge block returned from [`getKnowledgeCheckBlocks`](/server/src/index.ts) with `questions`, `answers`, and `media` from the Postgress Database.
- [ ] Populate your interactive block's configuration from the provided REST API (see [`/server`](/server/src/))
- [ ] Use `react` and TypeScript to create a UI that replicates [the knowledge check block from this sample lesson](https://rise.articulate.com/share/YaZWnWdc2El8-M-4gcZ9eQD0lB9iRXDn#/lessons/lZ0qX7FvbGICXnk-30conqfR_JAFagbh)
  - You must use React for your UI components
- [ ] Please stick to the visual styles we have in place. It's important that you implement the feature in full, so pay close attention to the details including how your block behaves across screen sizes. Responsiveness is a core component of Rise.
- [ ] In addition to implementing the knowledge check block, your solution must also maintain its visual state across page refreshes. I.e., if you interact with your block and then refresh the page, the UI state of your interactive block should be the same. Extend the provided REST API to achieve this
  - Your interactive block's UI state must be persisted via the REST API (no storing it in localStorage, cookies, etc.)
- [ ] Once completed, push your solution to the Github classroom for us to review. If additional setup steps beyond the ones provided are required, please include them in your submission.

What you choose to implement from there is up to you. :)

### Implementation notes

- You only need to implement the box under the "Knowledge Check Block" heading with the image, choices, and feedback; don't worry about implementing the sidebar or lesson header.
- Your interactive block implementation should live in the [`/client`](/client) directory, an app skeleton has been provided in the directory
- The beginnings of a REST API lives in [`/server`](/server/src/) and is reachable at http://localhost:5001
  - The REST API currently only returns the parent `knowledgeCheckBlock` with no questions, answers, or media tied to it.

### Getting started

The challenge should take between 3 and 5 hours depending on experience level and we prefer you not devote more time than that. Instead, we ask that you either self-review your PR or share notes in the "Candidate Notes" section below about features or other details that were omitted due to time constraints. This will give our team the opportunity to see how you prioritize you work and should limit the time commitment required.

Lastly, a "Feedback" pull request is automatically created by GitHub Classroom; please commit your work to the `master` branch and **do not merge** the pull request. When you are satisfied with your solution, share the link to the Feedback pull request with the recruiter. Reviewers will be able to review the diff in the pull request in GitHub.

#### Install Docker

Install [Docker Community Edition](https://hub.docker.com/search?q=&type=edition&offering=community)

- :apple: [macOS](https://hub.docker.com/editions/community/docker-ce-desktop-mac)
- :penguin: [Linux](https://hub.docker.com/search/?type=edition&offering=community&operating_system=linux)
- 🪟 [Windows](https://hub.docker.com/editions/community/docker-ce-desktop-windows)

#### To get the Client up and running on your dev machine:

1. `cd client`
1. `nvm install`
1. `yarn install` (or `npm install`)
1. `yarn start` (or `npm start`)
1. If `yarn start` is throwing errors, you may need to run: `npm_config_yes=true npx yarn-audit-fix`

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

## Part 2: Next Steps

Once submitted, your challenge will be reviewed by one or two engineers on the team. If the submission meets expectations for the role you will be scheduled to discuss the code and explain your decisions to a small group of developers and stakeholders at Articulate. The format is modeled after the way we conduct pairing sessions and is meant to give you a glimpse into the way we work. We are SUPER friendly and it will be a fun conversation.

# Candidate Notes

## Points

- Share types via declarations package or vertical integration via trpc
- Backend join query to save round trips from client
- DB table for UI State

## Issues

- Remove root dir for quick sharing of types via server/client
- CSS modules declarations file
- When running `docker compose up --build` to rebuild to see changes to seed/migrations, blocked by corrupted yarn.lock file (solved by updating docker file to delete yarn.lock and re-install packages without `--frozen-lockfile`, and then use regenerated lockfile from inside container in original workspace
- Realized while debugging queries that all media gifs are the same, so joins are in fact working
- Realized late that I need to run `docker compose down` to retry migrations rather than simply exiting out and re-upping the errored container

## Omissions

- Environment variables for prod/dev host urls, etc
- UI state per user (login/auth)
- Decoupling answers from knowledge blocks to avoid cheating by inspection
- CSS transitions
- Mobile viewport media queries
- Installing exact fonts (icons slightly different)

## Screenies

### Idle

![](/screen_idle.png?raw=true)

### Answered

![](/screen_answered.png?raw=true)

### Mobile

![](/screen_mobile.png?raw=true)
![](/screen_mobile_error.png?raw=true)
