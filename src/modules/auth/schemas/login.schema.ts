import * as yup from 'yup';

const yupSchema = yup.object({
  userName: yup.string().required('The username is required'),
  password: yup.string().required('The password is required'),
  token: yup.string().optional(),
});

export default yupSchema;
