'use client';

import { FC, useEffect, useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Image from 'next/image';
import { Ultra } from 'next/font/google';

const ultra = Ultra({ weight: '400', subsets: ['latin'] });
const ROTATE_MS = 5000;

export const PhotosBlockCalistoga: FC = () => {
  const [paths, setPaths] = useState<string[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch('/api/photos/calistoga')
      .then((res) => res.json())
      .then((data: string[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setPaths(data);
        }
      })
      .catch(() => setPaths([]));
  }, []);

  useEffect(() => {
    if (paths.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % paths.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [paths.length]);

  if (paths.length === 0) return null;

  const go = (delta: number) => {
    setIndex((i) => (i + delta + paths.length) % paths.length);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#f5f5f5',
        py: { xs: 5, md: 14 },
        borderTop: '1px solid #e5e7eb',
      }}
    >
      <Box sx={{ maxWidth: 900, margin: '0 auto', px: 2 }}>
        <Typography
          component="p"
          sx={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: '#CD7A66',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            mb: 1,
          }}
        >
          At Montesol Ranch
        </Typography>
        <Typography
          component="h2"
          sx={{
            fontFamily: ultra.style.fontFamily,
            fontSize: '2rem',
            fontWeight: 600,
            color: '#111827',
            mb: 18,
          }}
        >
          Photos from 2010 Spring Ride
        </Typography>
      </Box>
      <Box
        sx={{
          position: 'relative',
          maxWidth: 900,
          margin: '0 auto',
          px: 2,
          aspectRatio: '16/10',
          borderRadius: 1,
          overflow: 'hidden',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        }}
      >
        {paths.map((src, i) => (
          <Box
            key={src}
            sx={{
              position: 'absolute',
              inset: 0,
              opacity: i === index ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out',
              zIndex: i === index ? 1 : 0,
            }}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(max-width: 900px) 100vw, 900px"
              style={{ objectFit: 'cover' }}
            />
          </Box>
        ))}

        {paths.length > 1 && (
          <>
            <IconButton
              onClick={() => go(-1)}
              sx={{
                position: 'absolute',
                left: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 2,
                backgroundColor: 'rgba(255,255,255,0.8)',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.95)' },
              }}
              aria-label="Previous photo"
            >
              <ChevronLeftRoundedIcon />
            </IconButton>
            <IconButton
              onClick={() => go(1)}
              sx={{
                position: 'absolute',
                right: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 2,
                backgroundColor: 'rgba(255,255,255,0.8)',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.95)' },
              }}
              aria-label="Next photo"
            >
              <ChevronRightRoundedIcon />
            </IconButton>

            <Box
              sx={{
                position: 'absolute',
                bottom: 12,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 2,
                display: 'flex',
                gap: 0.75,
              }}
            >
              {paths.map((_, i) => (
                <Box
                  key={i}
                  onClick={() => setIndex(i)}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: i === index ? '#fff' : 'rgba(255,255,255,0.5)',
                    cursor: 'pointer',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
                  }}
                  aria-label={`Go to photo ${i + 1}`}
                />
              ))}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};
