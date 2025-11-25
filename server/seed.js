const mongoose = require('mongoose');
const path = require('path');

const MONGO_URI = process.env.MONGO_URI || '';
if (!MONGO_URI) {
  console.error('MONGO_URI not set. Seed requires a MongoDB connection.');
  process.exit(1);
}

const blogsData = require(path.join(__dirname, '..', 'client_copy', 'src', 'data', 'blogs.jsx'));
const blogList = Array.isArray(blogsData) ? blogsData : (blogsData.default || []);

const blogSchema = new mongoose.Schema({}, { strict: false });
const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

async function seed() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await Blog.deleteMany({});
  await Blog.insertMany(blogList);
  console.log('Seeded', blogList.length, 'blogs');
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
