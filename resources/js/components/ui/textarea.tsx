import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const Textarea: React.FC<TextareaProps> = ({className, label, ...props }) => {
  return (
    <div className="textarea-container">
      {label && <label className="textarea-label">{label}</label>}
      <textarea className={`w-full min-h-[100px] p-2 border rounded-lg resize-y ${className}`}
        {...props}></textarea>
    </div>
  );
};

export default Textarea;