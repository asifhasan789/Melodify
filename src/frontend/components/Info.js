import React from 'react';
import { InfoOutlined } from '@material-ui/icons';
import { useState } from 'react';

function Info() {
  const [hovering, setHovering] = useState(false);
  return (
    <div className="relative hidden lg:block">
      <InfoOutlined
        className="text-white cursor-pointer"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      />
      {hovering && (
        <div className="absolute -bottom-2 left-8 bg-gray-600 w-[220px] h-[35px] px-3 py-1 text-white rounded-lg">
          Listen 20 seconds for free
        </div>
      )}
    </div>
  );
}

export default Info;