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
        <path fill={fill} d="M24,19.5h6l-2.7,5h-6.7c-3,0-3.7-0.8-3.1-3.6l0.3-1.3l1.6-7.6c0.9-4.1-0.3-6-3.8-6c-3.6,0-5.5,2.2-6.5,6.9
	L6.6,24.5H0.4L4.4,6H0.6l2.7-5h4.6c3,0,3.2,0.5,2.4,4.3c1.8-2.8,4.9-4.7,8.6-4.7c6,0,8.4,3.8,6.8,11.3L24,19.5z"/>
<path fill={fill} d="M55.6,19.5h6.1l-2.7,5h-6.7c-2.9,0-3.7-0.7-3.1-3.6c-1.6,2.3-4.5,4-7.7,4c-6.6,0-8.7-3.9-7.2-11.2L35.9,6h-3.8
	l2.8-5h6c1.4,0,2.1,0.8,1.8,2.2l-2.2,10.4c-0.9,4.1,0.2,6,3.8,6c3.6,0,5.5-2.3,6.5-6.9L53.3,1h6.2L55.6,19.5z"/>
<path fill={fill} d="M83.6,0.8l-1.4,5.7c-4.5-0.8-7.9,1.6-9,7.1l-2.3,10.8h-6.2L68.5,6h-3.8l2.7-5h4.9c2.3,0,3.2,0.7,2.8,2.8
	C76.5,1.8,79.2,0.3,83.6,0.8z"/>
<path fill={fill} d="M115.8,19.5l-2.7,5H112c-2.5,0-3.5,0.6-4.1,3.2l-1.3,5.9h-6.3l2.7-12.2c-1.7,2.3-4.4,3.6-7.5,3.6
	c-6.6,0-8.7-3.9-7.2-11.2L90,6h-3.8L89,1h6c1.4,0,2.1,0.8,1.8,2.2l-2.2,10.4c-0.9,4.1,0.2,6,3.8,6c3.6,0,5.5-2.3,6.5-6.9L107.4,1
	h6.2l-4,19.1c0.9-0.5,2.4-0.7,4.4-0.7H115.8z"/>
      </g>
    </svg>
  );
};