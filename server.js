const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

// creating a connection to the database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      // MySQL password
      password: '',
      database: 'employeeTracker_db'
    },
    console.log('Successfully connected to employee database.')
  );

