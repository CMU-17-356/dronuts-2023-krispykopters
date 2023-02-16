# KrispyKopters

Visit us at https://krispykopters.fly.dev/.

## Tools and Technologies

- Collaboration: Slack
- Issue Tracking: GitHub Issues
- Kanban Board: GitHub Projects
- CI: GitHub Actions
- Framework: NodeJS
- Language: Typescript
- Backend: Express
- Package Updates: npm-check-updates
- Linting: ESLint
- Testing: Jest
- Deployment Fly.io

## Repository Setup

- Install [NodeJS/NPM](https://nodejs.org/en/download/)
- Install packages
  - Run `npm install` in the repo root directory
- Install [Docker](https://docs.docker.com/get-docker/)
- Install tools
  - Run `npm install -g npm-check-updates` for dependencies checker
  - Install [`flyctl`](https://fly.io/docs/hands-on/install-flyctl/)

## Workflows

### Lint

- run `npm run lint`

### Build

- run `npm run build`
- this also runs linting as a pre-build step

### Test

- run `npm run test`

### Start app locally

- run `npm run start`
- this also runs build as a pre-start step

### Check dependencies

- run `ncu`

### Docker

- Build docker image:
  - run `docker build -t krispykopters/<unique tag> .`
- Run docker image:
  - run `docker run -it -p 80:3001 -p 3000:3000 krispykopters/<unique tag>`

### Deploy to Fly.io

- run `flyctl auth login`
- run `flyctl deploy`

