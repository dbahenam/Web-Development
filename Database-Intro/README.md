CRUD Operations:

- Create, Read, Update and Delete. Inefficient with working with all the data, scalability and concurrent file access (multiple read/write operations targetting same file) and too many read/write operations can overwhelm our file system

- Database Management Systems (DBMS) are software systeems optimized for data storage tasks. They optimize Read/write access, data storage and retrieval and data querying(rich queries with filters and conditions)

Two main kinds of systems:

1.  Relational Database Managament Systems (RDBMS/SQL Databases)

    - SQL: Structured Query Language

    - Store normalized data across multiple tables ()

    - Tables: have clearly defined schemas and data types. Data and relations can be queried

2.  Non-Relational Database Management Systems (NoSQL Databases)

    - Work with few tables.

    - Data is stored in JSON format to files. Data duplication occurs.

    - Advantage of this is that you can get more data fetched with **fewer queries**

- Either System can be used and work for a given use-case

- You should think about the queries you'll be running

- SQL databases provide more structure and rules. Scalability can become an issue with SQL databases

- NoSQL databases can be more flexible and reduce amount of require queries
