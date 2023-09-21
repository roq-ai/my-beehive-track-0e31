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

import { createHive } from 'apiSdk/hives';
import { hiveValidationSchema } from 'validationSchema/hives';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { HiveInterface } from 'interfaces/hive';

function HiveCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: HiveInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createHive(values);
      resetForm();
      router.push('/hives');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<HiveInterface>({
    initialValues: {
      location: '',
      creation_date: new Date(new Date().toDateString()),
      destruction_date: new Date(new Date().toDateString()),
      hive_status: '',
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: hiveValidationSchema,
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
              label: 'Hives',
              link: '/hives',
            },
            {
              label: 'Create Hive',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Hive
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.location}
            label={'Location'}
            props={{
              name: 'location',
              placeholder: 'Location',
              value: formik.values?.location,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="creation_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Creation Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.creation_date ? new Date(formik.values?.creation_date) : null}
              onChange={(value: Date) => formik.setFieldValue('creation_date', value)}
            />
          </FormControl>
          <FormControl id="destruction_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Destruction Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.destruction_date ? new Date(formik.values?.destruction_date) : null}
              onChange={(value: Date) => formik.setFieldValue('destruction_date', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.hive_status}
            label={'Hive Status'}
            props={{
              name: 'hive_status',
              placeholder: 'Hive Status',
              value: formik.values?.hive_status,
              onChange: formik.handleChange,
            }}
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
              onClick={() => router.push('/hives')}
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
    entity: 'hive',
    operation: AccessOperationEnum.CREATE,
  }),
)(HiveCreatePage);
