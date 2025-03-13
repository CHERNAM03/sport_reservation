import React from 'react';
import './Content.css';

export const Content = ({ children }) => {
  return (
    <div className="content-container">
      {children}
    </div>
  );
};