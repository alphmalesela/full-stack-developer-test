# full-stack-developer-test

## Overview

This project consists of two main components:

1. **Back-end**: An Express.js API.
2. **Front-end**: A Vue.js Quasar application.

The project handles user authentication, data seeding, and user management, including integrations with external APIs and WebSocket communication.

---

## Table of Contents

- [Installation](#installation)
- [Back-end Setup](#back-end-setup)
  - [API Routes](#api-routes)
  - [Token Handling](#token-handling)
- [Front-end Setup](#front-end-setup)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
  - [Login and Token Storage](#login-and-token-storage)
  - [Unique Users](#unique-users)
  - [Seeding Data](#seeding-data)
  - [Engineering Department Reports](#engineering-department-reports)
  - [WebSocket Testing](#websocket-testing)
  - [Dynamic Users](#dynamic-users)
  - [Ordered Users](#ordered-users)
  - [Pie Chart](#pie-chart)

---

## Installation

### Clone the repository

```bash
git clone https://github.com/yourusername/projectname.git
cd projectname
```

---

## Back-end Setup

Navigate to the back-end directory:

```bash
cd back-end
```

### Install dependencies

Make sure you have Node.js installed, then run:

```bash
npm install
```

### Running the back-end server

```bash
npm start
```

The server will run on `http://localhost:3000`.

---

### API Routes

- **Login**: Authentication is required before making other API calls.
  - **POST** `http://localhost:3000/auth/login`

  Request body:
  ```json
  {
      "username": "username",
      "password": "password"
  }
  ```

- **Unique Users**: 
  - **GET** `http://localhost:3000/users/uniqueUsers`  
    Decrypts `users.json`, identifies unique users, and saves them to `uniqueUsers.json`. Duplicates are saved to `duplicateUsers.json`.
  - **POST** `http://localhost:3000/users/uniqueUsers`  
    Reads from `uniqueUsers.json` and makes requests to `https://challenge.sedilink.co.za:12022` for each user, retrying if an error other than "User Already Exists" occurs.

- **Data Seeding**: 
  - **GET** `http://localhost:3000/nosql/seedData`  
    Seeds the database with data from `uniqueUsers.json`.

- **Engineering Department Report**: 
  - **GET** `http://localhost:3000/nosql/engDepReport`  
    Identifies users in the Engineering department reporting to Michael Phalane and returns a count.

- **Dynamic Users**:  
  - **GET** `http://localhost:3000/users/dynamicUsers?designation=MECHANIC`  
    Returns users filtered by designation, if provided, along with a list of unique designations.

- **Ordered Users**:  
  - **GET** `http://localhost:3000/users/orderedUsers`  
    Returns users ordered by designation and department for use in the front-end IndexedDB.

---

### Token Handling

After a successful login, the token is saved to a JSON file, and all subsequent API calls use this token for authentication. Ensure you authenticate first before making further requests.

---

## Front-end Setup

Navigate to the front-end directory:

```bash
cd front-end
```

### Install dependencies

```bash
npm install
```

### Running the front-end app

To run the Vue.js Quasar app, execute:

```bash
quasar dev
```

This will start the development server, which by default runs on `http://localhost:8080`.

### Pie Chart

The front-end includes a pie chart that uses data from `pieChart.json`. This chart dynamically responds to various sizes of data arrays, automatically adjusting the chart representation based on the number of data points.

---

## Environment Variables

Create a `.env` file in the root of the **back-end** project with the following:

```
MONGODB=your_mongo_db_connection_string
```

Make sure to replace `your_mongo_db_connection_string` with the actual connection string to your MongoDB instance.

---

## Usage

### Login and Token Storage

Before calling other APIs, you must log in. Use the login endpoint, and the token will be stored for subsequent requests.

```bash
POST http://localhost:3000/auth/login
```

### Unique Users

- **GET**: Call to fetch unique users and store them in `uniqueUsers.json` and duplicates in `duplicateUsers.json`.

```bash
GET http://localhost:3000/users/uniqueUsers
```

- **POST**: Loop through the users in `uniqueUsers.json` and send them to `https://challenge.sedilink.co.za:12022`.

```bash
POST http://localhost:3000/users/uniqueUsers
```

### Seeding Data

Seed users from `uniqueUsers.json` into MongoDB.

```bash
GET http://localhost:3000/nosql/seedData
```

### Engineering Department Reports

Fetches the total number of users reporting to Michael Phalane.

```bash
GET http://localhost:3000/nosql/engDepReport
```

### WebSocket Testing

When the Express app starts, it triggers a test WebSocket call to:

```bash
wss://challenge.sedilink.co.za:3006
```

The WebSocket receives a reversed string and compares it to the original to verify if the process was successful. Console logs track the process steps.

### Dynamic Users

Fetch users filtered by designation. If no designation is provided, returns all users.

```bash
GET http://localhost:3000/users/dynamicUsers?designation=MECHANIC
```

### Ordered Users

Fetch users ordered by designation and department for use in front-end IndexedDB.

```bash
GET http://localhost:3000/users/orderedUsers
```

The front-end IndexedDB supports CRUD operations with encryption and decryption during create and retrieve operations.

---

### License

[MIT License](LICENSE)
