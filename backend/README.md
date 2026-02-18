# Lancha Backend

Node.js backend server with authentication and DynamoDB integration.

## Features

- Express.js server setup
- User login with password hashing (bcryptjs)
- AWS DynamoDB integration
- CORS support
- Environment configuration
- Error handling

## Prerequisites

- Node.js (v14+)
- npm or yarn
- AWS account with DynamoDB access
- AWS credentials configured

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update `.env` with your AWS credentials and configuration:
```
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
DYNAMODB_TABLE_NAME=lancha_users
PORT=5000
```

## Running the Server

Development mode with auto-reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check
- **GET** `/health`
- Returns server status

### Login (Prepare credentials)
- **POST** `/api/auth/login`
- Request body:
```json
{
  "username": "john_doe",
  "password": "password123"
}
```
- Response:
```json
{
  "success": true,
  "message": "Login prepared successfully",
  "data": {
    "username": "john_doe",
    "timestamp": "2026-02-17T10:30:00.000Z",
    "passwordHash": "..."
  }
}
```

### Authenticate (Verify against stored credentials)
- **POST** `/api/auth/authenticate`
- Request body:
```json
{
  "username": "john_doe",
  "password": "password123"
}
```
- Response:
```json
{
  "success": true,
  "message": "Authentication successful",
  "username": "john_doe"
}
```

## Authentication Flow

### Login Flow
1. User sends username and password to `/api/auth/login`
2. Password is hashed using bcryptjs
3. Username and hashed password are prepared for DynamoDB storage

### Authentication Flow
1. User sends username and password to `/api/auth/authenticate`
2. System retrieves user record from DynamoDB
3. Password is verified against stored hash
4. Last login timestamp is updated on successful authentication

## DynamoDB Table Schema

Expected table structure:
```
Table Name: lancha_users
Primary Key: username (String)

Attributes:
- username (String) - Partition key
- password (String) - Hashed password
- createdAt (String) - ISO timestamp
- lastLogin (String) - ISO timestamp
```

## Security Notes

- Passwords are hashed using bcryptjs with 10 salt rounds
- Never store plain text passwords
- Use HTTPS in production
- Keep AWS credentials secure and never commit `.env` files
- Validate and sanitize all inputs

## Development

To modify the authentication logic, edit [auth.js](auth.js).
To add new endpoints, modify [server.js](server.js).

## License

See LICENSE file in the root directory
