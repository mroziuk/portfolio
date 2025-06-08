import { Link } from "react-router-dom";
import TagWithIcon from "./TagWithIcon.jsx";
const dateFormatter = new Intl.DateTimeFormat("pl-PL", {
  day: "numeric",
  month: "long",
  year: "numeric",
});
const Post = ({ post }) => {
  return (
    <div className="post">
      <div className="post-title">
        <Link to={`/posts/${post.slug}`}>{post.name}</Link>
        <div className="tag-container">
          {post.tags.map((tag) => (
            <TagWithIcon key={tag} tag={tag} />
          ))}
        </div>
      </div>
      <div className="dash" />
      {dateFormatter.format(new Date(post.date))}
    </div>
  );
};
export default Post;
