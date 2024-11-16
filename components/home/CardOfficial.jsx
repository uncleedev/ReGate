import Image from 'next/image';
import React from 'react';

export default function CardOfficial({ color }) {
  // Set the opacity value
  const opacity = 0.25;

  // Create a background color with opacity using RGBA
  const rgbaColor = `rgba(${hexToRgb(color).join(', ')}, ${opacity})`;

  return (
    <div className={`p-4 border-2 flex items-center gap-3 w-fit rounded-[10px] shadow-md`} style={{ backgroundColor: rgbaColor, borderColor: color }}>
      <Image src={require("@/public/images/avatar.png")} className='h-[90px] w-[90px] rounded-full' />
      <div>
        <h3>Dr. Jhon Brian Arce</h3>
        <h3>President</h3>
      </div>
    </div>
  );
}

// Helper function to convert hex to RGB
function hexToRgb(hex) {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, '');

  // Parse r, g, b
  let bigint = parseInt(hex, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;

  return [r, g, b];
}