import { Link } from 'react-router-dom';

const Post = ({ post }) => {
  return (
    <div className="post">
      <Link to={`/posts/${post.id}`}>{post.name}</Link> <div className="dash"/> {post.date}
    </div>
  );
};
export default Post;
