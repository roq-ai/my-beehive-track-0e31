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
  Center,
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
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getHarvestById, updateHarvestById } from 'apiSdk/harvests';
import { harvestValidationSchema } from 'validationSchema/harvests';
import { HarvestInterface } from 'interfaces/harvest';
import { HiveInterface } from 'interfaces/hive';
import { UserInterface } from 'interfaces/user';
import { getHives } from 'apiSdk/hives';
import { getUsers } from 'apiSdk/users';

function HarvestEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<HarvestInterface>(
    () => (id ? `/harvests/${id}` : null),
    () => getHarvestById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: HarvestInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateHarvestById(id, values);
      mutate(updated);
      resetForm();
      router.push('/harvests');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<HarvestInterface>({
    initialValues: data,
    validationSchema: harvestValidationSchema,
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
              label: 'Harvests',
              link: '/harvests',
            },
            {
              label: 'Update Harvest',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Harvest
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="harvest_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Harvest Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.harvest_date ? new Date(formik.values?.harvest_date) : null}
              onChange={(value: Date) => formik.setFieldValue('harvest_date', value)}
            />
          </FormControl>

          <NumberInput
            label="Quantity"
            formControlProps={{
              id: 'quantity',
              isInvalid: !!formik.errors?.quantity,
            }}
            name="quantity"
            error={formik.errors?.quantity}
            value={formik.values?.quantity}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('quantity', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <TextInput
            error={formik.errors.harvest_type}
            label={'Harvest Type'}
            props={{
              name: 'harvest_type',
              placeholder: 'Harvest Type',
              value: formik.values?.harvest_type,
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
              onClick={() => router.push('/harvests')}
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
    entity: 'harvest',
    operation: AccessOperationEnum.UPDATE,
  }),
)(HarvestEditPage);
