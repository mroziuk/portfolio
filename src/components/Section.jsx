import Post from './Post';

const Section = ({ name, posts }) => {
  const sortedPosts = [...posts].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  return (
    <section>
      <h2>{name}</h2>
      <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
        {sortedPosts.map((post, index) => (
          <li key={index}>
            <Post post={post} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Section;