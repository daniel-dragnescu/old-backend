# HamRadioLog

---

### Description

HamRadioLog is a web application for amateur radio (ham radio) operators to log their QSOs (contacts) with other operators. Users can record details about each contact, including callsigns, signal reports, operator names, locations, and comments. The application provides features for managing QSO logs, searching and filtering entries, visualizing data, and exporting/importing logs.

---

### Purpose

The purpose of HamRadioLog is to provide ham radio operators with a convenient tool for managing and tracking their communications. By logging their QSOs, operators can keep records of their contacts, analyze their activity, and participate in contests or awards programs.

---

### Dependencies

- **node.js**: A JavaScript runtime environment that allows server-side execution of JavaScript code.
- **bcrypt**: A library for hashing passwords securely.
- **cookie-parser**: Middleware for handling cookies in Express applications.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing (CORS) in Express.
- **date-fns**: A library for working with dates and times in JavaScript.
- **dotenv**: A zero-dependency module for loading environment variables from a .env file.
- **express.js**: A popular web application framework for Node.js that simplifies routing, middleware handling, and request/response management.
- **express-async-handler**: A utility to handle asynchronous functions in Express route handlers.
- **jsonwebtoken**: A library for generating and verifying JSON Web Tokens (JWT) for authentication.
- **mongoDB**: A NoSQL database used to store QSO logs and other data.
- **mongoose**: An Object Data Modeling (ODM) library for MongoDB, which provides an elegant way to interact with MongoDB databases.
- **uuid**: A library for generating universally unique identifiers (UUIDs).

---

### Installation Instructions

1. Clone the repository to your local machine.
2. Run `npm install` to install all required dependencies.
3. Create a `.env` file and add necessary environment variables.
4. Start the server by running `npm start`.

---

### How to Run the App

After installation, execute `npm run start` from your command line within the project directory to launch the application. The application will be accessible at http://localhost:3500/.

---

### Example Usage

1. **API Endpoints:**
   - `GET /qso`: Get all QSOs.
   - `POST /qso`: Create a new QSO.
   - `PATCH /qso/:id`: Update an existing QSO.
   - `DELETE /qso/:id`: Delete a QSO.

   - `POST /register`: Register a new user.
  
   - `POST /auth/login`: Login with username and password.

   - `PATCH /users/:id`: Update user information (password and email only). 
   
2. **Examples of Usage:**
   - **Get all QSOs:**
     ```
     GET /qso
     ```

   - **Create a new QSO:**
     ```
     POST /qso
     Body:
     {
       "callsign": "example_callsign",
       "rst_received": 59,
       "rst_sent": 59,
       "op": "Operator Name",
       "qth": "Location",
       "comments": "Optional comments"
     }
     ```

   - **Update an existing QSO:**
     ```
     PATCH /qso/:id
     Body:
     {
       "callsign": "updated_callsign",
       "rst_received": 59,
       "rst_sent": 59,
       "op": "Updated Operator Name",
       "qth": "Updated Location",
       "comments": "Updated comments"
     }
     ```

   - **Delete a QSO:**
     ```
     DELETE /qso/:id
     Body:
     {
       "id": "QSO_ID"
     }
     ```

    - **Register a new user:**
      ```
      POST /register
      Body:
      {
        "username": "example_user",
        "password": "example_password"
      }
      ```

    - **Login with username and password:**
      ```
      POST /auth/login
      Body:
      {
        "username": "example_user",
        "password": "example_password"
      }
      ```

    - **Update user information (password and email only):**
      ```
      PATCH /users/:id
      Body:
      {
        "email": "new_email@example.com",
        "password": "new_password"
      }
      ```

      ### Middleware

      - verifyJWT: Middleware to verify JSON Web Tokens (JWT) for protecting routes.
      
      ### Notes

      - All routes except for `/register` and `/auth/login` are protected and require a valid JSON Web Token (JWT) for authentication.

      - The `/register` route allows users to create new accounts with a username and password.

      - The `/auth/login` route authenticates users with their username and password and returns a JWT upon successful authentication.

      - JSON Web Tokens (JWT) are used for authentication and have a validity period of 4 hours.

      - The `/users/:id` route allows users to only update their password and email.
