import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePosts } from "../hooks/usePosts";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Mermaid from "./Mermaid";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  dracula,
  oneLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import TagWithIcon from "./TagWithIcon";

const PostDetails = ({ darkMode }) => {
  const { slug } = useParams();
  const { posts, loading: postsLoading, error: postsError } = usePosts();
  const postMeta = posts.find((x) => x.slug === slug);
  console.log(slug);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const res = await fetch(`/posts/${slug}.md`);
        if (!res.ok) throw new Error("Markdown not found");
        const text = await res.text();
        const match = text.match(/^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/);
        if (match) {
          const [, _frontmatter, markdownContent] = match;
          setContent(markdownContent);
        } else {
          setContent(text);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMarkdown();
  }, [slug]);

  if (postsLoading || loading) return <p>Loading...</p>;
  if (postsError || error) return <p>Error: {postsError || error}</p>;
  if (!postMeta) return <p>Post not found</p>;

  return (
    <div className="post-details">
      <div className="details-header">
        <Link className="details-back" to="/">
          &larr;Home
        </Link>
        <h2>{postMeta.name}</h2>
      </div>
      <p>{postMeta.date}</p>
      <div className="tags">
        {postMeta.tags.map((tag) => (
          <TagWithIcon key={tag} tag={tag} />
        ))}
      </div>
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
                  customStyle={{ fontSize: "14px", borderRadius: "8px" }}
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              )
            ) : (
              <code
                className={className}
                {...props}
                style={{
                  backgroundColor: darkMode ? "#282a36" : "#f2f2f2",
                  fontSize: "14px",
                  padding: "0.2em 0.4em",
                  borderRadius: "4px",
                }}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </Markdown>
    </div>
  );
};

export default PostDetails;
