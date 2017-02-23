#pull base image from stock node image
FROM node

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Use Yarn instead of npm
RUN npm install yarn -g

# Install app dependencies
COPY package.json /usr/src/app
RUN yarn install

# Install knex to run the migrations
RUN yarn install knex -g

# Bundle app source
COPY . /usr/src/app

# Build the build
RUN yarn run build

# Remove the source - it's running under server/public...
RUN rm -rf /usr/src/app/src



# Your app binds to port 8000 so you'll use the EXPOSE instruction to have it mapped by the docker daemon:
EXPOSE 8000

CMD ["node", "server.js"]
