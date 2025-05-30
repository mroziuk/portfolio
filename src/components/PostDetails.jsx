import { useParams, Link } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Mermaid from "./Mermaid";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  dracula,
  oneLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
const PostDetails = ({ darkMode }) => {
  const { id } = useParams();
  const { posts: posts, loading, error } = usePosts();
  const post = posts.find((x) => x.id == id);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <div className="post-details">
      <Link to="/">&larr; Home</Link>
      <h2>{post.name}</h2>
      <p>{post.date}</p>
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const theme = darkMode ? dracula : oneLight;
            return !inline && match ? (
              match[1] === "mermaid" ? (
                <Mermaid chart={children} darkMode={darkMode} />
              ) : (
                <SyntaxHighlighter
                  style={theme}
                  PreTag="div"
                  language={match[1]}
                  customStyle={{
                    border: "1px solid black",
                  }}
                  {...props}
                >
                  {String(children).replace("/\n$/", "")}
                </SyntaxHighlighter>
              )
            ) : (
              <code
                className={className}
                {...props}
                customStyle={{
                  backgroundColor: darkMode ? "#282a36" : "#f2f2f2",
                }}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {post.content}
      </Markdown>
    </div>
  );
};
export default PostDetails;
