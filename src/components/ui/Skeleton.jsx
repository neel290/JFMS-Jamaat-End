import React from 'react';

export default function Skeleton({ className = '', style = {}, variant = 'text', width, height }) {
  const baseStyle = {
    animation: 'shimmer 1.5s infinite linear',
    backgroundColor: '#e2e8f0',
    backgroundImage: 'linear-gradient(90deg, #e2e8f0 0px, #f1f5f9 40px, #e2e8f0 80px)',
    backgroundSize: '300px 100%',
    ...style,
    width: width || (variant === 'text' ? '100%' : 'auto'),
    height: height || (variant === 'text' ? '1em' : 'auto'),
    borderRadius: variant === 'circular' ? '50%' : variant === 'rectangular' ? '4px' : '4px',
    display: 'inline-block',
  };

  return <div className={`skeleton ${className}`} style={baseStyle} />;
}
