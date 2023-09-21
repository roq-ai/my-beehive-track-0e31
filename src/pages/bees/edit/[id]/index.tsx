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
import { getBeeById, updateBeeById } from 'apiSdk/bees';
import { beeValidationSchema } from 'validationSchema/bees';
import { BeeInterface } from 'interfaces/bee';
import { HiveInterface } from 'interfaces/hive';
import { getHives } from 'apiSdk/hives';

function BeeEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<BeeInterface>(
    () => (id ? `/bees/${id}` : null),
    () => getBeeById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: BeeInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateBeeById(id, values);
      mutate(updated);
      resetForm();
      router.push('/bees');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<BeeInterface>({
    initialValues: data,
    validationSchema: beeValidationSchema,
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
              label: 'Bees',
              link: '/bees',
            },
            {
              label: 'Update Bee',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Bee
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.species}
            label={'Species'}
            props={{
              name: 'species',
              placeholder: 'Species',
              value: formik.values?.species,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="birth_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Birth Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.birth_date ? new Date(formik.values?.birth_date) : null}
              onChange={(value: Date) => formik.setFieldValue('birth_date', value)}
            />
          </FormControl>
          <FormControl id="death_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Death Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.death_date ? new Date(formik.values?.death_date) : null}
              onChange={(value: Date) => formik.setFieldValue('death_date', value)}
            />
          </FormControl>

          <FormControl id="queen_bee" display="flex" alignItems="center" mb="4" isInvalid={!!formik.errors?.queen_bee}>
            <FormLabel htmlFor="switch-queen_bee">Queen Bee</FormLabel>
            <Switch
              id="switch-queen_bee"
              name="queen_bee"
              onChange={formik.handleChange}
              value={formik.values?.queen_bee ? 1 : 0}
            />
            {formik.errors?.queen_bee && <FormErrorMessage>{formik.errors?.queen_bee}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<HiveInterface>
            formik={formik}
            name={'hive_id'}
            label={'Select Hive'}
            placeholder={'Select Hive'}
            fetcher={getHives}
            labelField={'location'}
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
              onClick={() => router.push('/bees')}
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
    entity: 'bee',
    operation: AccessOperationEnum.UPDATE,
  }),
)(BeeEditPage);
