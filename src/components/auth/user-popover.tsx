// /components/auth/user-popover.tsx
import * as React from 'react';

import Box from '@mui/material/Box';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import { Popover, Typography } from '@mui/material';

import { useUser } from '@/hooks/use-user';

export interface UserPopoverProps {
  anchorEl: Element | null;
  onClose: () => void;
  open: boolean;
}

function formatPhoneNumberForDisplay(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
}

export function UserPopover({ anchorEl, onClose, open }: UserPopoverProps): React.JSX.Element {
  const { user } = useUser();

  const phoneLine =
    user?.phone && String(user.phone).trim() !== ''
      ? formatPhoneNumberForDisplay(String(user.phone))
      : 'phone number';

  return (
    <Popover
      anchorEl={open ? anchorEl : null}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          width: '240px',
          backgroundColor: 'white',
          color: 'black',
          border: '1px solid black',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
        },
      }}
    >
      <Box sx={{ p: '16px 20px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0 }}>
          <ContactPhoneIcon sx={{ mr: 1, fontSize: '30px', color: 'black' }} />
          <Typography variant="subtitle1">Account</Typography>
        </Box>
        <Typography color="text.secondary" variant="caption">
          {phoneLine}
        </Typography>
      </Box>
    </Popover>
  );
}
