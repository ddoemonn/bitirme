# Car Rental API Documentation

## Overview
This API provides services for managing a car rental system including car management, customer management, rental operations, and shop management. The API is RESTful and uses JSON for data exchange.

## Base URL
```
https://carrentalmp-app.azurewebsites.net
```

## Authentication
The API uses token-based authentication. Users need to register and login to get a token.

### Authentication Endpoints

#### Register a new user
```
POST /api/Auth/register
```
Request body:
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

#### Login
```
POST /api/Auth/login
```
Request body:
```json
{
  "username": "string",
  "password": "string"
}
```

#### Get User Info
```
GET /api/Auth/userinfo
```
Returns information about the authenticated user.

## Services

### 1. Cars Service

#### Get All Cars
```
GET /api/Cars
```
Returns a list of all available cars.

#### Get Car by ID
```
GET /api/Cars/{id}
```
Returns details of a specific car by ID.

### 2. Customers Service

#### Get All Customers
```
GET /api/Customers
```
Returns a list of all customers.

#### Get Customer by ID
```
GET /api/Customers/{id}
```
Returns details of a specific customer by ID.

### 3. Rentals Service

#### Get All Rentals
```
GET /api/Rentals
```
Returns a list of all rentals.

#### Get Rental by ID
```
GET /api/Rentals/{id}
```
Returns details of a specific rental by ID.

#### Get Rentals by Customer
```
GET /api/Rentals/customer/{customerId}
```
Returns all rentals for a specific customer.

#### Update Rental Status
```
PUT /api/Rentals/{id}/status
```
Updates the status of a rental.

### 4. Shops Service

#### Get All Shops
```
GET /api/Shops
```
Returns a list of all shops.

#### Get Shop by ID
```
GET /api/Shops/{id}
```
Returns details of a specific shop by ID.

## Data Models

### Car
```json
{
  "carId": "integer",
  "brand": "string",
  "model": "string",
  "year": "integer",
  "dailyPrice": "number",
  "licensePlate": "string",
  "color": "string",
  "isAvailable": "boolean",
  "isDeleted": "boolean",
  "shopId": "integer"
}
```

### Customer
```json
{
  "customerId": "integer",
  "name": "string",
  "surname": "string",
  "email": "string",
  "phone": "string",
  "address": "string",
  "governmentNo": "string",
  "drivingLicenseNo": "string",
  "isDeleted": "boolean"
}
```

### Rental
```json
{
  "rentalId": "integer",
  "customerId": "integer",
  "carId": "integer",
  "shopId": "integer",
  "startDate": "date-time",
  "endDate": "date-time",
  "totalPrice": "number",
  "status": "RentalStatus"
}
```

### Shop
```json
{
  "shopId": "integer",
  "name": "string",
  "address": "string",
  "phoneNumber": "string",
  "workingHours": "WorkingHours"
}
```

### RentalStatus
Enum with values:
- 0: Pending
- 1: Active
- 2: Completed
- 3: Cancelled

## Error Handling
The API returns standard HTTP status codes:
- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error

## Pagination
For endpoints that return lists, pagination is supported through query parameters:
- `page`: Page number (default: 1)
- `pageSize`: Number of items per page (default: 10)

## Data Creation Examples

### Create Car
```json
{
  "brand": "Toyota",
  "model": "Corolla",
  "year": 2022,
  "dailyPrice": 50.00,
  "licensePlate": "ABC123",
  "color": "Red",
  "shopId": 1
}
```

### Create Customer
```json
{
  "name": "John",
  "surname": "Doe",
  "email": "john.doe@example.com",
  "phone": "1234567890",
  "address": "123 Main St",
  "governmentNo": "123456789",
  "drivingLicenseNo": "DL123456"
}
```

### Create Rental
```json
{
  "customerId": 1,
  "carId": 1,
  "shopId": 1,
  "startDate": "2023-08-01T12:00:00",
  "endDate": "2023-08-05T12:00:00"
}
``` 