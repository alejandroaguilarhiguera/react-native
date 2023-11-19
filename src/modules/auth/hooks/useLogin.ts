import axios from 'axios';
// import { AsyncStorage } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import loginSchema from '../schemas/login.schema';
import LoginForm from '../types/LoginForm';
import { Session } from '~/types/Session';
import { HttpError } from '~/types/Error';

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
    const url = `${process.env.EXPO_PUBLIC_API_URL}/api/auth/local`;
    try {
      const { data: session } = await axios.post<Session>(url, {
        identifier: loginData.userName,
        password: loginData.password,
      });

      // TODO: set session on local storage
      // await AsyncStorage.setItem('session', JSON.stringify(session));
      console.log('session', session);
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
  return { form, doLogin };
};
