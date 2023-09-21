import * as yup from 'yup';

export const healthCheckValidationSchema = yup.object().shape({
  check_date: yup.date().nullable(),
  check_result: yup.string().required(),
  notes: yup.string().nullable(),
  hive_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
