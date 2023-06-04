# Activities App
#### The Project Name is a web application that provides users with functionalities related to user activities, achievements, and a calendar. It consists of both frontend and backend components, which work together to deliver a seamless user experience.

## Frontend
#### The frontend of the project is built using React, a popular JavaScript library for building user interfaces. It leverages the power of React components to create a responsive and interactive application. The main components of the frontend are:

LoginPage: Allows users to log in using their email and password. It validates the user's credentials by making a POST request to the backend API for authentication.

Home: The home page of the application displays the user's activities and allows them to add new hobbies. It also includes a calendar component that shows the user's schedule.

Calendar: This component provides a weekly view of the user's activities. It fetches the activity data from the backend API and renders it in a calendar grid.

Achievements: Displays the user's achievements and allows them to unlock new achievements by interacting with the UI. It communicates with the backend API to retrieve and update achievement data.

HomeCalendar: A sub-component of the Home page, it displays the user's activities for the current day. It fetches data from the backend API and renders it in the calendar grid.

and more...

## Backend
#### The backend of the project is built using Node.js, Express, and SQLite. Node.js provides the runtime environment to run JavaScript on the server-side, while Express is a web application framework that simplifies backend development. SQLite is used as the database management system to store and retrieve data.

Key techniques used in the backend:

Node.js: A JavaScript runtime that executes JavaScript code on the server-side.

Express: A web application framework for Node.js that provides a robust set of features and tools for building APIs.

SQLite: A lightweight, file-based database management system used to store user information, activities, and achievements.

The backend server handles various API endpoints, including user authentication, data retrieval, and updates. It uses Express to define routes and controllers to handle the logic for each endpoint. SQLite is used to establish a connection to the database and execute SQL statements.

## Installation and Usage
To install and run the project, follow these steps:

Clone the repository to your local machine:

##### git clone <repository-url>

Navigate to the project directory:

##### cd <project-directory>

Install the frontend and backend dependencies:

##### cd ./activity-backend
npm install
##### cd ./activity-app
npm install

Start the development server:

##### cd ./activity-backend
npm start
##### cd ./activity-app
npm start

Open the application in your browser:

##### http://localhost:3000

Ensure that both the frontend and backend servers are running simultaneously for the application to function properly.

### Configuration
The frontend is configured to communicate with the backend API located at http://localhost:3016. If the API URL needs to be modified, you can change the url variable in the frontend code.


