import React from 'react';

interface ButtonProps {
  href: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ href, children }) => {
  return (
    <a href={href} className="button button--primary" target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};

export default Button;