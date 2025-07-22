Hello! This is my first professional project where I aim to learn how to build and manage a full-stack application from scratch—just like it's done in the industry.

I'm developing a basic E-Commerce Website where users can browse, buy, and sell products. The goal is to get hands-on experience in backend development, project structuring, Dockerization, and eventually, full deployment.

This journey is both a fun and educational experience, helping me understand how real-world projects are developed and maintained.

Thank you for checking it out!

## Getting Started

Follow these instructions to run the project locally using Docker.

## Environment Variables

Create a `.env` file in the root directory based on `.env.example`.

```Example:
PORT=5000
DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<db_name>
JWT_SECRET=yourSecretKey
```
Make sure to update the values according to your environment if needed.


## Docker Setup

To build and run the application using Docker Compose:

1. Make sure Docker is installed and running on your system.
2. Build and start the services:

docker-compose up --build

This will:
- Build the backend Docker image
- Start a PostgreSQL container
- Sync the database using Sequelize
- Start your Express server on `http://localhost:3000` (or whatever port is in `.env`)


