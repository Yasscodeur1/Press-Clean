import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, ...props }) => {
  return (
    <div className="textarea-container">
      {label && <label className="textarea-label">{label}</label>}
      <textarea className="textarea" {...props}></textarea>
    </div>
  );
};

export default Textarea;