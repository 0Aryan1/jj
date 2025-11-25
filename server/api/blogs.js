const path = require('path');
const blogsData = require('../../client_copy/src/data/blogs.jsx');
const blogList = blogsData.default || blogsData.blogs || blogsData;

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Extract id from query params (for /api/blogs?id=1)
  const { id } = req.query;

  if (id) {
    const blogId = parseInt(id, 10);
    const blog = blogList.find(b => b.id === blogId);
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    
    return res.status(200).json(blog);
  }

  // Return all blogs
  return res.status(200).json(blogList);
};
