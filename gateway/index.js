const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

// Auth Service
app.use('/auth', createProxyMiddleware({ 
    target: 'http://localhost:4000', 
    changeOrigin: true,
    pathRewrite: { '^/auth': '' } // Changes /auth/login to just /login
}));

// Employee Service (Laravel)
app.use('/employees', createProxyMiddleware({ 
    target: 'http://localhost:8000/api/employees', 
    changeOrigin: true,
    ignorePath: true // This tells the gateway: "Just hit the target exactly as written"
}));

// Attendance Service
app.use('/attendance', createProxyMiddleware({ 
    target: 'http://localhost:5000', 
    changeOrigin: true,
    pathRewrite: { '^/attendance': '' }
}));

app.listen(3000, () => console.log('API Gateway running on port 3000'));