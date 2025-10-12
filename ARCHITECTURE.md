# Backend Architecture

## Overview
This document describes the architecture of the Rural Entrepreneur Backend API.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Frontend Client                          │
│                  (React/Vue/Angular/Mobile App)                  │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTP/HTTPS
                             │ JSON API
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Express Server                            │
│                      (Port 5000 Default)                         │
├─────────────────────────────────────────────────────────────────┤
│  Middleware Layer                                                │
│  ├── CORS                                                        │
│  ├── Body Parser                                                 │
│  ├── Authentication (JWT)                                        │
│  └── Error Handler                                               │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                         Routes Layer                             │
├──────────────────────────┬──────────────────────────────────────┤
│  /api/auth               │  /api/businesses                      │
│  ├── POST /register      │  ├── GET /                            │
│  ├── POST /login         │  ├── GET /:id                         │
│  ├── GET /me             │  ├── POST /                           │
│  └── PUT /profile        │  ├── PUT /:id                         │
│                          │  ├── DELETE /:id                      │
│                          │  └── GET /my-businesses               │
└──────────────────────────┴───────────────┬───────────────────────┘
                                           │
                                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Controllers Layer                           │
├──────────────────────────┬──────────────────────────────────────┤
│  authController          │  businessController                   │
│  ├── register()          │  ├── getBusinesses()                  │
│  ├── login()             │  ├── getBusiness()                    │
│  ├── getMe()             │  ├── createBusiness()                 │
│  └── updateProfile()     │  ├── updateBusiness()                 │
│                          │  ├── deleteBusiness()                 │
│                          │  └── getMyBusinesses()                │
└──────────────────────────┴───────────────┬───────────────────────┘
                                           │
                                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Models Layer                              │
├──────────────────────────┬──────────────────────────────────────┤
│  User Model              │  Business Model                       │
│  ├── name                │  ├── owner (ref: User)                │
│  ├── email               │  ├── businessName                     │
│  ├── password (hashed)   │  ├── category                         │
│  ├── role                │  ├── description                      │
│  ├── phone               │  ├── location                         │
│  ├── location            │  ├── contactInfo                      │
│  └── profile             │  ├── investment                       │
│                          │  ├── employees                        │
│                          │  ├── status                           │
│                          │  └── products[]                       │
└──────────────────────────┴───────────────┬───────────────────────┘
                                           │
                                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                      MongoDB Database                            │
│                                                                   │
│  Collections:                                                    │
│  ├── users                                                       │
│  └── businesses                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Request Flow

### Authentication Flow
```
1. Client → POST /api/auth/register
2. Controller validates input
3. Hash password with bcryptjs
4. Save user to MongoDB
5. Generate JWT token
6. Return token + user info to client

For subsequent requests:
1. Client includes JWT in Authorization header
2. Auth middleware validates token
3. Attach user to request object
4. Controller processes request
5. Return response
```

### Business CRUD Flow
```
1. Client → Request with JWT token
2. Auth middleware validates token
3. Controller processes request
4. Access/modify MongoDB
5. Return JSON response

Protected routes require valid JWT token
Owner-only routes check user.id === business.owner
```

## Security Features

### Password Security
- Passwords hashed with bcryptjs (10 salt rounds)
- Never stored in plain text
- Never returned in API responses (select: false)

### JWT Authentication
- Tokens signed with secret key
- Default expiration: 7 days (configurable)
- Required for protected routes
- Validated by auth middleware

### Authorization
- Role-based access control (entrepreneur, investor, admin)
- Owner verification for update/delete operations
- Public read access for business listings

## Data Flow

```
User Registration:
Client → authController.register() → User.create() → MongoDB
       ← JWT Token ← generateToken() ← User Saved

User Login:
Client → authController.login() → User.findOne() → MongoDB
       ← JWT Token ← comparePassword() ← User Found

Create Business:
Client → protect middleware → businessController.create() → Business.create() → MongoDB
       ← Business Data ← Business Saved

Get Businesses:
Client → businessController.getBusinesses() → Business.find() → MongoDB
       ← Business List ← Query Results
```

## Error Handling

All errors pass through the error handler middleware which:
1. Formats error response consistently
2. Handles Mongoose-specific errors
3. Returns appropriate HTTP status codes
4. Logs errors in development mode

## Environment Configuration

Key configuration managed through .env:
- PORT: Server port
- MONGODB_URI: Database connection string
- JWT_SECRET: Token signing secret
- JWT_EXPIRE: Token expiration time
- NODE_ENV: Environment mode

## API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

## Scalability Considerations

### Current Architecture
- Stateless design (JWT tokens)
- Horizontal scaling ready
- Database queries optimized with indexes
- CORS enabled for multiple frontends

### Future Enhancements
- Redis for session/cache management
- File upload (images) with cloud storage
- Search functionality with text indexes
- Real-time features with WebSocket
- API rate limiting
- Logging and monitoring
- Pagination for large datasets
- GraphQL support

## Technology Stack Summary

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Authentication | JWT (jsonwebtoken) |
| Password Hashing | bcryptjs |
| CORS | cors middleware |
| Environment | dotenv |
