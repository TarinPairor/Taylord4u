import { useState } from "react";
import ReactMarkdown from "react-markdown";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const MarkdownEditor = () => {
  const [markdownText, setMarkdownText] = useState("");

  const handleInputChange = (value: string) => {
    setMarkdownText(value);
  };

  return (
    <div>
      <ReactQuill
        value={markdownText}
        onChange={handleInputChange}
        modules={{ toolbar: true }}
      />
      <div>
        <h2>Preview</h2>
        <ReactMarkdown>{markdownText}</ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownEditor;
