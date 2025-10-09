# Rural Entrepreneur Backend

A comprehensive Node.js/Express backend API for managing rural entrepreneurship platform. This backend provides authentication, user management, and business/product management capabilities.

## Features

- **User Authentication**: Register, login, JWT-based authentication
- **User Management**: Profile management with location and skills
- **Business Management**: Create, read, update, delete businesses
- **Product Management**: Manage products within businesses
- **Role-Based Access**: Support for entrepreneur, investor, and admin roles
- **Location-Based Filtering**: Search businesses by village, district, or state
- **Category Management**: Multiple business categories (Agriculture, Handicrafts, Dairy, etc.)

## Technology Stack

- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database with Mongoose ODM
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing
- **CORS**: Cross-Origin Resource Sharing enabled

## Installation

1. Clone the repository:
```bash
git clone https://github.com/abhishekcs365/rural-enterpreuner-backend.git
cd rural-enterpreuner-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory based on `.env.example`:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/rural-entrepreneur
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000` (or your configured PORT).

## API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register a new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/me` | Get current user | Private |
| PUT | `/api/auth/profile` | Update user profile | Private |

### Business Routes (`/api/businesses`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/businesses` | Get all businesses | Public |
| GET | `/api/businesses/:id` | Get single business | Public |
| POST | `/api/businesses` | Create new business | Private |
| PUT | `/api/businesses/:id` | Update business | Private (Owner/Admin) |
| DELETE | `/api/businesses/:id` | Delete business | Private (Owner/Admin) |
| GET | `/api/businesses/my-businesses` | Get user's businesses | Private |

### Health Check

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/health` | Server health check | Public |
| GET | `/` | API information | Public |

## API Request Examples

### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "entrepreneur",
  "phone": "1234567890",
  "location": {
    "village": "Sample Village",
    "district": "Sample District",
    "state": "Sample State",
    "pincode": "123456"
  }
}
```

### Login User
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Business
```bash
POST /api/businesses
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "businessName": "Organic Farm",
  "category": "Agriculture",
  "description": "Organic vegetable farming",
  "location": {
    "village": "Green Valley",
    "district": "Rural District",
    "state": "Sample State",
    "pincode": "123456"
  },
  "contactInfo": {
    "phone": "1234567890",
    "email": "farm@example.com"
  },
  "investment": {
    "required": 100000
  },
  "status": "active"
}
```

### Get All Businesses
```bash
GET /api/businesses?category=Agriculture&status=active
```

## Data Models

### User Model
- name, email, password (hashed)
- role (entrepreneur, investor, admin)
- phone, location (village, district, state, pincode)
- profile (bio, skills, experience)

### Business Model
- owner (reference to User)
- businessName, category, description
- location (village, district, state, pincode)
- images, contactInfo
- investment (required, raised)
- employees, startDate, status
- products array

## Security Features

- Password hashing with bcryptjs
- JWT-based authentication
- Protected routes with middleware
- Role-based authorization
- Input validation
- Error handling middleware

## Project Structure

```
rural-enterpreuner-backend/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Auth logic
│   │   └── businessController.js # Business logic
│   ├── middleware/
│   │   ├── auth.js              # Authentication middleware
│   │   └── errorHandler.js      # Error handling
│   ├── models/
│   │   ├── User.js              # User model
│   │   └── Business.js          # Business model
│   ├── routes/
│   │   ├── authRoutes.js        # Auth routes
│   │   └── businessRoutes.js    # Business routes
│   ├── utils/
│   │   └── jwt.js               # JWT utilities
│   ├── app.js                   # Express app setup
│   └── server.js                # Server entry point
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore file
├── package.json                 # Dependencies and scripts
└── README.md                    # Documentation
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/rural-entrepreneur |
| JWT_SECRET | Secret key for JWT | - |
| JWT_EXPIRE | JWT expiration time | 7d |
| NODE_ENV | Environment mode | development |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

ISC