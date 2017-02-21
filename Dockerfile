#pull base image from stock node image
FROM node

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app
RUN npm install


# Bundle app source
COPY . /usr/src/app

# Build the build
RUN npm run build

# Remove the source - it's running under server/public...
RUN rm -rf /usr/src/app/src



# Your app binds to port 8000 so you'll use the EXPOSE instruction to have it mapped by the docker daemon:
EXPOSE 8000

CMD ["node", "server.js"]
