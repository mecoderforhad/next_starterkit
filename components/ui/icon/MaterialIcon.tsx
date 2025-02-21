import React from 'react';

interface MaterialIconProps {
  name: string;
  size?: number;
  color?: string;
}

const MaterialIcon: React.FC<MaterialIconProps> = ({ name, size = 20, color = 'rgb(0, 55, 118)' }) => {
  return (
    <span
      className="material-icons"
      style={{ fontSize: `${size}px`, color: color }}
    >
      {name}
    </span>
  );
};

export default MaterialIcon;