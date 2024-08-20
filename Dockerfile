# Use the official Node.js LTS Alpine image as a base image
FROM node:lts-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port the app will run on 5000
EXPOSE 5000

# Start the Next.js application
CMD ["npm", "start"]