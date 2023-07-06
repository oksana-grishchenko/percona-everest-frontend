import {
  Box,
  FormControlLabel,
  MenuItem,
  Switch,
  TextField,
  Typography,
} from '@mui/material';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { PitrEnabledSection } from './pitrSection/pitr-enabled-section';
import { Messages } from './third-step.messages';
import { StorageLocation } from './third-step.types';
import { TimeSelection } from './timeSelection/time-selection';
import { DbWizardFormFields } from '../../new-database.types';

export const ThirdStep = () => {
  const { control, watch } = useFormContext();
  const backupsEnabled: boolean = watch('backupsEnabled');
  const pitrEnabled: boolean = watch('pitrEnabled');
  const fetchedStorageValues = Object.values(StorageLocation);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Typography variant="h6">{Messages.backups}</Typography>
      <Typography variant="caption">{Messages.captionBackups}</Typography>
      <FormControlLabel
        label={Messages.enableBackups}
        data-testid="switch-backups-enabled"
        control={
          <Controller
            control={control}
            name={DbWizardFormFields.backupsEnabled}
            render={({ field }) => <Switch {...field} checked={field.value} />}
          />
        }
      />
      {backupsEnabled && (
        <>
          <Typography variant="sectionHeading">
            {Messages.repeatsEvery}
          </Typography>
          <TimeSelection />
          <Box
            sx={{
              paddingTop: 3,
              paddingBottom: 3,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="sectionHeading">
              {Messages.storageLocation}
            </Typography>
            <Controller
              control={control}
              name={DbWizardFormFields.storageLocation}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  inputProps={{
                    'data-testid': 'select-storage-location',
                  }}
                >
                  {fetchedStorageValues.map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Box>
          <Typography variant="h6">{Messages.pitr}</Typography>
          <Typography variant="caption">{Messages.captionPitr}</Typography>
          <FormControlLabel
            label={Messages.enablePitr}
            data-testid="switch-pitr-enabled"
            control={
              <Controller
                control={control}
                name={DbWizardFormFields.pitrEnabled}
                render={({ field }) => (
                  <Switch {...field} checked={field.value} />
                )}
              />
            }
          />
          {pitrEnabled && <PitrEnabledSection />}
        </>
      )}
    </Box>
  );
};