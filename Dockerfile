# Use the official Node.js image with the Alpine variant as the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Install nodemon globally (for development purposes)
RUN npm install -g nodemon

# Copy the rest of the application code to the container
COPY . .

# Expose the port your Express app listens on
EXPOSE 3000

# Define the command to run your app using nodemon
CMD ["nodemon", "index.js"]
