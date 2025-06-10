# aura

This repository contains the client and server components of aura.

## Tech Stack

Here's a breakdown of the technologies used in this project:

- **Frontend:**

  - [**React.js**](https://react.dev/): A JavaScript library for building user interfaces.
  - **npm:** Package manager for JavaScript.

- **Backend (Server):**

  - [**Node.js**](https://nodejs.org/): A JavaScript runtime built on Chrome's V8 JavaScript engine.
  - [**Express.js**](https://expressjs.com/): A fast, unopinionated, minimalist web framework for Node.js.
  - **Multer:** A Node.js middleware for handling `multipart/form-data`, primarily used for file uploads.
  - **Cloudinary:** A cloud-based media management platform used for storing and serving audio files.
  - **JSON Web Tokens (JWT):** For secure user authentication.
  - **dotenv:** For loading environment variables from `.env` files.
  - **CORS:** For handling Cross-Origin Resource Sharing.

- **Database:**

  - [**MongoDB**](https://www.mongodb.com/): A NoSQL document database.
  - [**Mongoose**](https://mongoosejs.com/): An ODM (Object Data Modeling) library for MongoDB and Node.js.

- **Deployment & Tools:**
  - [**Docker**](https://www.docker.com/): For containerizing the application.
  - [**Docker Compose**](https://docs.docker.com/compose/): For defining and running multi-container Docker applications.
  - **Render:** Cloud platform for hosting the deployed application.

---

## Setup Instructions

### 1. Environment Variables

This project uses environment variables. You'll need to create local `.env` files. **Remember: Do NOT commit your `.env` files to Git.**

- **Project Root (`aura/.env`)**:

  - This file holds secrets for your Dockerized backend server and crucial local user IDs for Docker permissions.
  - Copy `example.env` from the project root to `.env`:
    ```bash
    cp example.env .env
    ```
  - Fill in your actual values (e.g., MongoDB Atlas URI, JWT secret).
  - **IMPORTANT for Docker Permissions:** You need to add your local user ID and group ID to this file. This is vital for preventing "permission denied" errors when your Docker containers try to write to host-mounted volumes (like the `uploads` folder).

    - Find your UID and GID by running `id -u` and `id -g` in your terminal.
    - Create a [Cloudinary account](https://cloudinary.com/) and get the credentials from the Cloudinary Dashboard.
    - Then, add them to your `.env` file like this:

      ```env
      # .env (in your project root)
      # ... other existing variables like MONGO_URI, JWT_SECRET etc.

      # Cloudinary Credentials (get these from your Cloudinary Dashboard)
      CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
      CLOUDINARY_API_KEY=your_cloudinary_api_key
      CLOUDINARY_API_SECRET=your_cloudinary_api_secret

      # Find these using 'id -u' and 'id -g' in your terminal
      LOCAL_UID=<YOUR_UID_HERE> # e.g., LOCAL_UID=1000
      LOCAL_GID=<YOUR_GID_HERE> # e.g., LOCAL_GID=1000
      ```

      **Make sure to replace `<YOUR_UID_HERE>` and `<YOUR_GID_HERE>` with your actual numbers!**

- **Server Directory (`aura/server/.env`)**:

  - This file is for your local backend server's secrets when running _outside_ Docker (e.g., local MongoDB URI, local JWT secret, same Cloudinary credentials).
  - Copy `server/example.env` to `server/.env`:

    ```bash
    cp server/example.env server/.env
    ```

  - Fill in your actual values.

- **Client Directory (`aura/client/.env`)**:

  - This file is for your local client-side configuration (e.g., the API URL for your local backend).
  - Copy `client/example.env` to `client/.env`:

    ```bash
    cp client/example.env client/.env
    ```

  - Fill in your actual values (e.g., `REACT_APP_API_URL=http://localhost:5000`).

---

### 2. Install Dependencies

- **Server:**
  ```bash
  cd server
  npm install
  cd ..
  ```
- **Client:**
  ```bash
  cd client
  npm install
  cd ..
  ```

---

### 3. Running the Application

1.  Ensure Docker Desktop is running.

2.  From your project root:
    ```bash
    docker compose up --build
    ```
3.  Open your browser to `http://localhost`.
