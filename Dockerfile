FROM node:alpine3.11
LABEL org.opencontainers.image.authors="https://github.com/orgs/CMU-17-356/teams/krispykopters"

# Change working directory
WORKDIR /usr/src/app

# Install App Dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy App Source
COPY ./dist ./dist
COPY ./build ./build
#TODO Run any build scripts here

EXPOSE 3000
CMD [ "node", "./dist/server/index.js" ]
