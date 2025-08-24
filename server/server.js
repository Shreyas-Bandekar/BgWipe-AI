
export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Handle different routes
  if (req.url === '/' && req.method === 'GET') {
    res.status(200).json({
      success: true,
      message: "API is working",
      timestamp: new Date().toISOString()
    });
  } else if (req.url === '/health' && req.method === 'GET') {
    res.status(200).json({
      success: true,
      message: "Server is running",
      timestamp: new Date().toISOString()
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Route not found"
    });
  }
}
