import { useEffect} from 'react';
import mermaid from 'mermaid';

const Mermaid = ({ chart, darkMode }) => {
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: darkMode ? "dark" : "default",
      themeVariables: darkMode
        ? {
            primaryColor: "#bb86fc",
            edgeLabelBackground: "#333",
            lineColor: "#bb86fc",
            textColor: "#ffffff",
            background: "#121212",
          }
        : {
            primaryColor: "#4e79a7",
            edgeLabelBackground: "#fff",
            lineColor: "#4e79a7",
            textColor: "#000000",
            background: "#ffffff",
          },
    });

    mermaid.contentLoaded();
  }, [chart, darkMode]);

  return <div className="mermaid">{chart}</div>;
};

export default Mermaid;
