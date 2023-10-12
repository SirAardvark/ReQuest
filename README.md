# ReQuest - IOD Capstone Project - Justin Aavik

ReQuest is a simple and fast support request management system.

## How to Setup/Run ReQuest locally

1. Download the Repo
2. Run the SQL query in /setup/setupDB.sql to create all the tables in your local MySQL server
3. Run npm init on both the server folder and client folder terminal
4. Create a .env file in the server folder with the below fields and enter your MySQL info where the {} is.

MYSQL_DATABASE={}
MYSQL_USER={}
MYSQL_PASSWORD={}
MYSQL_HOST=localhost
MYSQL_PORT={}

5. Start the server using command npm start in the terminal (If working it will say server is running on port 8080)
6. Start the client using command npm run dev in the terminal
7. Click the link it outputs and you are now running ReQuest locally.

## Server API Calls

http://localhost:8080/

### GET

##### Requests:

-   /requests
-   /requests/:id

##### Request Status

-   /request_status
-   /request_status/:id

##### Request Activities

-   /request_activities/:id
-   /request_activity_config

##### User

-   /users
-   /users/:id
-   /user_name/id

##### User Type

-   /user_roles
-   /user_roles/:id

### POST

##### Requests:

-   /new_request

##### Request Activities

-   /new_request_activity

### PUT

##### Requests:

-   /update_request_status/:id
