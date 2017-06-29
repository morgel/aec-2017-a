FROM node:7.1-slim

# Create app directory
RUN mkdir -p /frontend/src
WORKDIR /frontend

# Install app dependencies
ADD package.json /frontend/
RUN npm install

# Add app source
COPY . /frontend

EXPOSE 4200
CMD [ "npm", "start" ]
