module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  return res.status(200).json({ 
    ok: true, 
    message: 'Jargonaut API Server',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      blogs: '/api/blogs',
      blogById: '/api/blogs?id={id}'
    },
    timestamp: new Date().toISOString()
  });
};
