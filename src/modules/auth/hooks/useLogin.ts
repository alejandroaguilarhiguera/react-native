import axios from 'axios';
import { mutate } from 'swr';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import loginSchema from '../schemas/login.schema';
import LoginForm from '../types/LoginForm';
import { Session } from '~/types/Session';
import { HttpError } from '~/types/Error';
import { API_LOGIN } from '~/config/api';

export default () => {
  const form = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
    mode: 'onSubmit',
    defaultValues: {
      userName: '',
      password: '',
    },
  });

  async function doLogin(loginData: LoginForm): Promise<void> {
    try {
      const { data: session } = await axios.post<Session>(API_LOGIN, {
        identifier: loginData.userName,
        password: loginData.password,
      });
      axios.defaults.headers.common['Authorization'] = `Bearer ${session.jwt}`;

      mutate<Session>('session', session);
    } catch (error: any) {
      if (error?.response?.data) {
        const httpError = error?.response?.data.error as HttpError;
        form.setError('userName', {
          type: 'value',
          message: httpError.message,
        });
      } else {
        form.setError('root', { type: 'value', message: 'unexpected error' });
      }
    }
  }
  async function logout(): Promise<void> {
    delete axios.defaults.headers.common['Authorization'];
    mutate('session', {});
  }
  return { form, doLogin, logout };
};
