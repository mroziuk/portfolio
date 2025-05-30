import { useEffect, useState } from "react";
import { getAllPosts } from "../api/posts";

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await getAllPosts();
        setPosts(res.data);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return { posts, loading, error };
};