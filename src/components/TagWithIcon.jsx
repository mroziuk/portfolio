import { tagIcons } from "./tagIcons.jsx";

const TagWithIcon = ({ tag }) => {
  const icon = tagIcons[tag] || null;

  return (
    <span className="tag">
      {icon && <span className="icon">{icon}</span>}
       {/* {tag} */}
    </span>
  );
};

export default TagWithIcon;