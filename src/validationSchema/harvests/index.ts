import * as yup from 'yup';

export const harvestValidationSchema = yup.object().shape({
  harvest_date: yup.date().nullable(),
  quantity: yup.number().integer().required(),
  harvest_type: yup.string().required(),
  hive_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
