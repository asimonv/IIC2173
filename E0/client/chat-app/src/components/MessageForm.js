import React, { useState } from "react";
import PropTypes from "prop-types";

const MessageForm = ({ onSubmit }) => {
  const [text, setText] = useState("");

  const handleChange = e => {
    setText(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(text);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={text} onChange={handleChange} />
      <input type="submit" value="Submit" />
    </form>
  );
};

MessageForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default MessageForm;
