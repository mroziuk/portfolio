import { useNavigate, useLocation } from "react-router-dom";

export function useTagUrl() {
  const navigate = useNavigate();
  const location = useLocation();

  const getSelectedTags = () => {
    const path = location.pathname;
    if (!path.startsWith("/tags/")) return [];
    return path.replace("/tags/", "").split("+").filter(Boolean);
  };

  const selectedTags = getSelectedTags();

  const toggleTag = (tag) => {
    const isSelected = selectedTags.includes(tag);
    const newTags = isSelected
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    const newPath =
      newTags.length > 0 ? `/tags/${newTags.join("+")}` : "/";
    navigate(newPath);
  };
  const clearTags = () => {
    navigate("/", { replace: true });
  };

  return { selectedTags, toggleTag, clearTags };
}