import * as yup from 'yup';

export const beeValidationSchema = yup.object().shape({
  species: yup.string().required(),
  birth_date: yup.date().nullable(),
  death_date: yup.date().nullable(),
  queen_bee: yup.boolean().required(),
  hive_id: yup.string().nullable().required(),
});
