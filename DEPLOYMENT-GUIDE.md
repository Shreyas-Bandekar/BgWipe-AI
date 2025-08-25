# BgWipe AI Deployment Guide

## Architecture
- **Frontend**: Deployed on Vercel
- **Backend**: Deployed on Render
- **Database**: MongoDB Atlas

## Prerequisites
1. MongoDB Atlas account
2. Clerk account for authentication
3. ClipDrop API key
4. Vercel account (for frontend)
5. Render account (for backend)

---

## Frontend Deployment (Vercel)

### 1. Environment Variables
Create a `.env` file in the `client` directory:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BACKEND_URL=https://your-backend.onrender.com
```

### 2. Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Set root directory to `client`
3. Add environment variables in Vercel dashboard
4. Deploy

---

## Backend Deployment (Render)

### 1. Environment Variables
Set these in your Render dashboard:
```env
MONGO_URI=your_mongodb_connection_string
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
CLIPDROP_API=your_clipdrop_api_key
FRONTEND_URL=https://your-frontend.vercel.app
NODE_ENV=production
```

### 2. Deploy to Render
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set root directory to `server`
4. Build command: `npm install`
5. Start command: `npm start`
6. Add all environment variables
7. Deploy

---

## Configuration Steps

### 1. MongoDB Atlas Setup
1. Create a MongoDB Atlas cluster
2. Add your IP to whitelist (or use 0.0.0.0/0 for Render)
3. Create a database user
4. Get the connection string
5. Replace `<password>` and `<username>` in the connection string

### 2. Clerk Setup
1. Create a Clerk application
2. Get the publishable key for frontend
3. Create a webhook endpoint: `https://your-backend.onrender.com/api/user/webhooks`
4. Enable events: `user.created`, `user.updated`, `user.deleted`
5. Copy the webhook secret

### 3. ClipDrop API
1. Sign up at ClipDrop
2. Get your API key
3. Add it to backend environment variables

### 4. CORS Configuration
Update the `FRONTEND_URL` in your Render environment variables with your actual Vercel deployment URL.

---

## Testing Deployment

### Backend Health Check
Visit: `https://your-backend.onrender.com/health`
Should return: `{"success": true, "message": "Server is healthy"}`

### Frontend Test
1. Visit your Vercel frontend URL
2. Sign up/Sign in with Clerk
3. Upload an image
4. Test background removal

---

## Common Issues & Solutions

### Issue: CORS Errors
**Solution**: Ensure `FRONTEND_URL` in Render matches your Vercel URL exactly

### Issue: MongoDB Connection Failed
**Solution**: 
- Check MongoDB Atlas IP whitelist
- Verify connection string format
- Ensure database user has proper permissions

### Issue: Clerk Webhook Not Working
**Solution**:
- Verify webhook URL is correct
- Check webhook secret matches
- Ensure all required events are enabled

### Issue: ClipDrop API Errors
**Solution**:
- Verify API key is correct
- Check ClipDrop API limits
- Ensure image format is supported

### Issue: File Upload Fails
**Solution**:
- Check file size limits (max 10MB)
- Verify multer configuration
- Ensure proper Content-Type headers

---

## Production Optimizations

### Backend (Render)
- Disk storage for file uploads
- Automatic cleanup of temporary files
- Environment-based database connections
- Proper error handling without exposing sensitive data

### Frontend (Vercel)
- Optimized build with Vite
- Static asset caching
- Environment-specific API URLs

### Security
- CORS properly configured
- No sensitive data in console logs
- Environment variables for all secrets
- JWT token validation

---

## Monitoring

### Backend Logs
Check Render logs for:
- Database connection status
- API errors
- File upload issues

### Frontend Errors
Check browser console for:
- Network errors
- Authentication issues
- API response errors

### Database Monitoring
Monitor MongoDB Atlas for:
- Connection count
- Query performance
- Storage usage

---

## Scaling Considerations

1. **Database**: Use MongoDB Atlas auto-scaling
2. **Backend**: Render auto-scales based on traffic
3. **Frontend**: Vercel handles CDN and scaling automatically
4. **File Storage**: Consider cloud storage (AWS S3, Cloudinary) for production

---

## Support

For deployment issues:
- **Vercel**: [Vercel Documentation](https://vercel.com/docs)
- **Render**: [Render Documentation](https://render.com/docs)
- **MongoDB Atlas**: [Atlas Documentation](https://docs.atlas.mongodb.com/)
- **Clerk**: [Clerk Documentation](https://clerk.com/docs)
