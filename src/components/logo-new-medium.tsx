// /src/components/logo-new.tsx:
import { styled } from '@mui/material/styles';

interface LogoProps {
  fill?: string; // Optional prop for fill color
}

export const LogoNew: React.FC<LogoProps> = ({ fill = '#ffffff' }) => {

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 116 34"
      width="100%"
      height="100%" 
      preserveAspectRatio="xMidYMid meet" // Ensures that the aspect ratio is preserved and the svg is centered
    >
      <g fillRule="nonzero">
  <path fill={fill} d="M24.6,20.7h6l-2,3.7h-6.2c-2.4,0-3-0.6-2.5-2.8l0.2-0.9l1.9-8.8c1.1-5-0.4-7.3-4.7-7.3c-4.5,0-6.9,2.9-8.1,8.3
	L6.6,24.5H2L6.3,4.7H2.6L4.7,1h3.9c2.5,0,2.6,0.5,1.9,3.6l-0.2,1.2c1.8-3.1,4.9-5.2,8.9-5.2c6.4,0,8.8,3.9,7.2,11.4L24.6,20.7z"/>
<path fill={fill} d="M55.3,20.7h6.1l-2,3.7h-6.2c-2.5,0-3.1-0.7-2.4-3.4l0.2-0.9c-1.7,2.7-4.7,4.8-8.4,4.8c-6.6,0-9-4-7.4-11.4
	l1.9-8.8h-3.6L35.4,1h5.2c1.1,0,1.6,0.7,1.4,1.8l-2.3,10.8c-1.1,5,0.3,7.3,4.7,7.3c4.5,0,6.9-2.9,8.1-8.3L54.9,1h4.6L55.3,20.7z"/>
<path fill={fill} d="M73.6,4.6c1.4-2.5,4.2-4.4,8.9-3.8l-1.1,4.3c-5-0.9-8.4,2.1-9.6,7.8l-2.5,11.5h-4.6l4.2-19.7h-3.6L67.5,1h4.4
	c2,0,2.5,0.7,1.9,2.9L73.6,4.6z"/>
<path fill={fill} d="M114.1,20.7l-2,3.7h-1.6c-2.3,0-3.4,0.6-3.9,2.9l-1.2,5.6h-4.6l2.7-12.6c-1.8,2.7-4.7,4.6-8.3,4.6
	c-6.6,0-9-4-7.4-11.4l1.9-8.8H86L88.1,1h5.2c1.1,0,1.6,0.7,1.4,1.8l-2.3,10.8c-1.1,5,0.3,7.3,4.7,7.3c4.5,0,6.9-2.9,8.1-8.3L107.5,1
	h4.6l-4.3,20.4c0.8-0.5,2.3-0.7,4.2-0.7H114.1z"/>
      </g>
    </svg>
  );
};