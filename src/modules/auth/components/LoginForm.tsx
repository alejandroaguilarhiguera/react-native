import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  View,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  ToastAndroid,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import useLogin from '../hooks/useLogin';

type Props = {
  onSuccessful: () => void;
};

export default function LoginForm(props: Props) {
  const { onSuccessful } = props;
  const { form, doLogin } = useLogin();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting, isSubmitted },
  } = form;

  useEffect(() => {
    if (isSubmitSuccessful) {
      ToastAndroid.show('Username is successful', ToastAndroid.SHORT);
      onSuccessful();
    }
  }, [isSubmitSuccessful]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewSection}>
        {}
        <Text>Username</Text>
        <Controller
          name="userName"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              style={styles.input}
              onBlur={field.onBlur}
              onChangeText={(value) => field.onChange(value)}
              value={field.value}
            />
          )}
        />
        <Text style={styles.errorText}>{errors.userName?.message}</Text>
      </View>
      <View style={styles.viewSection}>
        <Text>Password</Text>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              style={styles.input}
              secureTextEntry={true}
              onBlur={field.onBlur}
              onChangeText={(value) => field.onChange(value)}
              value={field.value}
            />
          )}
        />
        <Text style={styles.errorText}>{errors.password?.message}</Text>
      </View>
      <TouchableOpacity onPress={handleSubmit(doLogin)}>
        <View
          style={{
            ...styles.button,
            // backgroundColor: isSubmitting ? '#4caf50' : '#8bc34a',
          }}
        >
          {isSubmitting && <ActivityIndicator />}
          {!isSubmitting && <Text style={styles.buttonText}>Submit</Text>}
        </View>
      </TouchableOpacity>
      {/* <Button title="Submit" onPress={handleSubmit(doLogin)} /> */}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 100,
    paddingRight: 100,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    color: '#fff',
    height: 40,
    backgroundColor: '#0071e3',
    borderColor: '#fff',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  input: {
    borderColor: 'gray',
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  viewSection: { paddingBottom: 5, paddingTop: 5 },
  errorText: {
    color: 'red',
  },
});
