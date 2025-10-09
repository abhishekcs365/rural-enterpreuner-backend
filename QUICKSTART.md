# Quick Start Guide

Get the Rural Entrepreneur Backend up and running in 5 minutes!

## Step 1: Prerequisites Check

Make sure you have installed:
- ✅ Node.js (v14+) - Check with: `node --version`
- ✅ MongoDB (v4.4+) - Check with: `mongod --version`
- ✅ npm or yarn - Check with: `npm --version`

## Step 2: Install Dependencies

```bash
# Navigate to project directory
cd rural-enterpreuner-backend

# Install all dependencies
npm install
```

## Step 3: Start MongoDB

Choose your operating system:

**Linux/Ubuntu:**
```bash
sudo systemctl start mongodb
# or
sudo service mongodb start
```

**macOS:**
```bash
brew services start mongodb-community
```

**Windows:**
```
Start MongoDB from Windows Services
# or run mongod.exe
```

**Verify MongoDB is running:**
```bash
mongosh --eval "db.version()"
# or for older versions:
mongo --eval "db.version()"
```

## Step 4: Configure Environment

```bash
# Copy example env file
cp .env.example .env

# Edit .env with your settings
nano .env  # or use your favorite editor
```

Minimum required configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/rural-entrepreneur
JWT_SECRET=your_super_secret_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

## Step 5: Start the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

You should see:
```
Server running in development mode on port 5000
MongoDB Connected: localhost
```

## Step 6: Test the API

**Test 1: Health Check**
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-..."
}
```

**Test 2: API Info**
```bash
curl http://localhost:5000/
```

**Test 3: Register a User**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "role": "entrepreneur"
  }'
```

**Test 4: Login**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

Save the `token` from the response!

**Test 5: Create a Business (Protected Route)**
```bash
curl -X POST http://localhost:5000/api/businesses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "businessName": "My First Business",
    "category": "Agriculture",
    "description": "Test business",
    "location": {
      "village": "Test Village",
      "district": "Test District",
      "state": "Test State"
    }
  }'
```

## 🎉 Success!

If all tests passed, your backend is fully operational!

## Next Steps

1. **Frontend Integration**: Connect your frontend to `http://localhost:5000`
2. **Explore API**: Check `API_EXAMPLES.md` for more endpoints
3. **Customize**: Modify models and controllers for your needs
4. **Deploy**: See deployment guide below

## Common Issues

### Issue: "Cannot connect to MongoDB"
**Solution:**
```bash
# Check if MongoDB is running
sudo systemctl status mongodb

# Check MongoDB logs
sudo tail -f /var/log/mongodb/mongod.log

# Restart MongoDB
sudo systemctl restart mongodb
```

### Issue: "Port 5000 already in use"
**Solution:**
```bash
# Find what's using the port
lsof -i :5000

# Kill the process or change PORT in .env
PORT=5001
```

### Issue: "Module not found"
**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Issue: "JWT token invalid"
**Solution:**
- Make sure JWT_SECRET is the same in .env
- Token might be expired (default: 7 days)
- Login again to get a new token

## Development Workflow

```bash
# 1. Start MongoDB
sudo systemctl start mongodb

# 2. Start backend in dev mode
npm run dev

# 3. Make changes to code
# The server auto-reloads with nodemon

# 4. Test your changes
curl http://localhost:5000/api/...

# 5. Stop server
Ctrl + C
```

## Project Structure Quick Reference

```
rural-enterpreuner-backend/
├── src/
│   ├── models/          # Database schemas (User, Business)
│   ├── controllers/     # Business logic
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth, error handling
│   ├── config/          # Database config
│   ├── utils/           # Helper functions
│   ├── app.js          # Express app setup
│   └── server.js       # Server entry point
├── .env                # Your configuration (not in git)
├── .env.example        # Template for .env
├── package.json        # Dependencies
└── README.md          # Full documentation
```

## Useful Commands

```bash
# Start server
npm start

# Development mode with auto-reload
npm run dev

# Check MongoDB connection
mongosh

# View all users
mongosh rural-entrepreneur --eval "db.users.find().pretty()"

# View all businesses
mongosh rural-entrepreneur --eval "db.businesses.find().pretty()"

# Clear database (careful!)
mongosh rural-entrepreneur --eval "db.dropDatabase()"
```

## Testing with Tools

### Using Postman
1. Import curl commands from `API_EXAMPLES.md`
2. Set `{{baseUrl}}` variable to `http://localhost:5000`
3. Set `{{token}}` variable after login

### Using Thunder Client (VS Code)
1. Install Thunder Client extension
2. Create new request
3. Set Authorization → Bearer Token
4. Paste your JWT token

## Production Deployment

Quick checklist before deploying:

- [ ] Change JWT_SECRET to a strong random string
- [ ] Set NODE_ENV=production
- [ ] Use a hosted MongoDB (MongoDB Atlas)
- [ ] Set up HTTPS
- [ ] Add rate limiting
- [ ] Set up logging and monitoring
- [ ] Configure CORS for your frontend domain
- [ ] Set up automated backups

## Support

For more details, check:
- `README.md` - Complete documentation
- `API_EXAMPLES.md` - All API endpoints with examples
- `ARCHITECTURE.md` - Technical architecture details

---

**Happy Coding! 🚀**
