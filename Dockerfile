# Step 1: Build the React app
FROM node:17-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code
COPY . .

# Build the app for production
RUN npm run build

# Step 2: Serve the app using Node.js
FROM node:17-alpine

# Set the working directory
WORKDIR /app

# Copy the build output from the previous step
COPY --from=build /app/dist /app/dist

# Install a simple static server
RUN npm install -g serve

# Expose port 3030
EXPOSE 3030

# Start the server to serve the React app
CMD ["serve", "-s", "dist", "-l", "3030"] 
