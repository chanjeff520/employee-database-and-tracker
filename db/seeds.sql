INSERT INTO department (name)
VALUES  ("Accounting and Finance"),
        ("Human Resources"),
        ("Information Systems"),
        ("Marketing"),
        ("Research and Development");

INSERT INTO role (title, salary, department_id)
VALUES  ("Salesmen/Saleswomen", 80000, 04),
        ("Junior IT", 60000, 03),
        ("Senior IT", 130000, 03),
        ("Advertisment Specialist", 85000, 04),
        ("Full-Stack Developer", 92000, 05),
        ("Accountant", 110000, 01 ),
        ("Manager", 100000, 02);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Mr.", "Crab", 07, NULL),
        ("James", "Charles", 04, NULL),
        ("SpongeBob", "SquarePants", 01, 01),
        ("Sarah", "Bo", 06, 01),
        ("Michelle", "Obama", 05, NULL),
        ("Jerome", "Chelette", 03, 01),
        ("Farley", "Whittles", 02, 01);