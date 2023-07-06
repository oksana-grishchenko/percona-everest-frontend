import { zodResolver } from '@hookform/resolvers/zod';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Step, StepLabel } from '@mui/material';
import { DbType } from '@percona/ui-lib.db-toggle-card';
import { Stepper } from '@percona/ui-lib.stepper';
import React, { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Messages } from './new-database.messages';
import { DbWizardFormFields, dbWizardSchema, DbWizardType } from './new-database.types';
import { steps } from './steps';
import { DEFAULT_SIZES } from './steps/second/second-step.const';
import {
  NumberOfNodes,
  ResourceSize,
} from './steps/second/second-step.types';
import {
  AmPM,
  StorageLocation,
  TimeValue,
  WeekDays,
} from './steps/third/third-step.types';
import { SixthStep } from './steps/sixth/sixth-step';
import { useCreateDbCluster } from '../../hooks/db-cluster/useDbCluster';
import { useSelectedKubernetesCluster } from '../../hooks/kubernetesClusters/useSelectedKubernetesCluster';

export const NewDatabasePage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const currentValidationSchema = dbWizardSchema[activeStep];
  const { mutate: addDbCluster } = useCreateDbCluster();
  const { id } = useSelectedKubernetesCluster();

  const methods = useForm<DbWizardType>({
    mode: 'onChange',
    resolver: zodResolver(currentValidationSchema),
    defaultValues: {
      [DbWizardFormFields.backupsEnabled]: true,
      [DbWizardFormFields.pitrEnabled]: true,
      [DbWizardFormFields.pitrTime]: '60',
      [DbWizardFormFields.storageLocation]: StorageLocation.S3,
      [DbWizardFormFields.timeNumbers]: '1',
      [DbWizardFormFields.selectTime]: TimeValue.hours,
      [DbWizardFormFields.minute]: 0,
      [DbWizardFormFields.minuteHour]: 0,
      [DbWizardFormFields.hour]: 12,
      [DbWizardFormFields.amPm]: AmPM.AM,
      [DbWizardFormFields.weekDay]: WeekDays.Mo,
      [DbWizardFormFields.onDay]: 1,
      [DbWizardFormFields.dbType]: DbType.Mysql,
      [DbWizardFormFields.dbName]: '',
      [DbWizardFormFields.dbVersion]: '',
      [DbWizardFormFields.externalAccess]: false,
      [DbWizardFormFields.internetFacing]: true,
      [DbWizardFormFields.sourceRange]: '',
      [DbWizardFormFields.monitoring]: false,
      [DbWizardFormFields.endpoint]: '',
      [DbWizardFormFields.numberOfNodes]: NumberOfNodes.oneNode,
      [DbWizardFormFields.resourceSizePerNode]: ResourceSize.small,
      [DbWizardFormFields.cpu]: DEFAULT_SIZES.small.cpu,
      [DbWizardFormFields.disk]: DEFAULT_SIZES.small.disk,
      [DbWizardFormFields.memory]: DEFAULT_SIZES.small.memory,
    },
  });
  const firstStep = activeStep === 0;

  const onSubmit: SubmitHandler<DbWizardType> = (data) => {
    /* eslint-disable no-console */
    console.log(data);
    addDbCluster(
      { dbPayload: data, id },
      {
        onSuccess: () => {
          setFormSubmitted(true);
        },
      }
    );
  };

  const handleNext: React.MouseEventHandler<HTMLButtonElement> = async () => {
    if (activeStep < steps.length - 1) {
      const isStepValid = await methods.trigger();

      if (isStepValid) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  return formSubmitted ? (
    <SixthStep />
  ) : (
    <>
      <Stepper noConnector activeStep={activeStep} sx={{ marginBottom: 4 }}>
        {steps.map((_, idx) => (
          <Step key={`step-${idx + 1}`}>
            <StepLabel />
          </Step>
        ))}
      </Stepper>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Box>{React.createElement(steps[activeStep])}</Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 4 }}>
            <Button
              type="button"
              startIcon={<ArrowBackIcon />}
              variant="text"
              disabled={firstStep}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              {Messages.previous}
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {activeStep === steps.length - 1 ? (
              <Button
                onClick={methods.handleSubmit(onSubmit)}
                variant="contained"
              >
                {Messages.createDatabase}
              </Button>
            ) : (
              <Button onClick={handleNext} variant="contained">
                {Messages.continue}
              </Button>
            )}
          </Box>
        </form>
      </FormProvider>
    </>
  );
};
