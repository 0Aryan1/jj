const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// Blog model (optional persistence)
const blogSchema = new mongoose.Schema({}, { strict: false });
const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

let useDb = false;
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Connected to MongoDB');
      useDb = true;
    })
    .catch((err) => {
      console.warn('Failed to connect to MongoDB, falling back to in-memory data');
    });
}

// In-memory fallback data loader
const blogsData = require(path.join(__dirname, '..', 'client_copy', 'src', 'data', 'blogs.jsx'));
const blogList = Array.isArray(blogsData) ? blogsData : (blogsData.default || []);

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.get('/api/blogs', async (req, res) => {
  try {
    if (useDb) {
      const docs = await Blog.find().lean().limit(200);
      return res.json(docs.length ? docs : blogList);
    }
    res.json(blogList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load blogs' });
  }
});

app.get('/api/blogs/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    if (useDb) {
      const doc = await Blog.findOne({ id }).lean();
      if (doc) return res.json(doc);
    }
    const found = blogList.find(b => b.id === id);
    if (!found) return res.status(404).json({ error: 'Not found' });
    res.json(found);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load blog' });
  }
});

// Serve static client in production if present
const clientBuild = path.join(__dirname, '..', 'client_copy', 'dist');
app.use(express.static(clientBuild));
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  const indexHtml = path.join(clientBuild, 'index.html');
  res.sendFile(indexHtml, (err) => {
    if (err) next();
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
