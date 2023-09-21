import * as yup from 'yup';

export const hiveValidationSchema = yup.object().shape({
  location: yup.string().required(),
  creation_date: yup.date().nullable(),
  destruction_date: yup.date().nullable(),
  hive_status: yup.string().required(),
  user_id: yup.string().nullable().required(),
});
