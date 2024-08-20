FROM node:lts-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port Next.js is running on (default: 3000)
EXPOSE 5000

# Start the Next.js application
CMD ["npm", "start"]