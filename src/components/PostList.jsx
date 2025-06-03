import Section from './Section';
import { usePosts } from '../hooks/usePosts';

const PostList = () => {
  const { posts: allPosts, loading, error } = usePosts();

  const latest = allPosts?.filter(p => p.category === 'latest') || [];
  const projects = allPosts?.filter(p => p.category === 'project') || [];
  const til = allPosts?.filter(p => p.category === 'til') || [];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
    <h1>mroziuk<span className='dot'>.</span>dev</h1>
      <Section name="Latest Posts" posts={latest} />
      <Section name="Projects" posts={projects} />
      <Section name="Today I Learned" posts={til} />
    </>
  );
};

export default PostList;