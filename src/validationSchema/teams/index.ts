import * as yup from 'yup';

export const teamValidationSchema = yup.object().shape({
  description: yup.string().nullable(),
  team_leader: yup.string().nullable(),
  team_size: yup.number().integer().nullable(),
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
});
