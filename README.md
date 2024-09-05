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

## Omissions

- Environment variables for prod/dev host urls, etc
- Responsiveness
- UI state per user (login/auth)

## Blockers

Could not implement updates to initial migration and seed file for POST/PUT updates to `UI State` table.
While rebuilding server app container with `docker compose up --build`:

```
	[+] Building 1.4s (9/12)                                                                                                                                                                       docker:desktop-linux
	=> [app internal] load build definition from Dockerfile                                                                                                                                                       0.0s
	=> => transferring dockerfile: 353B                                                                                                                                                                           0.0s
	=> [app internal] load metadata for docker.io/library/node:20.14.0                                                                                                                                            1.2s
	=> [app internal] load .dockerignore                                                                                                                                                                          0.0s
	=> => transferring context: 124B                                                                                                                                                                              0.0s
	=> [app 1/7] FROM docker.io/library/node:20.14.0@sha256:02cd2205818f121c13612721876f28c18bd50148bb8af532ea121c96ffcb59bf                                                                                      0.0s
	=> [app internal] load build context                                                                                                                                                                          0.0s
	=> => transferring context: 860B                                                                                                                                                                              0.0s
	=> CANCELED [app 6/7] ADD https://raw.githubusercontent.com/articulate/docker-consul-template-bootstrap/master/wait-for-it.sh /service/wait-for-it.sh                                                         0.2s
	=> CACHED [app 2/7] WORKDIR /service/                                                                                                                                                                         0.0s
	=> CACHED [app 3/7] COPY package.json yarn.lock ./                                                                                                                                                            0.0s
	=> ERROR [app 4/7] RUN yarn install --frozen-lockfile                                                                                                                                                         0.2s
	------
	> [app 4/7] RUN yarn install --frozen-lockfile:
	0.180 yarn install v1.22.22
	0.199 error SyntaxError: Invalid value type 149:0 in /service/yarn.lock
	0.199     at Parser.unexpected (/opt/yarn-v1.22.22/lib/cli.js:64026:11)
	0.199     at Parser.parse (/opt/yarn-v1.22.22/lib/cli.js:64154:16)
	0.199     at Parser.parse (/opt/yarn-v1.22.22/lib/cli.js:64131:26)
	0.199     at parse (/opt/yarn-v1.22.22/lib/cli.js:64231:21)
	0.199     at module.exports.exports.default (/opt/yarn-v1.22.22/lib/cli.js:63793:96)
	0.199     at Function.<anonymous> (/opt/yarn-v1.22.22/lib/cli.js:3068:63)
	0.199     at Generator.next (<anonymous>)
	0.199     at step (/opt/yarn-v1.22.22/lib/cli.js:310:30)
	0.199     at /opt/yarn-v1.22.22/lib/cli.js:321:13
	0.199 info Visit https://yarnpkg.com/en/docs/cli/install for documentation about this command.
	------
	failed to solve: process "/bin/sh -c yarn install --frozen-lockfile" did not complete successfully: exit code: 1

```
