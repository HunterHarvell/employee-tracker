-- seeds data into the created tables
INSERT INTO department (name) VALUES ("Service"), ("Accounting"), ("Sales"), ("Finance");
INSERT INTO role (title, salary, department_id) VALUES ("Salesperson", 40.50, 3), ("Mechanic", 50.00, 1), ("Accountant", 100.00, 2), ("Financial Assistant", 50.00, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Hunter", "Harvell", 1, null), ("Hunter", "Harvell", 2, 1);