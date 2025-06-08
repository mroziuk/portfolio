import { tagIcons } from "./tagIcons.jsx";
import { useTagUrl } from "../hooks/useTagUrl.js";
const TagWithIcon = ({ tag }) => {
  const icon = tagIcons[tag] || null;
  const { toggleTag } = useTagUrl();

  return (
    <span className="tag" onClick={() => toggleTag(tag)} title={tag}>
      {icon && <span className="icon">{icon}</span>}
    </span>
  );
};

export default TagWithIcon;