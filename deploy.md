# BloodLink Deployment Guide

## Backend Deployment (Railway)

1. Install Railway CLI:
   ```bash
   npm install -g @railway/cli
   ```

2. Deploy backend:
   ```bash
   cd server
   railway login
   railway init
   railway up
   ```

3. Set environment variables in Railway dashboard:
   - MONGODB_URI: (your Atlas connection string)
   - JWT_SECRET: BloodLink_Super_Secure_JWT_Secret_Key_2024_Production_Ready
   - NODE_ENV: production
   - PORT: 5001

## Frontend Deployment (Vercel)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy frontend:
   ```bash
   cd client
   vercel
   ```

3. Set environment variable in Vercel dashboard:
   - VITE_API_URL: https://your-backend-url.railway.app/api

## Alternative: Manual Build & Deploy

### Backend (any hosting service):
```bash
cd server
npm install
npm start
```

### Frontend (static hosting):
```bash
cd client
npm install
npm run build
# Upload dist/ folder to hosting service
```

## Important Notes:
- Update VITE_API_URL after backend deployment
- Ensure MongoDB Atlas IP whitelist includes 0.0.0.0/0
- Test both deployments before going live