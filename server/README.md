# Server

This folder contains the server code for the application. It uses Express.js as the web framework, and Prisma as the ORM.

## Endpoints

The following endpoints are currently available:

### Users

* `POST /users`: Create a new user
* `GET /users`: Get a list of all users
* `GET /users/:id`: Get a specific user
* `PUT /users/:id`: Update a specific user
* `DELETE /users/:id`: Delete a specific user

### Events

* `POST /events`: Create a new event
* `GET /events`: Get a list of all events
* `GET /events/:id`: Get a specific event
* `PUT /events/:id`: Update a specific event
* `DELETE /events/:id`: Delete a specific event

### Registrations

* `POST /registrations`: Create a new registration
* `GET /registrations`: Get a list of all registrations
* `GET /registrations/:id`: Get a specific registration
* `PUT /registrations/:id`: Update a specific registration
* `DELETE /registrations/:id`: Delete a specific registration

### Authentication

* `POST /auth/login`: Login as a user
* `POST /auth/signup`: Signup as a user

### Swagger

* `GET /api-docs`: Get the Swagger API documentation

## Running the Server

To run the server, navigate to the `server` folder and run `npm start`. The server will start listening on port 5000.

## Environment Variables

The server expects the following environment variables to be set:

* `DATABASE_URL`: The URL of the database
* `JWT_SECRET`: The secret key used to sign JWT tokens
