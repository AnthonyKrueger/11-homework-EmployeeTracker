# Department Database Manipulator

  ## Description
  
  This is a node application will allow the user to create and manipulate a database of Departments, Roles, and Employees. This application utilizes an internal API with express.js to route the program. Users can create, delete, and change department, role, and employee data in different ways.
  

  ## Table of Contents
  
  - [Installation](#installation)
  - [Usage](#usage)
  - [Questions](#questions)
  

  ## Installation
  
  MySQL must be installed on the machine this program runs on. A .env file will have to be created with yhe following parameters 
  
  ```
  DB_NAME='name of your database'
 
  DB_USER='your mysql username' 
  
  DB_PASSWORD='your mysql password'
  
  DB_HOST=localhost
  ```
   Once this is done, navigate to the projects directory and run npm i to install all dependencies
  

  ## Usage
  
  After the local express server launches, the user will be taken to the main menu. From here, you can choose from a list of operations to manipulate your database. Selecting to view departments, roles, or employees will display relevant information. 
  
  To begin building your database, you should start by adding a department. From here, you can add roles and assign them to that department. After that, you can add your employees to the roles. All data will be linked accordingly down the tree.
  
  Note: When a Role or Department is deleted, all child roles, employees are deleted as well to save database space. Be careful when deleting parent objects.
  
  ## Video Demo
  
  Link to a video demonstration of this app can be found [HERE](https://drive.google.com/file/d/1wRpU36IDdVjKcVgoPZo_NzKD2KO77TJ3/view)

  ## Questions
  
  Contact me at my [Github Profile](https://github.com/AnthonyKrueger)
  or my email address: anthonykrueger0@gmail.com
  

  
