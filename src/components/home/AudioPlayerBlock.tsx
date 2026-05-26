'use client';

import type { FC } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { Ultra } from 'next/font/google';

const ultra = Ultra({ weight: '400', subsets: ['latin'] });

/**
 * Self-hosted media: put your file in public/media/ and set the path below.
 * Supports audio (mp3, m4a, ogg, wav) or video (mp4, webm).
 *
 * To save the Trinity recording:
 * 1. Open the Napa Valley Register article and play the Trinity player.
 * 2. Record the tab/system audio:
 *    - Mac: QuickTime Player → File → New Screen Recording → record, then File → Export As → Audio Only (or leave as video).
 *    - Or use a browser extension like "Audio Recorder" or "Tab Audio Recorder" to capture tab output as MP3.
 * 3. Save the file into public/media/ (e.g. spring-ride-recording.mp3 or .mp4).
 */
const MEDIA_SRC = '/media/spring-ride-recording.mp3';
const MEDIA_KIND: 'audio' | 'video' = 'audio';

export const AudioPlayerBlock: FC = () => {
  return (
    <Box sx={{ backgroundColor: '#FFFFFF', py: { xs: 4, md: 6 }, borderTop: '1px solid #e5e7eb' }}>
      <Container maxWidth="md">
        <Typography
          component="h2"
          sx={{
            fontFamily: ultra.style.fontFamily,
            fontSize: '2rem',
            fontWeight: 600,
            color: '#111827',
            mb: 2,
          }}
        >
          Listen
        </Typography>
        <Box
          sx={{
            borderRadius: 1,
            overflow: 'hidden',
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
            backgroundColor: '#f9fafb',
          }}
        >
          {MEDIA_KIND === 'audio' ? (
            <audio
              controls
              preload="metadata"
              style={{ width: '100%', display: 'block' }}
              src={MEDIA_SRC}
            >
              Your browser does not support the audio element. Add the file to{' '}
              <code>public/media/</code> and set <code>MEDIA_SRC</code> in this component.
            </audio>
          ) : (
            <video
              controls
              preload="metadata"
              style={{ width: '100%', display: 'block' }}
              src={MEDIA_SRC}
            >
              Your browser does not support the video element. Add the file to{' '}
              <code>public/media/</code> and set <code>MEDIA_SRC</code> in this component.
            </video>
          )}
        </Box>
      </Container>
    </Box>
  );
};
