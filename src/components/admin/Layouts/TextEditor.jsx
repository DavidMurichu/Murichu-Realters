import React, { useState } from "react";
import RichTextEditor from "react-rte";

const TextEditor = ({ initialMarkup = "", onChange }) => {
  const [value, setValue] = useState(RichTextEditor.createValueFromString(initialMarkup, "html"));

  const handleChange = (newValue) => {
    setValue(newValue);
    if (onChange) {
      onChange(newValue.toString("html"));
    }
  };

  return (
    <RichTextEditor value={value} onChange={handleChange} sx={{height: "300px"}}/>
  );
};

export default TextEditor;
