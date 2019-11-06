import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function ApiDisplay() {
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5555/api/posts')

      .then((res) => {
        setBlog(res.data);
      })
      .catch((err) => {
        console.log("Didn't get your data.", err);
      });
  }, []);

  return (
    
    <div>
      <h1>Some Baggins Bloggin'</h1>
      {blog.map((blogEntry) => (
        <>
          <h5>{blogEntry.title}</h5>
          <p>{blogEntry.contents}</p>
        </>
      ))}
    </div>
  );
}
