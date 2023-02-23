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

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This front-end framework references with the guidance and base from an opensource library, please see here: https://github.com/qbentil/Bentilzone-Restaurant.

Thanks Bentil!

## Available Scripts

In the project directory, you can run:

### `npm run lint`

This runs ESLint for the files in the `src/` directory containing the React app and the `server/` directory containing the API server.

### Local development

1. Start the API server with `npm run server`. This starts the backend server at http://localhost:3000.
2. Start the front end development server with `npm start` and let it select a free port. This runs the app in the development mode at http://localhost:3001 (port number may vary).
   - Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
   - The page will reload if you make edits. You will also see any lint errors in the console.

### Hosting

To host the app, the front-end React app needs to be built by running `npm run build`. This compiles and bundles the app for production in the `build` folder.
- This includes optimization, minification and creating hashes.
- See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
