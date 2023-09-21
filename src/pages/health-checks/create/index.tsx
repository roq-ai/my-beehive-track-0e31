import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createHealthCheck } from 'apiSdk/health-checks';
import { healthCheckValidationSchema } from 'validationSchema/health-checks';
import { HiveInterface } from 'interfaces/hive';
import { UserInterface } from 'interfaces/user';
import { getHives } from 'apiSdk/hives';
import { getUsers } from 'apiSdk/users';
import { HealthCheckInterface } from 'interfaces/health-check';

function HealthCheckCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: HealthCheckInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createHealthCheck(values);
      resetForm();
      router.push('/health-checks');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<HealthCheckInterface>({
    initialValues: {
      check_date: new Date(new Date().toDateString()),
      check_result: '',
      notes: '',
      hive_id: (router.query.hive_id as string) ?? null,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: healthCheckValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Health Checks',
              link: '/health-checks',
            },
            {
              label: 'Create Health Check',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Health Check
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="check_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Check Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.check_date ? new Date(formik.values?.check_date) : null}
              onChange={(value: Date) => formik.setFieldValue('check_date', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.check_result}
            label={'Check Result'}
            props={{
              name: 'check_result',
              placeholder: 'Check Result',
              value: formik.values?.check_result,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.notes}
            label={'Notes'}
            props={{
              name: 'notes',
              placeholder: 'Notes',
              value: formik.values?.notes,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<HiveInterface>
            formik={formik}
            name={'hive_id'}
            label={'Select Hive'}
            placeholder={'Select Hive'}
            fetcher={getHives}
            labelField={'location'}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/health-checks')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'health_check',
    operation: AccessOperationEnum.CREATE,
  }),
)(HealthCheckCreatePage);
