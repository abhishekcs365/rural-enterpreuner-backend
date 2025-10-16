# API Examples

This document provides curl command examples for testing all API endpoints.

## Base URL
```
http://localhost:5000
```

## Authentication Endpoints

### 1. Register New User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "entrepreneur",
    "phone": "9876543210",
    "location": {
      "village": "Green Valley",
      "district": "Sample District",
      "state": "Sample State",
      "pincode": "123456"
    }
  }'
```

### 2. Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Response will include a JWT token. Save it for authenticated requests:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "entrepreneur"
  }
}
```

### 3. Get Current User Profile
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 4. Update User Profile
```bash
curl -X PUT http://localhost:5000/api/auth/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "John Updated",
    "phone": "9876543211",
    "profile": {
      "bio": "Passionate rural entrepreneur",
      "skills": ["Agriculture", "Marketing", "Management"],
      "experience": "5 years in organic farming"
    }
  }'
```

## Business Endpoints

### 5. Create New Business
```bash
curl -X POST http://localhost:5000/api/businesses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "businessName": "Organic Farm Products",
    "category": "Agriculture",
    "description": "We produce 100% organic vegetables and fruits using traditional farming methods",
    "location": {
      "village": "Green Valley",
      "district": "Sample District",
      "state": "Sample State",
      "pincode": "123456"
    },
    "contactInfo": {
      "phone": "9876543210",
      "email": "farm@example.com",
      "whatsapp": "9876543210"
    },
    "investment": {
      "required": 100000
    },
    "employees": 5,
    "status": "active",
    "products": [
      {
        "name": "Organic Tomatoes",
        "description": "Fresh organic tomatoes",
        "price": 50,
        "unit": "kg"
      }
    ]
  }'
```

### 6. Get All Businesses
```bash
# Get all businesses
curl -X GET http://localhost:5000/api/businesses

# Filter by category
curl -X GET "http://localhost:5000/api/businesses?category=Agriculture"

# Filter by status
curl -X GET "http://localhost:5000/api/businesses?status=active"

# Filter by location
curl -X GET "http://localhost:5000/api/businesses?state=Sample State&district=Sample District"
```

### 7. Get Single Business
```bash
curl -X GET http://localhost:5000/api/businesses/BUSINESS_ID
```

### 8. Update Business
```bash
curl -X PUT http://localhost:5000/api/businesses/BUSINESS_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "businessName": "Updated Organic Farm",
    "description": "Updated description",
    "status": "seeking-investment"
  }'
```

### 9. Delete Business
```bash
curl -X DELETE http://localhost:5000/api/businesses/BUSINESS_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 10. Get My Businesses (Logged in user's businesses)
```bash
curl -X GET http://localhost:5000/api/businesses/my-businesses \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Health Check

### 11. Check Server Health
```bash
curl -X GET http://localhost:5000/api/health
```

### 12. Get API Information
```bash
curl -X GET http://localhost:5000/
```

## Business Categories

Available business categories:
- Agriculture
- Handicrafts
- Dairy
- Poultry
- Food Processing
- Textile
- Services
- Other

## Business Status Options

Available business statuses:
- planning
- active
- seeking-investment
- closed

## User Roles

Available user roles:
- entrepreneur (default)
- investor
- admin

## Tips

1. **Save the JWT Token**: After login, save the token from the response and use it in the `Authorization: Bearer TOKEN` header for authenticated requests.

2. **Replace Placeholders**: 
   - Replace `YOUR_JWT_TOKEN` with actual JWT token from login
   - Replace `BUSINESS_ID` with actual business ID from database

3. **Testing with Postman**: You can import these curl commands directly into Postman for easier testing.

4. **Error Responses**: The API returns consistent error responses:
   ```json
   {
     "success": false,
     "message": "Error message here"
   }
   ```

5. **Success Responses**: All successful responses include:
   ```json
   {
     "success": true,
     "message": "Success message",
     "data": { ... }
   }
   ```
