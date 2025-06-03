import { Link } from "react-router-dom";
import TagWithIcon from "./TagWithIcon.jsx";
const Post = ({ post }) => {
  return (
    <div className="post">
      <div className="post-title">
        <Link to={`/posts/${post.id}`}>{post.name}</Link>
        <div className="tag-container">
          {post.tags.map((tag) => (
            <TagWithIcon key={tag} tag={tag} />
          ))}
        </div>
      </div>
      <div className="dash" />
      {post.date}
    </div>
  );
};
export default Post;
