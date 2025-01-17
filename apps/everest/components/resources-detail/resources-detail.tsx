// percona-everest-frontend
// Copyright (C) 2023 Percona LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Input } from '@percona/ui-lib.input';
import { ProgressBar } from '@percona/ui-lib.progress-bar';
import React from 'react';
import { ResourcesDetailProps } from './resources-detail.types';

export function ResourcesDetail({
  label,
  labelProgressBar,
  value,
  total,
  inputProps,
}: ResourcesDetailProps) {
  const theme = useTheme();
  const {
    value: inputValue,
    units,
    setValue: setInputValue,
    dataTestId,
  } = inputProps;
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const labelProcessBarDefault = `Using ${inputValue} ${units} (${Math.floor(
    (inputValue / total) * 100
  )}%) of\n ${total} ${units} in total`;

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '10px',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      data-testid={`${dataTestId}-resource-box`}
    >
      <Box
        sx={{
          minWidth: isMobile ? '70px' : '100px',
          color: 'text.primary',
          fontWeight: '800',
          fontSize: '14px',
        }}
      >
        {label}
      </Box>
      <Box sx={{ maxWidth: '150px', minWidth: '100px' }}>
        <Input
          {...inputProps}
          value={inputValue}
          setValue={setInputValue}
          units={units}
          dataTestId={`${dataTestId}-input`}
        />
      </Box>
      {isMobile ? (
        <Box
          sx={{
            fontSize: '12px',
            minWidth: '120px',
            wordWrap: 'break-word',
            whiteSpace: 'pre-wrap',
            textAlign: 'end',
          }}
        >
          {labelProgressBar || labelProcessBarDefault}
        </Box>
      ) : (
        <ProgressBar
          dataTestId={`${dataTestId}-progress-bar`}
          label={labelProgressBar || labelProcessBarDefault}
          buffer={inputValue}
          value={value}
          total={total}
        />
      )}
    </Box>
  );
}
