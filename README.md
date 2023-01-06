# employee-tracker
This application uses mysql to create a database that can store employee information for a company selling cars or boats.

## User Story
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business

## Acceptance Criteria
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database

## Installation and Deployment
You will first need to copy the code repository from https://github.com/HunterHarvell/employee-tracker.git, and install the dependencies for the application using the command `npm i` in your terminal. 

Once the dependencies have finished installing, log into mysql using the command `mysql -u root -p` and entering in your password when prompted. You'll then need to source the database schema and seed data using the mysql commands `SOURCE db/schema.sql` and `SOURCE db/seeds.sql`. This will setup the database and fill it with the starting information.

Quit mysql using the command `quit;`. Now you can run the server using the command `npm start`. You can now follow the prompts and UI to add, edit, and delete the data inside of the database. 

Demonstration video: https://drive.google.com/file/d/1E2Sdy7JBmMObmheMyzogPCiRBYacJGub/view