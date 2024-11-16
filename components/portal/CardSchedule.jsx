import React from 'react';

export default function CardSchedule({ color }) {
  // Set the opacity value
  const opacity = 0.25;

  // Create a background color with opacity using RGBA
  const rgbaColor = `rgba(${hexToRgb(color).join(', ')}, ${opacity})`;

  return (
    <div className={`p-4 border-2 rounded-[10px] shadow-md`} style={{ backgroundColor: rgbaColor, borderColor: color }}>
      <h4>Advance Computer Service System (<span>ACSS</span>)</h4>
      <div className='flex items-center justify-between'>
        <div>
          <h5>ICS</h5>
          <h5>Mr. Example</h5>
          <h5>BSIT 3C</h5>
        </div>
        <div className='flex flex-col items-center gap-1'>
          <ul className='flex gap-1'>
            <li>M</li>
            <li>M</li>
            <li>M</li>
            <li>M</li>
            <li>M</li>
            <li>M</li>
            <li>M</li>
          </ul>
          <div className='flex gap-3'>
            <span className='p-2 rounded' style={{ backgroundColor: color }}>9:00am</span>
            <span className='p-2 rounded' style={{ backgroundColor: color }}>9:00am</span>
          </div>
        </div>
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