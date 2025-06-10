# Use a Node.js image for building the React app
FROM --platform=linux/amd64 node:20-slim AS builder

# Declare the build argument
ARG REACT_APP_API_URL

WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker's cache.
COPY package*.json ./

# Install client dependencies
RUN npm ci

# Copy the rest of the client source code
COPY . .

# Build the React application for production
RUN REACT_APP_API_URL=${REACT_APP_API_URL} npm run build

# Use a Node.js image for the runtime environment
FROM --platform=linux/amd64 node:20-slim AS runner

# Set production environment for runtime
ENV NODE_ENV production

WORKDIR /app

# Copy only the necessary production dependencies (from the builder stage's node_modules)
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev # Only install production dependencies now

# Copy the built static files from the builder stage
COPY --from=builder /app/build ./build

# Copy your static server script
COPY --from=builder /app/server-static.js ./

# Run as non-root user for security
USER node

# Expose the port the Node.js static server will listen on (default 80)
EXPOSE 80

# Command to run the Node.js static server
CMD ["npm", "run", "serve-static"]