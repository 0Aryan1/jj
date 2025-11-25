// API configuration for client
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const apiClient = {
  async getBlogs() {
    const response = await fetch(`${API_BASE_URL}/api/blogs`);
    if (!response.ok) throw new Error('Failed to fetch blogs');
    return response.json();
  },
  
  async getBlogById(id) {
    const response = await fetch(`${API_BASE_URL}/api/blogs?id=${id}`);
    if (!response.ok) throw new Error('Blog not found');
    return response.json();
  }
};
