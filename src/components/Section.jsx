import Post from './Post';

const Section = ({ name, posts }) => {
  return (
    <section>
      <h2>{name}</h2>
      <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
        {posts.map((post, index) => (
          <li key={index}>
            <Post post={post} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Section;