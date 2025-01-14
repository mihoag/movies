import React from 'react';
import clsx from 'clsx'; // For conditional class names (install via `npm install clsx`)

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'ghost' | 'solid' | 'outline';
  size?: 'icon' | 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({ className, children, ...props }) => {
  // Default styles for variants

  // Combine styles
  const buttonClass = clsx(className);

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
};

export default Button;
