import Section from "./Section";
import { usePosts } from "../hooks/usePosts";
import { useTagUrl } from "../hooks/useTagUrl";
import TagWithIcon from "./TagWithIcon";
import { Link } from "react-router-dom";
const PostList = () => {
  const { posts, loading, error } = usePosts();
  const { selectedTags, clearTags } = useTagUrl();
  const filterModeAND = false;

  const filterByTags = (posts) => {
    if (selectedTags.length === 0) return posts;

    return posts.filter((post) =>
      filterModeAND
        ? selectedTags.every((tag) => post.tags?.includes(tag))
        : selectedTags.some((tag) => post.tags?.includes(tag))
    );
  };

  const filtered = filterByTags(posts);

  const latest = filtered?.filter((p) => p.category === "post") || [];
  const projects = filtered?.filter((p) => p.category === "project") || [];
  const til = filtered?.filter((p) => p.category === "micro") || [];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Link to="/" className="main-link">
        <h1>
          mroziuk<span className="dot">.</span>dev
        </h1>
      </Link>
      {selectedTags.length > 0 && (
        <div className="tag-list">
          {selectedTags.map((tag) => (
            <TagWithIcon tag={tag} key={tag} />
          ))}
          <span
            className="clear-tags"
            onClick={clearTags}
            title="Wyczyść filtry"
          >
            ✖
          </span>
        </div>
      )}

      <Section name="Latest Posts" posts={latest} />
      {projects.length > 0 && <Section name="Projects" posts={projects} />}
      <Section name="Micro" posts={til} />
    </>
  );
};

export default PostList;
