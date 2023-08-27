# Backend-NodeJs-MySQL
a backend application using Node.js and MySQL that manages family member information for a Family Tree Visualization project. The backend should handle CRUD operations for family members and their relationships.

## Setup

To set up the project on your local machine, follow these steps:

1. Clone the repository:
2. Install dependencies:express, body-parser , mysql2
3. Configure database: create a database named 'family', then run queries mentioned in file 'schema.sql'
4. Start the server:use the command 'nodemon' in terminal

## API Endpoints

### Family Members

- `GET /relations`: Retrieve a list of all relations.
- `GET /relations/:id`: Retrieve details of a specific relation.
- `POST /relations`: Add a new relation.
- `PUT /relations/:id`: Update details of a relation.
- `DELETE /relations/:id`: Delete a relation.
