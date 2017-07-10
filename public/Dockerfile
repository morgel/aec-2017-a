FROM node:7.1-slim

# Create app directory
RUN mkdir -p /frontend
WORKDIR /frontend

# Install app dependencies
COPY package.json /frontend
RUN npm install

# Add app source
COPY . /frontend

EXPOSE 4200
CMD [ "npm", "start" ]
