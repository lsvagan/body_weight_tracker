# Body weight tracker

This app allow users to create account, enter date and body weight measurement. All measurements are saved and user can keep track all of his measurements in this application.

## Functionality
1. CREATE
* User accounts
2. READ
* Users measurements
3. ADD
* New measurement
4. DELETE
* Unneeded measurement

## USED TECHNOLOGIES
1. HTML/CSS/JavaScript/React
2. Node.js/Express
3. Database PostgreSQL
4. Postman - for testing endpoints

## DOWNLOAD PROJECT & INSTALL
1. Clone this project
2. Open Command line
3. Navigate to the **weight_tracker_backend** directory
4. Run this command: psql -f db/schema.sql -U postgres
5. This command will create PostgreSQL database with tables
6. Before run server.js, you need to install all dependencies, run command: npm install
7. To start server, run command: npm start
8. Now server running at port 3000
9. Navigate to the **weight_tracker_frontend** directory
10. Run command: npm install, and then run command: npm start
11. Server is already running on port 3000, run react app on another port

### notice
If you have a problem with database connection, check this [link](https://expressjs.com/en/guide/database-integration.html#postgresql)

