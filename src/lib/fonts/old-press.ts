import localFont from 'next/font/local';

export const oldPress = localFont({
  src: [
    {
      path: '../../fonts/Old Press.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../fonts/Old Press Italic.ttf',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-old-press',
  display: 'swap',
});
