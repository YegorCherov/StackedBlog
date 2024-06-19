# MERN Stack Blog Application

![Blog Application Demo](https://github.com/Rozcy/StackedBlog/blob/main/Images/HomeGifCropped.gif)

Welcome to the MERN Stack Blog Application! This impressive project showcases a full-stack web application built using the MERN stack (MongoDB, Express, React, Node.js). It offers a wide range of features, including user authentication, blog post creation, pagination, filtering, searching, and commenting.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Backend Development](#backend-development)
- [Frontend Development](#frontend-development)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Authentication and Authorization](#authentication-and-authorization)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and login with secure authentication
- Create, read, update, and delete blog posts
- Pagination and filtering of blog posts
- Full-text search functionality
- Commenting system for blog posts
- Responsive and visually appealing UI with cool animations

## Technologies Used

- MongoDB: A NoSQL database for storing blog posts, user information, and comments
- Express.js: A web application framework for Node.js to build the server-side API
- React: A JavaScript library for building the user interface components
- Node.js: A JavaScript runtime environment to run the server-side code
- Mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js
- JSON Web Tokens (JWT): A standard for securely transmitting information between parties as a JSON object
- Bcrypt: A library for hashing passwords
- Axios: A promise-based HTTP client for making API requests
- CSS animations: Used to create engaging and interactive user interface elements

## Getting Started

To run the blog application locally, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/blog-application.git`
2. Navigate to the project directory: `cd blog-application`
3. Install the dependencies for the server: `npm install`
4. Install the dependencies for the client: `cd client && npm install`
5. Configure the MongoDB connection URL in `server.js`
6. Start the development server: `npm run dev`
7. Open your browser and visit `http://localhost:3000` to see the application in action

## Backend Development

The backend of the blog application is built using Express.js and Node.js. It handles the API endpoints, interacts with the MongoDB database, and implements authentication and authorization.

![MongoDB Schema](https://github.com/Rozcy/StackedBlog/blob/main/Images/DB.png)

The server-side code is organized into different files and directories:

- `server.js`: The main entry point of the server, where the Express application is configured and the server is started
- `routes/`: Contains the route handlers for different API endpoints
- `models/`: Defines the MongoDB schemas using Mongoose for users, blog posts, and comments
- `middlewares/`: Implements custom middleware functions for authentication and error handling

## Frontend Development

The frontend of the blog application is built using React. It provides a user-friendly interface for interacting with the blog posts, user authentication, and commenting system.

![Home Page](https://github.com/Rozcy/StackedBlog/blob/main/Images/Home.png)
*The home page displays the list of blog posts with pagination and search functionality.*

![Create Post Page](https://github.com/Rozcy/StackedBlog/blob/main/Images/CreatePost.png)
*The create post page allows authenticated users to create new blog posts.*

![Login Page](https://github.com/Rozcy/StackedBlog/blob/main/Images/Login.png)
*The login page provides a user-friendly interface for existing users to log into their accounts securely.*

![Registration Page](https://github.com/Rozcy/StackedBlog/blob/main/Images/Register.png)
*The registration page allows new users to create an account by providing their username, email, and password.*

![Navigation Bar](https://github.com/Rozcy/StackedBlog/blob/main/Images/Navbar.png)
*The navigation bar is present on all pages and provides easy access to different sections of the blog application, including the home page, create post page, login, and registration.*

![Postman](https://github.com/Rozcy/StackedBlog/blob/main/Images/postman-api-Tests.png)
*I used Postman for testing the API endpoints during development. It allowed me to send HTTP requests to the API and verify the responses, ensuring that the API was functioning correctly for various operations such as creating, reading, updating, and deleting blog posts, as well as user authentication and authorization. Additionally, I utilized Postman's load testing capabilities to simulate high traffic scenarios and ensure the API could handle concurrent requests efficiently.*

The React components are organized into separate files and directories:

- `src/components/`: Contains reusable UI components such as navigation bar, blog post card, and form inputs
- `src/pages/`: Defines the main pages of the application, including the home page, blog post details page, and user authentication pages
- `src/services/`: Implements the API service for making HTTP requests to the server
- `src/styles/`: Contains CSS files for styling the components and pages

## API Endpoints

The following API endpoints are available in the blog application:

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Log in an existing user and generate an access token
- `GET /api/posts`: Retrieve a paginated list of blog posts
- `POST /api/posts`: Create a new blog post (authenticated users only)
- `GET /api/posts/:id`: Retrieve a specific blog post by ID
- `PUT /api/posts/:id`: Update a blog post (authenticated users only)
- `DELETE /api/posts/:id`: Delete a blog post (authenticated users only)
- `GET /api/posts/search`: Search for blog posts based on a keyword
- `POST /api/posts/:id/comments`: Add a comment to a blog post (authenticated users only)
- `GET /api/posts/:id/comments`: Retrieve comments for a specific blog post

## Database Schema

The application uses MongoDB as the database and Mongoose as the ODM. The following schemas are defined:

- `User`: Represents a user account and contains fields such as username, email, and password hash
- `Post`: Represents a blog post and contains fields such as title, content, author, and creation date
- `Comment`: Represents a comment on a blog post and contains fields such as content, author, and associated post

## Authentication and Authorization

The blog application implements user authentication and authorization using JSON Web Tokens (JWT). When a user logs in, a JWT is generated and sent back to the client. The client includes this token in the headers of subsequent requests to authenticate and authorize the user.

The server middleware verifies the JWT and extracts the user information from it. Protected routes and API endpoints require a valid JWT to access them.

Passwords are securely hashed using the Bcrypt library before storing them in the database.

## Deployment

The blog application can be deployed to various hosting platforms such as Heroku, AWS, or DigitalOcean. The process typically involves the following steps:

1. Create a production build of the React frontend
2. Set up a production MongoDB database (e.g., MongoDB Atlas)
3. Configure environment variables for the production environment
4. Deploy the server and client code to the hosting platform
5. Set up continuous integration and deployment (CI/CD) pipelines for automated deployments

## Contributing

Contributions to the blog application are welcome! If you find any bugs, have feature requests, or want to contribute improvements, please open an issue or submit a pull request on the GitHub repository.

When contributing, please adhere to the existing code style, write unit tests for new features, and ensure that all tests pass before submitting a pull request.

## License

This project is licensed under the MIT License. Feel free to use, modify, and distribute the code as per the terms of the license.
