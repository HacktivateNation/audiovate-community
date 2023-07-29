# Use the official Node.js image as the base image
FROM node:18
COPY package*.json ./
RUN npm install -g nodemon
RUN npm install
COPY index.js ./
EXPOSE 3000
CMD ["", "nodemon index.js"]
