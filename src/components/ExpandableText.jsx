import React, { useState } from "react";

const ExpandableText = ({ text, maxLength = 100 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const displayText = isExpanded
    ? text // Tampilkan teks penuh jika diperluas
    : text.length > maxLength
    ? text.slice(0, maxLength) + "..." // Potong teks jika lebih panjang dari maxLength
    : text;

  return (
    <div>
      <p>{displayText}</p>
      {text.length > maxLength && (
        <button onClick={toggleExpand}>
          {isExpanded ? "Show Less" : "Read More"}
        </button>
      )}
    </div>
  );
};

export default ExpandableText;
