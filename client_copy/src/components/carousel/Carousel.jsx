// src/components/carousel/Carousel.jsx
import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import BlogCard from '../BlogCard';
import localBlogs from '../../data/blogs';
import { useEffect, useState } from 'react';

export default function Carousel() {
  const [featured, setFeatured] = useState(localBlogs.slice(0, 3));

  useEffect(() => {
    let mounted = true;
    const apiUrl = import.meta.env.VITE_API_URL || '';
    
    fetch(`${apiUrl}/api/blogs`)
      .then(r => r.json())
      .then(data => {
        if (!mounted) return;
        if (Array.isArray(data) && data.length) setFeatured(data.slice(0, 3));
      })
      .catch(() => {});

    return () => { mounted = false; };
  }, []);

  // Create carousel items from blog cards
  const items = featured.map((blog) => (
    <div key={blog.id} className="px-4">
      <BlogCard blog={blog} />
    </div>
  ));

  return (
    <div className="w-full max-w-7xl mx-auto mt-8">
      <AliceCarousel
        mouseTracking
        items={items}
        responsive={{
          0: { items: 1 },      // mobile: 1 card (100% width)
          768: { items: 2 },    // tablet: 2 cards (50% width each)
          1024: { items: 3 }    // desktop: 3 cards (33% width each)
        }}
        infinite
        disableButtonsControls={true}
        autoPlay={true}
        autoPlayInterval={3000}
        autoPlayStrategy="default"
        animationDuration={800}
        disableDotsControls={true}
      />
    </div>
  );
}
