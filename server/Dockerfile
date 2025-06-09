# Use a specific Node.js version for stability and smaller size.
FROM node:20-slim

# Use production node environment by default for smaller image and optimized dependencies.
ENV NODE_ENV production

# Set the working directory in the container.
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Create the uploads directory AND change its ownership to the 'node' user.
RUN mkdir -p uploads && chown node:node uploads && chmod 775 uploads

# Switch to the non-root user 'node'.
USER node

# Copy the rest of the application code into the container.
COPY --chown=node:node . .

# Expose the port that the application listens on.
EXPOSE 5000

# Run the application.
CMD ["node", "server.js"]