# Library/E-commerce Application API

This repository contains a Node.js/Express.js application with RESTful API endpoints for e-commerce application. The API allows you to interact with products in the store.

## The application includes the following features:

1. Create products /categories / users/ orders models for the backend to function.
2. Create routes to handle CRUD requests.
3. Implement a route to handle GET requests for fetching a  product based on a unique identifier (e.g., product ID).
4. Include functionality to retrieve products in batches or limit the number of items returned in a single request.
5. Implement a route to handle GET requests with query parameters for filtering products based on specific criteria (e.g., by category, price range).
6. Add validation checks to ensure the data meets certain criteria before performing create or update operations (e.g., validating required fields, data format) using express validator.
7. Create routes to handle GET requests to fetch products sorted in a specific order (e.g., by title, by date added).
8. Implement search functionality to allow users to search for specific products based on keywords or specific fields (e.g., by title).
9. Integrate JWT authentication and authorization mechanisms to secure the API endpoints and restrict access to certain routes or operations.
10. Add functionality to handle related resources (e.g., add routes for placing an order).
