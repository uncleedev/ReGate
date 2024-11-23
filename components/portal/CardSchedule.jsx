import React from 'react';

export default function CardSchedule({ color, course_name, course_code, building_name, instructor_name, section, class_day, start_time, end_time, room_no }) {
  const opacity = 0.25;

  const rgbaColor = `rgba(${hexToRgb(color).join(', ')}, ${opacity})`;

  return (
    <div className={`w-full p-4 border-2 rounded-[10px] shadow-md`} style={{ backgroundColor: rgbaColor, borderColor: color }}>
      <h4>{course_name} (<span>{course_code}</span>)</h4>
      <div className='flex items-center justify-between'>
        <div>
          <h5>{building_name} - {room_no}</h5>
          <h5>{instructor_name}</h5>
          <h5>{section}</h5>
        </div>
        <div className='flex flex-col items-center gap-1'>
          <ul className='flex gap-1'>
            {class_day.map((day) => (
              <li>{day}</li>
            ))}
          </ul>
          <div className='flex gap-3'>
            <span className='p-2 rounded' style={{ backgroundColor: color }}>{start_time}</span>
            <span className='p-2 rounded' style={{ backgroundColor: color }}>{end_time}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function hexToRgb(hex) {
  hex = hex.replace(/^#/, '');

  // Parse r, g, b
  let bigint = parseInt(hex, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;

  return [r, g, b];
}