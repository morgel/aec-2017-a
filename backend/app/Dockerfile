FROM node:7.1-slim

# Create app directory
RUN mkdir -p /backend/src
WORKDIR /backend

# Install app dependencies
ADD package.json /backend/
RUN npm install

# Add app source
ADD src /backend/src

EXPOSE 8080
CMD [ "npm", "start" ]
