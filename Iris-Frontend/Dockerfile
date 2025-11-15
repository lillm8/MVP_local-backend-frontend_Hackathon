# Use the official Node.js 18 image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies with better error handling
RUN npm install --legacy-peer-deps --verbose || (echo "Install failed, trying with force..." && npm install --legacy-peer-deps --force)

# Copy the rest of the application code
COPY . .

# Expose the port that the app runs on
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production

# Build the application
RUN npm run build

# Start the application
CMD ["npm", "start"]
