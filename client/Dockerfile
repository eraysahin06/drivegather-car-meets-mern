# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY . .

# Build the app
RUN npm run build

# Serve the app using a simple server
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-p", "3001"]

# Expose the port the app runs on
EXPOSE 3001
